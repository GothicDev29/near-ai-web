"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  AI_STAGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  INTEREST_OPTIONS,
  MONTHLY_SPEND_OPTIONS,
  SENSITIVE_DATA_OPTIONS,
  WORK_EMAIL_MESSAGE,
  isFreeEmail,
  screen1Schema,
  screen2Schema,
  screen3Schema,
  type Attribution,
  type ContactFormState,
} from "@/lib/contact-form";

export type Screen = 1 | 2 | 3 | 4;

type FormErrors = Partial<Record<keyof ContactFormState, string>>;

const EMPTY = {
  fullName: "",
  email: "",
  interests: [] as string[],
  useCase: "",
  aiStage: "",
  sensitiveData: "",
  monthlyAiSpend: "",
  companySize: "",
  newsletterOptIn: false,
};

type FormState = typeof EMPTY;

const USE_CASE_PLACEHOLDER =
  "Tell us about your use case, the data involved, your current AI stack, and what you need from NEAR AI.";

export default function GetInTouchForm({
  onScreenChange,
  entryPoint = "site-header",
}: {
  onScreenChange?: (screen: Screen) => void;
  entryPoint?: string;
}) {
  const [screen, _setScreen] = useState<Screen>(1);
  const [form, setForm] = useState<FormState>(() => ({ ...EMPTY }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const attribution = useRef<Attribution>({ entryPoint });
  // A ref, not the state above: React re-renders asynchronously, so two clicks
  // landing in the same tick would both read a stale `syncing === false`.
  const syncingRef = useRef(false);

  // Captured once on mount: the query string and referrer are gone by the time
  // the user reaches the last screen if they navigate in between.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    attribution.current = {
      entryPoint,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
      utmTerm: params.get("utm_term") ?? undefined,
      referrer: document.referrer || undefined,
      landingPage: window.location.href,
    };
  }, [entryPoint]);

  function setScreen(next: Screen) {
    _setScreen(next);
    onScreenChange?.(next);
  }

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function toggleInterest(option: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(option)
        ? f.interests.filter((i) => i !== option)
        : [...f.interests, option],
    }));
    if (errors.interests) setErrors((e) => ({ ...e, interests: undefined }));
  }

  /** Maps a Zod failure onto per-field messages. Returns true when valid. */
  function validate(schema: { safeParse: (v: unknown) => any }, value: unknown) {
    const parsed = schema.safeParse(value);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FormErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormState;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  /**
   * Screens 1 and 2 sync in the background: Attio takes a couple of seconds and
   * the route never fails the user over it, so there is nothing to wait for.
   */
  function syncInBackground(payload: Record<string, unknown>) {
    syncingRef.current = true;
    setSyncing(true);

    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .catch((err) => console.error("[contact] background sync failed:", err))
      .finally(() => {
        syncingRef.current = false;
        setSyncing(false);
      });
  }

  function handleScreen1() {
    // Step 1 also creates the list entry, and that POST does not deduplicate:
    // a second click before the sync settles would add a second entry.
    if (syncingRef.current) return;
    if (!validate(screen1Schema, form)) return;

    attribution.current.submittedAt = new Date().toISOString();
    syncInBackground({
      step: 1,
      fullName: form.fullName,
      email: form.email,
      interests: form.interests,
      ...attribution.current,
    });
    setScreen(2);
  }

  function handleScreen2() {
    if (syncingRef.current) return;
    if (!validate(screen2Schema, form)) return;

    syncInBackground({
      step: 2,
      email: form.email,
      useCase: form.useCase,
      aiStage: form.aiStage,
      sensitiveData: form.sensitiveData,
    });
    setScreen(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(screen3Schema, form)) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 3, ...form, ...attribution.current }),
      });

      if (!res.ok) {
        // An unhandled server error comes back with an empty body, so parsing
        // it as JSON would mask the real failure with a parse error.
        let message = "Something went wrong. Please try again.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) message = data.error;
        } catch {
          // Keep the generic message.
        }
        throw new Error(message);
      }

      setScreen(4);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (screen === 4) return <Confirmation />;

  const firstName = form.fullName.trim().split(" ")[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            width: "300%",
            transform: `translateX(-${(screen - 1) * (100 / 3)}%)`,
          }}
        >
          {/* ── Screen 1: Who are you ── */}
          <div className="px-6 pt-5 pb-4 space-y-4" style={{ width: `${100 / 3}%` }}>
            <p className="text-base text-gray-400">
              Tell us who you are and we&apos;ll take it from there.
            </p>

            <Field label="Full Name" error={errors.fullName} required>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                className={inputCls(!!errors.fullName)}
              />
            </Field>

            <Field label="Work Email" error={errors.email} required>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => {
                  if (form.email && isFreeEmail(form.email)) {
                    setErrors((prev) => ({ ...prev, email: WORK_EMAIL_MESSAGE }));
                  }
                }}
                className={inputCls(!!errors.email)}
              />
            </Field>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-medium text-gray-700">
                What are you interested in?
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((option) => {
                  const selected = form.interests.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleInterest(option)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                        selected
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.interests && (
                <p className="text-sm text-red-500">{errors.interests}</p>
              )}
            </div>
          </div>

          {/* ── Screen 2: What are you building ── */}
          <div className="px-6 pt-5 pb-4 space-y-4" style={{ width: `${100 / 3}%` }}>
            <div>
              {firstName && (
                <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-1">
                  Hi, {firstName}
                </p>
              )}
              <p className="text-base text-gray-400 mt-1">
                The more context you share, the better we can prepare.
              </p>
            </div>

            <Field
              label="Briefly describe what you are trying to build or deploy"
              error={errors.useCase}
              required
            >
              <textarea
                value={form.useCase}
                onChange={(e) => set("useCase", e.target.value)}
                placeholder={USE_CASE_PLACEHOLDER}
                rows={4}
                className={inputCls(!!errors.useCase)}
              />
            </Field>

            <Field label="How are you using AI today?" error={errors.aiStage} required>
              <Select
                value={form.aiStage}
                onChange={(v) => set("aiStage", v)}
                options={AI_STAGE_OPTIONS}
                hasError={!!errors.aiStage}
              />
            </Field>

            <Field
              label="Does this workload involve sensitive, regulated, confidential, or proprietary data?"
              error={errors.sensitiveData}
              required
            >
              <Select
                value={form.sensitiveData}
                onChange={(v) => set("sensitiveData", v)}
                options={SENSITIVE_DATA_OPTIONS}
                hasError={!!errors.sensitiveData}
              />
            </Field>
          </div>

          {/* ── Screen 3: Scale ── */}
          <div className="px-6 pt-5 pb-4 space-y-4" style={{ width: `${100 / 3}%` }}>
            <Field
              label="What are you currently spending each month on AI APIs, GPU infrastructure, or model hosting?"
              error={errors.monthlyAiSpend}
              required
            >
              <Select
                value={form.monthlyAiSpend}
                onChange={(v) => set("monthlyAiSpend", v)}
                options={MONTHLY_SPEND_OPTIONS}
                hasError={!!errors.monthlyAiSpend}
              />
            </Field>

            <Field
              label="How many employees does your company have?"
              error={errors.companySize}
              required
            >
              <Select
                value={form.companySize}
                onChange={(v) => set("companySize", v)}
                options={COMPANY_SIZE_OPTIONS}
                hasError={!!errors.companySize}
              />
            </Field>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={form.newsletterOptIn}
                onChange={(e) => set("newsletterOptIn", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 accent-black cursor-pointer"
              />
              <span className="text-base text-gray-700">
                Keep me updated on NEAR AI products, models, and company news.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Buttons — always pinned to the bottom of the card */}
      <div className="px-6 pb-6 pt-2">
        {screen === 1 && (
          <button
            type="button"
            onClick={handleScreen1}
            disabled={syncing}
            className={primaryBtn + " w-full" + disabledCls}
          >
            Tell us about your project →
          </button>
        )}

        {screen === 2 && (
          <div className="flex gap-3">
            <button type="button" onClick={() => setScreen(1)} className={backBtn}>
              ← Back
            </button>
            <button
              type="button"
              onClick={handleScreen2}
              disabled={syncing}
              className={primaryBtn + " flex-[2]" + disabledCls}
            >
              Continue →
            </button>
          </div>
        )}

        {screen === 3 && (
          <div className="flex gap-3">
            <button type="button" onClick={() => setScreen(2)} className={backBtn}>
              ← Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={primaryBtn + " flex-[2]" + disabledCls}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

function Confirmation() {
  return (
    <div className="px-6 pt-6 pb-7 space-y-3">
      <h3 className="text-xl font-bold text-gray-900">Thanks, we&apos;ve got it.</h3>
      <p className="text-base text-gray-600">
        We read every submission and follow up where we can help.
      </p>
      <p className="text-base text-gray-600">
        No need to wait on us, though. Get an API key and start building in a couple
        of minutes.
      </p>
      <p className="text-base text-gray-700 pt-1">
        <a href="https://cloud.near.ai/signin" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:text-black">
          Get an API key
        </a>
        <span className="text-gray-400"> · </span>
        <a href="https://docs.near.ai/cloud/quickstart" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:text-black">
          Docs
        </a>
        <span className="text-gray-400"> · </span>
        <a href="https://ironclaw.com/" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:text-black">
          IronClaw
        </a>
      </p>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  hasError,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  hasError: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg border px-3 py-2 text-base outline-none transition-colors bg-white cursor-pointer focus:ring-2 focus:ring-black/10 focus:border-gray-400 ${
        hasError ? "border-red-400 bg-red-50" : "border-gray-200"
      } ${value ? "text-gray-700" : "text-gray-400"}`}
    >
      <option value="">Select an option…</option>
      {options.map((option) => (
        <option key={option} value={option} className="text-gray-700">
          {option}
        </option>
      ))}
    </select>
  );
}

const primaryBtn =
  "bg-black text-white py-2.5 rounded-lg text-base font-medium hover:bg-black/85 transition-colors cursor-pointer";
const disabledCls =
  " disabled:opacity-50 disabled:cursor-not-allowed";
const backBtn =
  "flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-base font-medium hover:border-gray-400 transition-colors cursor-pointer";

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg border px-3 py-2 text-base outline-none transition-colors",
    "placeholder:text-gray-400",
    "focus:ring-2 focus:ring-black/10 focus:border-gray-400",
    hasError
      ? "border-red-400 bg-red-50 focus:ring-red-200"
      : "border-gray-200 bg-gray-50",
  ].join(" ");
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
