"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";

type EmailCapturePanelProps = {
  title: string;
  description: string;
  buttonLabel: string;
  eyebrow?: string;
  placeholder?: string;
  privacyNote?: string;
  signedInMessage?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EmailCapturePanel({
  title,
  description,
  buttonLabel,
  eyebrow = "Save your salary reading",
  placeholder = "you@example.com",
  privacyNote = "Your email is used for sign-in and future saved-result access. TaxDecod does not need extra personal data for this step.",
  signedInMessage = "You are signed in. This email can now be used later for saved scenarios, report delivery, and return access.",
}: EmailCapturePanelProps) {
  const { configured, ready, user, email: authEmail, status, notice, sendMagicLink, clearNotice } =
    useSupabaseAuth();

  const [email, setEmail] = useState(authEmail ?? "");
  const [localError, setLocalError] = useState("");

  const helperCards = useMemo(
    () => [
      {
        title: "Useful for saved scenarios",
        description:
          "Keep salary and comparison results tied to your login instead of losing them between visits.",
      },
      {
        title: "Useful for return access",
        description:
          "Sign in once by email and come back later to continue your salary planning journey.",
      },
    ],
    []
  );

  const isBusy = status === "sending-link" || status === "loading";
  const isSignedIn = status === "signed-in" && !!user;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (notice) {
      clearNotice();
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setLocalError("Enter your email address first.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setLocalError("Enter a valid email address.");
      return;
    }

    setLocalError("");
    await sendMagicLink(trimmedEmail);
  }

  const panelMessage =
    localError ||
    notice ||
    (isSignedIn ? signedInMessage : "");

  const panelTone =
    localError || status === "error"
      ? "error"
      : isSignedIn || status === "link-sent"
      ? "success"
      : "neutral";

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/94">
      <div className="grid gap-6 p-7 md:p-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Mail className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            {eyebrow}
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {helperCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50/78 p-5 dark:border-slate-800 dark:bg-slate-900/72"
              >
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/78 p-6 dark:border-slate-800 dark:bg-slate-900/78">
          {!configured ? (
            <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-5 py-5 dark:border-amber-900/60 dark:bg-amber-950/20">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Supabase is not configured yet
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-700 dark:text-amber-200">
                Add your public Supabase environment keys first, then this panel
                will send real magic-link sign-ins.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label
                htmlFor="taxdecod-email-capture"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Your email
              </label>

              <input
                id="taxdecod-email-capture"
                type="email"
                value={isSignedIn ? authEmail ?? "" : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (localError) setLocalError("");
                  if (notice) clearNotice();
                }}
                placeholder={placeholder}
                autoComplete="email"
                inputMode="email"
                disabled={isBusy || isSignedIn}
                className="app-input mt-3 disabled:cursor-not-allowed disabled:opacity-70"
              />

              <button
                type="submit"
                disabled={isBusy || isSignedIn || !ready}
                className="app-button-primary mt-4 flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending sign-in link...
                  </>
                ) : isSignedIn ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Signed in
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {buttonLabel}
                  </>
                )}
              </button>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2 rounded-[18px] border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950/70">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {privacyNote}
                  </p>
                </div>

                {panelMessage ? (
                  <div
                    className={[
                      "rounded-[18px] border px-4 py-3 text-sm leading-7",
                      panelTone === "error"
                        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-rose-300"
                        : panelTone === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300"
                        : "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300",
                    ].join(" ")}
                  >
                    {panelTone === "success" ? (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{panelMessage}</span>
                      </div>
                    ) : (
                      panelMessage
                    )}
                  </div>
                ) : null}

                {!isSignedIn ? (
                  <div className="flex items-start gap-2 rounded-[18px] border border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900/60 dark:bg-sky-950/20">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                    <p className="text-sm leading-7 text-sky-700 dark:text-sky-300">
                      This uses your existing Supabase magic-link login flow, so
                      the email panel is now part of real account access, not a
                      fake capture form.
                    </p>
                  </div>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}