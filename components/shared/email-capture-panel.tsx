"use client";

import { useState } from "react";
import { Download, Mail, Send, ShieldCheck } from "lucide-react";

type EmailCapturePanelProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function EmailCapturePanel({
  title = "Get your salary report by email",
  description = "Save your salary result, send the report to yourself, and get useful updates when UK tax-year assumptions change.",
  buttonLabel = "Email me the report",
}: EmailCapturePanelProps) {
  const [email, setEmail] = useState("");

  return (
    <section className="app-card-strong overflow-hidden rounded-[34px] p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full app-chip px-4 py-2 text-xs font-semibold">
            <Mail className="h-3.5 w-3.5" />
            Save, email, revisit
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight app-title sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 app-copy">{description}</p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 app-accent" />
              <p className="text-sm app-copy">
                Keep the calculator open and friction-light. Use email as a
                useful upgrade, not a forced wall.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Download className="mt-0.5 h-4 w-4 app-accent" />
              <p className="text-sm app-copy">
                Best conversion path: let people download the PDF now, then
                offer email delivery and future updates as the second action.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm app-subtle">
            Recommended launch rule: do not force sign-up before calculation.
            Offer email for report delivery, saved results, and tax-year update
            alerts.
          </p>
        </div>

        <div className="app-soft rounded-[28px] p-5 md:p-6">
          <label className="mb-2 block text-sm font-medium app-title">
            Your email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="app-input"
          />

          <button
            type="button"
            className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[18px] px-5 text-sm font-semibold text-white transition hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-2), var(--primary))",
              boxShadow: "0 16px 34px rgba(14,165,233,0.22)",
            }}
          >
            <Send className="h-4 w-4" />
            {buttonLabel}
          </button>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border px-4 py-4 app-soft">
              <p className="text-sm font-semibold app-title">Use case</p>
              <p className="mt-2 text-xs leading-6 app-copy">
                Send yourself the PDF after comparing different salary scenarios.
              </p>
            </div>

            <div className="rounded-[18px] border px-4 py-4 app-soft">
              <p className="text-sm font-semibold app-title">Trust-safe</p>
              <p className="mt-2 text-xs leading-6 app-copy">
                Value first, email second. Better for trust and better for
                conversion.
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-6 app-subtle">
            Connect this panel to your email/PDF delivery endpoint before
            turning it fully live.
          </p>
        </div>
      </div>
    </section>
  );
}