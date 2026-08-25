/**
 * Shared contract for the "Get in Touch" form (V2).
 * Imported by both the client form and the /api/contact route so the option
 * lists, the Attio translation and the validation rules cannot drift apart.
 */
import { z } from "zod";

/** Personal mailbox providers. Inquiries are routed by company, so these are rejected. */
export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "outlook.com",
  "hotmail.com", "live.com", "msn.com", "proton.me", "protonmail.com",
  "pm.me", "icloud.com", "me.com", "mac.com", "aol.com", "gmx.com",
  "mail.com", "zoho.com", "yandex.com", "qq.com", "163.com", "126.com",
  "naver.com", "hanmail.net", "daum.net", "fastmail.com", "tutanota.com",
  "hushmail.com",
]);

export const WORK_EMAIL_MESSAGE =
  "Please use your work email. We route every inquiry by company.";

export function domainFromEmail(email: string): string {
  return email.split("@")[1]?.trim().toLowerCase() ?? "";
}

export function isFreeEmail(email: string): boolean {
  return FREE_EMAIL_DOMAINS.has(domainFromEmail(email));
}

/** Labels shown in the form. */
export const INTEREST_OPTIONS = [
  "Private Inference API",
  "Secure Team Agents / Ironclaw",
  "Dedicated AI Infrastructure",
  "Sovereign or jurisdiction-specific deployment",
  "Custom AI implementation",
  "Other",
] as const;

/**
 * Form label -> Attio `workstream_interest` option title. Attio rejects values
 * that do not match an existing option exactly, so only these titles may be sent.
 */
export const INTEREST_TO_ATTIO: Record<string, string> = {
  "Private Inference API": "Private Inference",
  "Secure Team Agents / Ironclaw": "IronClaw",
  "Dedicated AI Infrastructure": "Dedicated AI Infrastructure",
  "Sovereign or jurisdiction-specific deployment":
    "Sovereign or jurisdiction-specific deployment",
  "Custom AI implementation": "Custom AI implementation",
  Other: "Other",
};

export const AI_STAGE_OPTIONS = [
  "In production",
  "Running a pilot or validation",
  "Preparing to deploy",
  "Just exploring",
] as const;

export const SENSITIVE_DATA_OPTIONS = ["Yes", "Possibly", "No"] as const;

// The dashes below are en-dashes (U+2013) and must match Attio's options exactly.
export const MONTHLY_SPEND_OPTIONS = [
  "Not spending yet",
  "Less than $1,000",
  "$1,000–$10,000",
  "$10,000–$50,000",
  "$50,000–$100,000",
  "More than $100,000",
] as const;

export const COMPANY_SIZE_OPTIONS = [
  "1–9",
  "10–49",
  "50–199",
  "200–499",
  "500–1,999",
  "2,000+",
] as const;

/** Captured from the browser, never shown to the user. */
export const attributionSchema = z.object({
  entryPoint: z.string().default("site-header"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional(),
  submittedAt: z.string().optional(),
});

export const screen1Schema = z.object({
  fullName: z.string().min(1, "Your name is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .refine((v) => !isFreeEmail(v), WORK_EMAIL_MESSAGE),
  interests: z.array(z.enum(INTEREST_OPTIONS)).min(1, "Please select at least one"),
});

export const screen2Schema = z.object({
  useCase: z.string().min(1, "Please describe what you are building"),
  aiStage: z.enum(AI_STAGE_OPTIONS, { message: "Please select an option" }),
  sensitiveData: z.enum(SENSITIVE_DATA_OPTIONS, { message: "Please select an option" }),
});

export const screen3Schema = z.object({
  monthlyAiSpend: z.enum(MONTHLY_SPEND_OPTIONS, { message: "Please select an option" }),
  companySize: z.enum(COMPANY_SIZE_OPTIONS, { message: "Please select an option" }),
  newsletterOptIn: z.boolean().default(false),
});

export type Screen1 = z.infer<typeof screen1Schema>;
export type Screen2 = z.infer<typeof screen2Schema>;
export type Screen3 = z.infer<typeof screen3Schema>;
export type Attribution = z.infer<typeof attributionSchema>;
export type ContactFormState = Screen1 & Screen2 & Screen3;
