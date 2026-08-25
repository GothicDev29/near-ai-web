/**
 * Shared shape handling for form submissions.
 *
 * Two form versions coexist in the same table and must both render correctly:
 *   - "fde-contact"     (V1) contactName / companyName / phone / timeZone / ...
 *   - "near-ai-contact" (V2) fullName / interests[] / aiStage / attribution / ...
 *
 * The stored `data` column is untyped JSON, so every read goes through the
 * coercion helpers below instead of being asserted into a type. An unknown
 * formId falls back to a generic rendering rather than showing empty columns.
 */

export const V1_FORM_ID = "fde-contact";
export const V2_FORM_ID = "near-ai-contact";

export type SubmissionData = Record<string, unknown>;

/** Returns the value only when it is a usable string. */
export function asText(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return undefined;
}

export function asList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.map(asText).filter((v): v is string => !!v);
  return items.length > 0 ? items : undefined;
}

export function asBool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

/** Renders any JSON value as a single line of text, for generic fallbacks. */
export function asDisplay(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return asList(value)?.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return asText(value);
}

/** V2 does not capture a company name, so the email domain stands in for it. */
export function domainFromEmail(email: string | undefined): string | undefined {
  if (!email) return undefined;
  return asText(email.split("@")[1]?.toLowerCase());
}

/** Turns a camelCase key into a readable label, for unknown form versions. */
export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export type RowSummary = {
  contact?: string;
  companyOrDomain?: string;
  email?: string;
};

/** The three identity columns of the table, resolved per form version. */
export function summarize(formId: string, data: SubmissionData): RowSummary {
  const email = asText(data.email);

  if (formId === V1_FORM_ID) {
    return {
      contact: asText(data.contactName),
      companyOrDomain: asText(data.companyName),
      email,
    };
  }

  if (formId === V2_FORM_ID) {
    return {
      contact: asText(data.fullName),
      companyOrDomain: domainFromEmail(email),
      email,
    };
  }

  // Unknown version: accept whichever of the known aliases is present rather
  // than rendering an empty row.
  return {
    contact: asText(data.fullName) ?? asText(data.contactName) ?? asText(data.name),
    companyOrDomain: asText(data.companyName) ?? domainFromEmail(email),
    email,
  };
}

export type DetailField = { label: string; value: string; multiline?: boolean };

const V1_DETAILS: Array<[string, string, boolean?]> = [
  ["productCategory", "Category"],
  ["phone", "Phone"],
  ["timeZone", "Time Zone"],
  ["solutionDescription", "Solution Description", true],
];

const V2_DETAILS: Array<[string, string, boolean?]> = [
  ["interests", "Interested In"],
  ["useCase", "What They Are Building", true],
  ["aiStage", "AI Stage"],
  ["sensitiveData", "Sensitive Data"],
  ["monthlyAiSpend", "Monthly AI Spend"],
  ["companySize", "Company Size"],
  ["newsletterOptIn", "Newsletter Opt-in"],
  ["entryPoint", "Entry Point"],
  ["landingPage", "Landing Page"],
  ["referrer", "Referrer"],
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["utmContent", "utm_content"],
  ["utmTerm", "utm_term"],
  ["submittedAt", "Submitted At"],
];

/** Keys already shown in the table columns, so details never repeat them. */
const SUMMARY_KEYS = new Set([
  "contactName", "companyName", "fullName", "email", "name", "step",
]);

function collect(
  data: SubmissionData,
  spec: Array<[string, string, boolean?]>
): DetailField[] {
  const fields: DetailField[] = [];
  for (const [key, label, multiline] of spec) {
    const raw = data[key];
    const value =
      typeof raw === "boolean" ? (raw ? "Yes" : "No") : asDisplay(raw);
    if (value) fields.push({ label, value, multiline });
  }
  return fields;
}

/** Fields for the expanded detail panel, chosen by form version. */
export function detailFields(formId: string, data: SubmissionData): DetailField[] {
  if (formId === V1_FORM_ID) return collect(data, V1_DETAILS);
  if (formId === V2_FORM_ID) return collect(data, V2_DETAILS);

  // Unknown version: show everything that is not already a table column.
  return Object.entries(data)
    .filter(([key]) => !SUMMARY_KEYS.has(key))
    .map(([key, raw]) => {
      const value =
        typeof raw === "boolean" ? (raw ? "Yes" : "No") : asDisplay(raw);
      return value ? { label: humanizeKey(key), value } : null;
    })
    .filter((f): f is DetailField => f !== null);
}
