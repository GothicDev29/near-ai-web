"use client";

import React, { useState } from "react";
import { StatusSelect } from "./StatusSelect";
import {
  detailFields,
  summarize,
  type SubmissionData,
} from "@cms/lib/form-submissions";

type Props = {
  sub: {
    id: string;
    formId: string;
    status: string;
    data?: unknown;
  };
  formattedDate: string;
};

/** The stored JSON is untyped, so narrow it instead of asserting a shape. */
function toData(value: unknown): SubmissionData {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as SubmissionData)
    : {};
}

export function SubmissionRow({ sub, formattedDate }: Props) {
  const [open, setOpen] = useState(false);

  const data = toData(sub.data);
  const { contact, companyOrDomain, email } = summarize(sub.formId, data);
  const details = detailFields(sub.formId, data);

  return (
    <React.Fragment>
      <tr className="hover:bg-muted/20 transition border-t border-border/50 first:border-t-0">
        <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
          {formattedDate}
        </td>
        <td className="px-6 py-4 text-sm font-medium">{contact ?? "—"}</td>
        <td className="px-6 py-4 text-sm">{companyOrDomain ?? "—"}</td>
        <td className="px-6 py-4 text-sm">
          {email ? (
            <a href={`mailto:${email}`} className="hover:text-primary transition">
              {email}
            </a>
          ) : "—"}
        </td>
        <td className="px-6 py-4">
          <StatusSelect id={sub.id} initial={sub.status} />
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <svg
              className={`w-3 h-3 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {open ? "Hide" : "Details"}
          </button>
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="px-6 pt-4 pb-5 bg-muted/5 border-t border-border/40">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
                {sub.formId}
              </p>

              {details.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No additional fields on this submission.
                </p>
              ) : (
                <div className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {details.map((field) => (
                    <div
                      key={field.label}
                      className={field.multiline ? "sm:col-span-2 lg:col-span-3" : undefined}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        {field.label}
                      </p>
                      <p
                        className={
                          field.multiline
                            ? "text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed"
                            : "text-sm break-words"
                        }
                      >
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
