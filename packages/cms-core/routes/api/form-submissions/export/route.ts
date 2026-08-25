export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@cms/lib/auth";
import { prisma } from "@cms/lib/prisma";
import {
  asDisplay,
  domainFromEmail,
  asText,
  type SubmissionData,
} from "@cms/lib/form-submissions";

/** Rows are pulled and streamed in batches so the whole table is never held in memory. */
const BATCH_SIZE = 500;

/**
 * The union of both form versions. Columns that do not apply to a row are left
 * empty. Anything not listed here still ships, collected into "otherFields", so
 * a future form version cannot silently drop data from the export.
 */
const COLUMNS: Array<[header: string, key: string]> = [
  ["Submission ID", "id"],
  ["Created At", "createdAt"],
  ["Form", "formId"],
  ["Status", "status"],
  ["Contact", "contact"],
  ["Company / Domain", "companyOrDomain"],
  ["Email", "email"],
  // V1 only
  ["Phone", "phone"],
  ["Product Category", "productCategory"],
  ["Solution Description", "solutionDescription"],
  ["Time Zone", "timeZone"],
  // V2 only
  ["Interested In", "interests"],
  ["Use Case", "useCase"],
  ["AI Stage", "aiStage"],
  ["Sensitive Data", "sensitiveData"],
  ["Monthly AI Spend", "monthlyAiSpend"],
  ["Company Size", "companySize"],
  ["Newsletter Opt-in", "newsletterOptIn"],
  ["Entry Point", "entryPoint"],
  ["Landing Page", "landingPage"],
  ["Referrer", "referrer"],
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
  ["Submitted At", "submittedAt"],
  ["Other Fields", "otherFields"],
];

/** Keys already covered by a named column, so they stay out of "otherFields". */
const MAPPED_KEYS = new Set([
  "contactName", "companyName", "fullName", "email", "name", "step",
  ...COLUMNS.map(([, key]) => key),
]);

/**
 * A leading =, +, - or @ makes spreadsheet software treat the cell as a formula.
 * Submissions are user-supplied text, so neutralise it.
 */
function escapeCell(value: string): string {
  const guarded = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${guarded.replace(/"/g, '""')}"`;
}

function toCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  // A comma would be ambiguous inside a quoted cell, so use a semicolon.
  if (Array.isArray(value)) return value.map((v) => asDisplay(v) ?? "").join("; ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

type Row = {
  id: string;
  formId: string;
  status: string;
  createdAt: Date;
  data: unknown;
};

function buildLine(row: Row): string {
  const data: SubmissionData =
    row.data && typeof row.data === "object" && !Array.isArray(row.data)
      ? (row.data as SubmissionData)
      : {};

  const email = asText(data.email);
  const values: Record<string, unknown> = {
    ...data,
    id: row.id,
    formId: row.formId,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    contact: asText(data.fullName) ?? asText(data.contactName) ?? asText(data.name),
    companyOrDomain: asText(data.companyName) ?? domainFromEmail(email),
    email,
  };

  const extra: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (!MAPPED_KEYS.has(key)) extra[key] = value;
  }
  values.otherFields = Object.keys(extra).length > 0 ? JSON.stringify(extra) : "";

  return COLUMNS.map(([, key]) => escapeCell(toCell(values[key]))).join(",") + "\r\n";
}

export async function GET() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // BOM so Excel reads the UTF-8 accents and en-dashes correctly.
        controller.enqueue(encoder.encode("﻿"));
        controller.enqueue(
          encoder.encode(COLUMNS.map(([header]) => escapeCell(header)).join(",") + "\r\n")
        );

        let skip = 0;
        for (;;) {
          const rows: Row[] = await (prisma as any).formSubmission.findMany({
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            take: BATCH_SIZE,
            skip,
          });
          if (rows.length === 0) break;

          controller.enqueue(encoder.encode(rows.map(buildLine).join("")));
          if (rows.length < BATCH_SIZE) break;
          skip += BATCH_SIZE;
        }

        controller.close();
      } catch (err) {
        console.error("[form-submissions] CSV export failed:", err);
        controller.error(err);
      }
    },
  });

  const today = new Date().toISOString().slice(0, 10);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="form-submissions-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
