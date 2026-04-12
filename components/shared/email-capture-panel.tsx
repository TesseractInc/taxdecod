"use client";

import { Mail, Send } from "lucide-react";

type EmailCapturePanelProps = {
  title: string;
  description: string;
  buttonLabel: string;
};

export default function EmailCapturePanel({
  title,
  description,
  buttonLabel,
}: EmailCapturePanelProps) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
      <div className="grid gap-6 p-7 md:p-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Mail className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            Save your salary reading
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50/78 p-5 dark:border-slate-800 dark:bg-slate-900/72">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Useful for comparison
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Save one salary result, then compare it later against another.
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50/78 p-5 dark:border-slate-800 dark:bg-slate-900/72">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Useful for recall
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Keep a clean summary instead of trying to remember raw payroll notes.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/78 p-6 dark:border-slate-800 dark:bg-slate-900/78">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="app-input mt-3"
          />

          <button type="button" className="app-button-primary mt-4 w-full">
            <Send className="h-4 w-4" />
            {buttonLabel}
          </button>

          <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
            This can later connect to PDF delivery, saved scenarios, salary alerts, and comparison history.
          </p>
        </div>
      </div>
    </div>
  );
}