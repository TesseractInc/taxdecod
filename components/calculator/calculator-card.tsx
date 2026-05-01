"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Landmark,
  LockKeyhole,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import type { CalculatorInput, Region, StudentLoanPlan } from "../../types/tax";
import SavedScenariosPanel from "../shared/saved-scenarios-panel";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";
import {
  createScenarioId,
  getLastScenario,
  saveLastScenario,
  saveScenario,
  type SavedScenario,
} from "../../lib/tax/storage/saved-scenarios";
import { formatCurrency } from "../../lib/tax/utils/currency";

type CalculatorCardProps = {
  mode?: "overview" | "full";
  values?: CalculatorInput;
  onValuesChange?: (values: CalculatorInput) => void;
};

const defaultValues: CalculatorInput = {
  salary: 30000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "none",
  taxCode: "1257L",
};

const salaryPresets = [25000, 30000, 40000, 50000, 70000];

const studentLoanOptions: Array<{
  value: StudentLoanPlan;
  label: string;
  hint: string;
}> = [
  { value: "none" as StudentLoanPlan, label: "None", hint: "No loan" },
  { value: "plan1" as StudentLoanPlan, label: "Plan 1", hint: "Older plan" },
  { value: "plan2" as StudentLoanPlan, label: "Plan 2", hint: "Common plan" },
  { value: "plan4" as StudentLoanPlan, label: "Plan 4", hint: "Scotland" },
  { value: "plan5" as StudentLoanPlan, label: "Plan 5", hint: "Newer plan" },
  {
    value: "postgrad" as StudentLoanPlan,
    label: "Postgrad",
    hint: "PG loan",
  },
];

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(1)}%`;
}

function getKeepRate(result: ReturnType<typeof calculateTakeHome>) {
  if (!result.grossAnnual) return 0;
  return (result.netAnnual / result.grossAnnual) * 100;
}

function getTaxDragRate(result: ReturnType<typeof calculateTakeHome>) {
  if (!result.grossAnnual) return 0;
  return (result.totalDeductionsAnnual / result.grossAnnual) * 100;
}

function getBarWidth(value: number, max: number) {
  if (!max) return "0%";
  return `${Math.max(6, Math.min(100, (value / max) * 100))}%`;
}

export default function CalculatorCard({
  mode = "full",
  values,
  onValuesChange,
}: CalculatorCardProps) {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const { user, email } = useSupabaseAuth();
  const userScope = user?.id || email || "guest";

  const [internalValues, setInternalValues] =
    useState<CalculatorInput>(defaultValues);
  const [showDetails, setShowDetails] = useState(false);
  const [showTaxCode, setShowTaxCode] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    if (values) {
      setInternalValues(values);
    }
  }, [values]);

  useEffect(() => {
    if (values) return;

    const saved = getLastScenario<CalculatorInput>("calculator", userScope);
    if (saved?.salary) {
      setInternalValues({
        ...defaultValues,
        ...saved,
      });
    }
  }, [userScope, values]);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      const value = Number(customEvent.detail);

      if (!Number.isFinite(value) || value < 1000) return;

      const nextValues = {
        ...(values ?? internalValues),
        salary: value,
      };

      if (!values) {
        setInternalValues(nextValues);
      }

      onValuesChange?.(nextValues);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    };

    window.addEventListener("prefillSalary", handler);

    return () => {
      window.removeEventListener("prefillSalary", handler);
    };
  }, [internalValues, onValuesChange, values]);

  const currentValues = values ?? internalValues;

  const result = useMemo(() => {
    return calculateTakeHome(currentValues);
  }, [currentValues]);

  const keepRate = getKeepRate(result);
  const taxDragRate = getTaxDragRate(result);
  const isOverview = mode === "overview";

  const deductions = [
    {
      label: "Income Tax",
      value: result.incomeTaxAnnual,
      tone: "from-cyan-400 to-blue-500",
    },
    {
      label: "National Insurance",
      value: result.nationalInsuranceAnnual,
      tone: "from-blue-400 to-indigo-500",
    },
    {
      label: "Pension",
      value: result.pensionAnnual,
      tone: "from-indigo-400 to-violet-500",
    },
    {
      label: "Student Loan",
      value: result.studentLoanAnnual,
      tone: "from-pink-400 to-rose-500",
    },
  ];

  const maxDeduction = Math.max(...deductions.map((item) => item.value), 1);

  useEffect(() => {
    saveLastScenario(
      "calculator",
      currentValues as unknown as Record<string, unknown>,
      userScope,
    );
  }, [currentValues, userScope]);

  function updateValues(nextValues: CalculatorInput) {
    if (!values) {
      setInternalValues(nextValues);
    }

    onValuesChange?.(nextValues);
  }

  const updateField = <K extends keyof CalculatorInput>(
    key: K,
    value: CalculatorInput[K],
  ) => {
    updateValues({
      ...currentValues,
      [key]: value,
    });
  };

  function handleSaveScenario() {
    const scenario: SavedScenario = {
      id: createScenarioId("calculator"),
      type: "calculator",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: `£${currentValues.salary.toLocaleString("en-GB")} salary route`,
      subtitle: `${formatCurrency(result.netMonthly)}/month · ${
        currentValues.region === "scotland" ? "Scotland" : "UK"
      } · ${
        currentValues.studentLoanPlan === "none"
          ? "No student loan"
          : `Student loan: ${currentValues.studentLoanPlan}`
      }`,
      payload: currentValues as unknown as Record<string, unknown>,
    };

    saveScenario(scenario, userScope);
    setSaveNotice("Saved to your recent salary scenarios.");
    window.setTimeout(() => setSaveNotice(""), 2200);
  }

  function handleLoadScenario(scenario: SavedScenario) {
    const payload = scenario.payload as Partial<CalculatorInput>;
    const nextValues: CalculatorInput = {
      ...defaultValues,
      ...payload,
    };

    updateValues(nextValues);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  }

  return (
    <section className={isOverview ? "pb-0" : "pb-10"}>
      <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/78 p-3 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(34,211,238,0.13),transparent_34%),radial-gradient(circle_at_100%_14%,rgba(99,102,241,0.12),transparent_32%)]" />

        <div className="relative z-10 grid gap-3 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-800">
                  <Sparkles className="h-3.5 w-3.5" />
                  Salary input
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Start with one number.
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Enter your gross salary, then only adjust the settings that
                  actually apply to you.
                </p>
              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                PAYE-style estimate
              </div>
            </div>

            <div className="mt-5 rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-slate-950">
                  Gross salary
                </label>

                <div className="grid grid-cols-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
                  {(["yearly", "monthly"] as const).map((period) => {
                    const isActive = currentValues.payPeriod === period;

                    return (
                      <button
                        key={period}
                        type="button"
                        onClick={() => updateField("payPeriod", period)}
                        className={`rounded-full px-3 py-1.5 transition ${
                          isActive
                            ? "bg-slate-950 text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-950"
                        }`}
                      >
                        {period === "yearly" ? "Yearly" : "Monthly"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-cyan-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                <span className="mr-3 text-3xl font-semibold text-slate-400">
                  £
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={currentValues.salary}
                  onChange={(event) =>
                    updateField("salary", Number(event.target.value))
                  }
                  className="min-w-0 flex-1 bg-transparent text-4xl font-semibold tracking-[-0.05em] text-slate-950 outline-none sm:text-5xl"
                  placeholder={
                    currentValues.payPeriod === "monthly" ? "3000" : "40000"
                  }
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {salaryPresets.map((salary) => {
                  const isActive =
                    currentValues.salary === salary &&
                    currentValues.payPeriod === "yearly";

                  return (
                    <button
                      key={salary}
                      type="button"
                      onClick={() =>
                        updateValues({
                          ...currentValues,
                          salary,
                          payPeriod: "yearly",
                        })
                      }
                      className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                          : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:text-slate-950"
                      }`}
                    >
                      £{salary.toLocaleString("en-GB")}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Landmark className="h-4 w-4" />
                  </span>
                  <label className="text-sm font-semibold text-slate-950">
                    Region
                  </label>
                </div>

                <select
                  value={currentValues.region}
                  onChange={(event) =>
                    updateField("region", event.target.value as Region)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                >
                  <option value="uk">England, Wales & NI</option>
                  <option value="scotland">Scotland</option>
                </select>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Target className="h-4 w-4" />
                  </span>
                  <label className="text-sm font-semibold text-slate-950">
                    Pension
                  </label>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={currentValues.pensionPercent}
                    onChange={(event) =>
                      updateField("pensionPercent", Number(event.target.value))
                    }
                    className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-slate-950 outline-none"
                    placeholder="5"
                  />
                  <span className="text-sm font-bold text-slate-400">%</span>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <label className="text-sm font-semibold text-slate-950">
                    Student loan
                  </label>
                  <p className="text-xs text-slate-500">
                    Pick the plan that applies, or leave as none.
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {studentLoanOptions.map((option) => {
                  const isActive = currentValues.studentLoanPlan === option.value;

                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() =>
                        updateField("studentLoanPlan", option.value)
                      }
                      className={`rounded-2xl border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-cyan-300 bg-cyan-50 shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`block text-sm font-bold ${
                          isActive ? "text-cyan-800" : "text-slate-950"
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[11px] text-slate-500">
                        {option.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Tax code
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Leave this unless your payslip shows another code.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTaxCode((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-white"
                >
                  {showTaxCode ? (
                    <>
                      Hide <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Show <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {showTaxCode ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={currentValues.taxCode}
                    onChange={(event) =>
                      updateField("taxCode", event.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    placeholder="1257L"
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <button
                type="button"
                onClick={() =>
                  resultRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                  })
                }
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_50px_-26px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5"
              >
                Show my take-home pay
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              {isOverview ? (
                <Link
                  href="/calculator"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5"
                >
                  Open full calculator
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save route
                </button>
              )}
            </div>

            {!isOverview && saveNotice ? (
              <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                {saveNotice}
              </div>
            ) : null}
          </div>

          <div
            ref={resultRef}
            className="relative overflow-hidden rounded-[28px] bg-[#071014] p-4 text-white shadow-2xl sm:p-5"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_96%_15%,rgba(99,102,241,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />

            <motion.div
              className="pointer-events-none absolute -right-12 top-8 h-60 w-60 rounded-full border border-cyan-300/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-2 top-24 h-32 w-32 rounded-full border border-indigo-300/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Your take-home result
                  </p>
                  <h2 className="mt-2 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
                    {formatCurrency(result.netMonthly)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    estimated monthly take-home pay
                  </p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                  Live estimate
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs text-slate-400">Annual net</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatCurrency(result.netAnnual)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs text-slate-400">Keep rate</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatPercent(keepRate)}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs text-slate-400">Total deductions</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatCurrency(result.totalDeductionsAnnual)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.055] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-100">
                    Deduction breakdown
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatPercent(taxDragRate)} tax drag
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  {deductions.map((item, index) => (
                    <div key={item.label}>
                      <div className="flex justify-between gap-4 text-xs">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold text-slate-100">
                          {formatCurrency(item.value)}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: getBarWidth(item.value, maxDeduction),
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.14 + index * 0.08,
                            duration: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.09]"
                >
                  {showDetails ? "Hide result detail" : "Show result detail"}
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {showDetails ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Gross annual", result.grossAnnual],
                      ["Income Tax", result.incomeTaxAnnual],
                      ["National Insurance", result.nationalInsuranceAnnual],
                      ["Pension", result.pensionAnnual],
                      ["Student Loan", result.studentLoanAnnual],
                      ["Net annual", result.netAnnual],
                    ].map(([label, value]) => (
                      <div
                        key={label as string}
                        className="rounded-2xl border border-white/10 bg-white/[0.055] p-3"
                      >
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="mt-1 text-base font-semibold text-white">
                          {formatCurrency(value as number)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Link
                  href="/compare-salary"
                  className="rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  <BadgeCheck className="h-5 w-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Compare an offer
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    See if another salary really changes your monthly life.
                  </p>
                </Link>

                <Link
                  href="/reverse-tax"
                  className="rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  <Target className="h-5 w-5 text-indigo-300" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Reverse-plan
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Work backwards from the monthly amount you need.
                  </p>
                </Link>

                <Link
                  href="/payslip-checker"
                  className="rounded-[22px] border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Check payslip
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Compare expectation against real PAYE deductions.
                  </p>
                </Link>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/[0.055] p-4">
                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <p className="text-xs leading-6 text-slate-400">
                  This calculator gives an estimate for salary understanding.
                  It does not replace HMRC, employer payroll records, or formal
                  financial advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isOverview ? (
        <div className="mt-6">
          <SavedScenariosPanel
            type="calculator"
            title="Recent calculator scenarios"
            emptyTitle="No calculator scenarios saved yet"
            emptyDescription="Save a salary route here when you want to return to it quickly later."
            onLoad={handleLoadScenario}
          />
        </div>
      ) : null}
    </section>
  );
}