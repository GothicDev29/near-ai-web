export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@near/cms-core/lib/prisma";
import {
  attributionSchema,
  screen1Schema,
  screen2Schema,
  screen3Schema,
  domainFromEmail,
  INTEREST_TO_ATTIO,
  type Attribution,
} from "@/lib/contact-form";

const ATTIO_LIST_ID = "1da445c5-90e5-45cc-b24b-7861345a549b";
const ATTIO_BASE = "https://api.attio.com/v2";

/**
 * The form syncs on every screen advance so an abandoned submission is still
 * captured. Step 1 also creates the list entry; step 3 is the real submit and
 * is the only one that touches Prisma and Resend.
 */
const requestSchema = z.discriminatedUnion("step", [
  z.object({ step: z.literal(1) }).merge(screen1Schema).merge(attributionSchema),
  z
    .object({ step: z.literal(2), email: z.string().email() })
    .merge(screen2Schema),
  z
    .object({ step: z.literal(3) })
    .merge(screen1Schema)
    .merge(screen2Schema)
    .merge(screen3Schema)
    .merge(attributionSchema),
]);

type RequestBody = z.infer<typeof requestSchema>;

/** Splits a free-text full name into the personal-name shape Attio expects. */
function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    first_name: parts[0] ?? "",
    last_name: parts.length > 1 ? parts.slice(1).join(" ") : "",
    full_name: fullName.trim(),
  };
}

/** Drops empty attribution fields so we never overwrite a stored value with "". */
function attributionValues(a: Attribution) {
  const values: Record<string, unknown> = {
    source: "Inbound form",
    lifecycle_stage: "Lead",
    form_name: "near-ai-contact",
    entry_point: a.entryPoint,
  };
  const optional: Record<string, string | undefined> = {
    utm_source: a.utmSource,
    utm_medium: a.utmMedium,
    utm_campaign: a.utmCampaign,
    utm_content: a.utmContent,
    utm_term: a.utmTerm,
    referrer: a.referrer,
    landing_page: a.landingPage,
    submitted_at: a.submittedAt,
  };
  for (const [k, v] of Object.entries(optional)) {
    if (v) values[k] = v;
  }
  return values;
}

/** Builds the Attio payload for the screen that was just completed. */
function valuesForStep(body: RequestBody): Record<string, unknown> {
  if (body.step === 2) {
    return {
      email_addresses: [body.email],
      use_case: body.useCase,
      ai_stage: body.aiStage,
      sensitive_data: body.sensitiveData,
    };
  }

  if (body.step === 3) {
    return {
      email_addresses: [body.email],
      monthly_ai_spend: body.monthlyAiSpend,
      company_size: body.companySize,
      newsletter_opt_in: body.newsletterOptIn,
    };
  }

  return {
    name: [splitName(body.fullName)],
    email_addresses: [body.email],
    company_domain: domainFromEmail(body.email),
    workstream_interest: body.interests.map((i) => INTEREST_TO_ATTIO[i]),
    ...attributionValues(body),
  };
}

/** Fetch with 3 attempts and exponential backoff on 5xx/429 or network errors. */
async function attioFetch(path: string, init: RequestInit, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(`${ATTIO_BASE}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
          "Content-Type": "application/json",
          ...init.headers,
        },
      });

      if (res.ok) return (await res.json()) as any;

      const text = await res.text();
      lastError = new Error(`Attio ${res.status} on ${path}: ${text.slice(0, 300)}`);

      // 4xx other than 429 will not succeed on retry.
      if (res.status !== 429 && res.status < 500) throw lastError;
    } catch (err) {
      lastError = err;
      if (attempt === attempts) break;
    }

    await new Promise((r) => setTimeout(r, 500 * 2 ** (attempt - 1)));
  }

  throw lastError;
}

/**
 * Upserts the person by email and, on step 1, adds them to the Marketing
 * Inbound Leads list. Never throws — Attio must not affect the user's flow.
 */
async function syncToAttio(body: RequestBody) {
  if (!process.env.ATTIO_API_KEY) {
    console.error("[attio] ATTIO_API_KEY is not set — skipping sync");
    return;
  }

  try {
    const record = await attioFetch(
      "/objects/people/records?matching_attribute=email_addresses",
      { method: "PUT", body: JSON.stringify({ data: { values: valuesForStep(body) } }) }
    );

    const recordId = record?.data?.id?.record_id;
    if (!recordId) {
      console.error("[attio] upsert returned no record_id", record?.data?.id);
      return;
    }

    // The list entry is created once, when the lead first identifies itself.
    if (body.step === 1) {
      await attioFetch(`/lists/${ATTIO_LIST_ID}/entries`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            parent_record_id: recordId,
            parent_object: "people",
            entry_values: {},
          },
        }),
      });
    }

    console.log(`[attio] step ${body.step} synced ${body.email} as ${recordId}`);
  } catch (err) {
    console.error(`[attio] step ${body.step} sync failed:`, err);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Screens 1 and 2 only feed Attio; nothing else should fire mid-funnel.
  if (data.step !== 3) {
    await syncToAttio(data);
    return NextResponse.json({ success: true });
  }

  try {
    await (prisma as any).formSubmission.create({
      data: { formId: "near-ai-contact", data },
    });
  } catch (err) {
    console.error("[contact] failed to persist submission:", err);
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 500 }
    );
  }

  // TEMP: the notification email must not block the submission while this
  // environment has no Resend key. The team still needs to decide how critical
  // this email is — if it is, this should fail loudly again.
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "near-ai-contact@aurora33.online",
      to: process.env.CONTACT_NOTIFICATION_EMAIL!,
      replyTo: data.email,
      subject: `[FDE Intake] New inquiry from ${data.fullName} (${domainFromEmail(data.email)})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="margin-bottom: 8px;">New NEAR AI Inquiry</h2>
          <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 24px;" />

          <table style="width: 100%; border-collapse: collapse;">
            ${row("Name", data.fullName)}
            ${row("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
            ${row("Company domain", domainFromEmail(data.email))}
            ${row("Interested in", data.interests.join(", "))}
            ${row("AI stage", data.aiStage)}
            ${row("Sensitive data", data.sensitiveData)}
            ${row("Monthly AI spend", data.monthlyAiSpend)}
            ${row("Company size", data.companySize)}
            ${row("Newsletter opt-in", data.newsletterOptIn ? "Yes" : "No")}
            ${row("Entry point", data.entryPoint)}
          </table>

          <h3 style="margin-top: 24px; margin-bottom: 8px;">What they are building</h3>
          <p style="color: #333; background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 0; white-space: pre-wrap;">${escapeHtml(
            data.useCase
          )}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[contact] notification email failed:", err);
  }

  await syncToAttio(data);

  return NextResponse.json({ success: true });
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding: 8px 0; color: #666; width: 170px; vertical-align: top;">${label}</td>
    <td style="padding: 8px 0; font-weight: 600;">${value}</td>
  </tr>`;
}

/** User-supplied text goes into an HTML email, so angle brackets must be neutralised. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
