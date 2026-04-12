"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  Clock3,
  Database,
  LogIn,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";

type SavedScenarioRow = {
  id: number;
  created_at: string;
  label: string;
  values: CalculatorInput;
  result: TakeHomeResult;
};

type ScenarioVaultProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
  onLoadScenario: (values: CalculatorInput) => void;
};

function makeScenarioLabel(values: CalculatorInput) {
  const periodLabel = values.payPeriod === "monthly" ? "monthly" : "yearly";
  const regionLabel = values.region === "scotland" ? "Scotland" : "UK";
  return `${formatCurrency(values.salary)} ${periodLabel} · ${regionLabel}`;
}

export default function ScenarioVault({
  values,
  result,
  onLoadScenario,
}: ScenarioVaultProps) {
  const {
    configured,
    ready,
    user,
    email,
    status: authStatus,
    notice: authNotice,
    sendMagicLink,
    clearNotice,
  } = useSupabaseAuth();

  const [loginEmail, setLoginEmail] = useState(email ?? "");
  const [scenarios, setScenarios] = useState<SavedScenarioRow[]>([]);
  const [loadingScenarios, setLoadingScenarios] = useState(false);
  const [savingScenario, setSavingScenario] = useState(false);
  const [workingId, setWorkingId] = useState<number | null>(null);
  const [localNotice, setLocalNotice] = useState<string | null>(null);

  useEffect(() => {
    setLoginEmail(email ?? "");
  }, [email]);

  const currentLabel = useMemo(() => makeScenarioLabel(values), [values]);

  const clearLocalNoticeSoon = useCallback(() => {
    window.setTimeout(() => setLocalNotice(null), 1800);
  }, []);

  const fetchScenarios = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !user) {
      setScenarios([]);
      return;
    }

    setLoadingScenarios(true);

    const { data, error } = await supabase
      .from("saved_scenarios")
      .select("id, created_at, label, values, result")
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) {
      setLocalNotice(error.message || "Unable to load saved scenarios.");
      setLoadingScenarios(false);
      clearLocalNoticeSoon();
      return;
    }

    setScenarios((data ?? []) as SavedScenarioRow[]);
    setLoadingScenarios(false);
  }, [user, clearLocalNoticeSoon]);

  useEffect(() => {
    if (!configured || !ready || !user) {
      setScenarios([]);
      return;
    }

    void fetchScenarios();
  }, [configured, ready, user, fetchScenarios]);

  const handleSendLink = async () => {
    const response = await sendMagicLink(loginEmail);

    if (response.ok) {
      setLoginEmail(loginEmail.trim().toLowerCase());
    }
  };

  const handleSaveScenario = async () => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !user) return;

    setSavingScenario(true);

    const payload = {
      user_id: user.id,
      label: currentLabel,
      values,
      result,
    };

    const { error } = await supabase.from("saved_scenarios").insert(payload);

    setSavingScenario(false);

    if (error) {
      setLocalNotice(error.message || "Unable to save scenario.");
      clearLocalNoticeSoon();
      return;
    }

    setLocalNotice("Scenario saved.");
    clearLocalNoticeSoon();
    void fetchScenarios();
  };

  const handleDeleteScenario = async (id: number) => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) return;

    setWorkingId(id);

    const { error } = await supabase
      .from("saved_scenarios")
      .delete()
      .eq("id", id);

    setWorkingId(null);

    if (error) {
      setLocalNotice(error.message || "Unable to delete scenario.");
      clearLocalNoticeSoon();
      return;
    }

    setLocalNotice("Scenario deleted.");
    clearLocalNoticeSoon();
    setScenarios((current) => current.filter((item) => item.id !== id));
  };

  const handleLoadScenario = (scenario: SavedScenarioRow) => {
    onLoadScenario(scenario.values);
    setLocalNotice("Scenario loaded.");
    clearLocalNoticeSoon();
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
      <div className="relative border-b border-slate-200 px-5 py-6 dark:border-slate-800 sm:px-6 sm:py-7 lg:px-7">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,165,233,0.08), rgba(14,165,233,0))",
          }}
        />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300">
              <Bookmark className="h-3.5 w-3.5" />
              Login + saved scenarios
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Save salary scenarios and come back to them later
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              This is the retention layer for TaxDecod. A user signs in once,
              stores salary readings, then reloads them later instead of
              starting from zero.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:min-w-[420px]">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Current take-home
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
                {formatCurrency(result.netMonthly)}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                monthly result now
              </p>
            </div>

            <div className="rounded-[22px] border border-emerald-200 bg-emerald-50/80 px-4 py-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                Saved scenarios
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-300 sm:text-xl">
                {scenarios.length}
              </p>
              <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
                account-based history
              </p>
            </div>

            <div className="rounded-[22px] border border-violet-200 bg-violet-50/80 px-4 py-4 dark:border-violet-900/60 dark:bg-violet-950/20">
              <p className="text-[11px] uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
                Account
              </p>
              <p className="mt-2 text-sm font-semibold text-violet-700 dark:text-violet-300 sm:text-base">
                {user?.email ? "Signed in" : "Not signed in"}
              </p>
              <p className="mt-1 text-xs text-violet-700/80 dark:text-violet-300/80">
                email magic link login
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:p-7">
        <div className="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
          {!configured ? (
            <div className="rounded-[24px] border border-amber-200 bg-amber-50/80 px-4 py-4 dark:border-amber-900/60 dark:bg-amber-950/20">
              <div className="flex items-start gap-3">
                <Database className="mt-0.5 h-4 w-4 text-amber-700 dark:text-amber-300" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Supabase is not connected yet
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Add your Supabase URL and publishable key, then this section
                    becomes a real login + cloud save system.
                  </p>
                </div>
              </div>
            </div>
          ) : user ? (
            <>
              <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Signed in as
                </p>
                <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {email}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Current scenario
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentLabel}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Net monthly {formatCurrency(result.netMonthly)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Trust layer
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Based on UK tax rules
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Saved as a scenario history for decision-making, not an HMRC
                    record.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveScenario}
                disabled={savingScenario}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-2), var(--primary))",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.18)",
                }}
              >
                <Save className="h-4 w-4" />
                {savingScenario ? "Saving..." : "Save current scenario"}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
                  <LogIn className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Sign in with email
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Send a secure sign-in link to unlock saved scenarios.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Your email
                </label>

                <input
                  type="email"
                  inputMode="email"
                  value={loginEmail}
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                    clearNotice();
                  }}
                  placeholder="you@example.com"
                  className="app-input mt-3 h-[58px] rounded-[20px] sm:h-[62px] sm:rounded-[22px]"
                />
              </div>

              <button
                type="button"
                onClick={handleSendLink}
                disabled={authStatus === "sending-link"}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-2), var(--primary))",
                  boxShadow: "0 16px 34px rgba(14,165,233,0.18)",
                }}
              >
                <LogIn className="h-4 w-4" />
                {authStatus === "sending-link"
                  ? "Sending link..."
                  : "Send sign-in link"}
              </button>
            </>
          )}

          <div className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-600 dark:text-sky-400" />
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                Updated for the current product flow: calculate, understand,
                save, then return for another salary decision later.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/80 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Saved salary scenarios
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Users can reload old salary readings instantly and continue the
                journey from where they left off.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Status
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {loadingScenarios ? "Loading" : "Ready"}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-sky-200 bg-sky-50/70 px-4 py-4 dark:border-sky-900/50 dark:bg-sky-950/20 sm:px-5 sm:py-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/90 p-2.5 shadow-sm dark:bg-slate-950/70">
                <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Why this matters
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Saved scenarios increase return visits, improve comparison
                  behavior, and prepare TaxDecod for future premium layers.
                </p>
              </div>
            </div>
          </div>

          {!user ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-900/70">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-950">
                <Bookmark className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                Sign in to start saving
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Use the email sign-in on the left, then save the current salary
                scenario.
              </p>
            </div>
          ) : loadingScenarios ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Loading saved scenarios...
              </p>
            </div>
          ) : scenarios.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-900/70">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-950">
                <Save className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                No saved scenarios yet
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Save the current result to begin building a salary history.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {scenario.label}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          {new Date(scenario.created_at).toLocaleString()}
                        </span>
                        <span>
                          Net monthly {formatCurrency(scenario.result.netMonthly)}
                        </span>
                        <span>
                          Net yearly {formatCurrency(scenario.result.netAnnual)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:min-w-[180px]">
                      <button
                        type="button"
                        onClick={() => handleLoadScenario(scenario)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[16px] px-4 text-sm font-semibold text-white transition hover:scale-[1.01]"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--primary-2), var(--primary))",
                        }}
                      >
                        Load scenario
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteScenario(scenario.id)}
                        disabled={workingId === scenario.id}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        {workingId === scenario.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                {authNotice || localNotice || "Ready to save and reload salary scenarios."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}