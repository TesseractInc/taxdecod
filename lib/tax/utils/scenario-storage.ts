import type { CalculatorInput, TakeHomeResult } from "../../../types/tax";

export type SavedScenario = {
  id: string;
  createdAt: string;
  label: string;
  values: CalculatorInput;
  result: TakeHomeResult;
  source?: "calculator" | "reverse" | "saved";
};

const SCENARIO_STORAGE_KEY = "taxdecod:saved-scenarios";
const EMAIL_STORAGE_KEY = "taxdecod:remembered-email";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function makeScenarioLabel(values: CalculatorInput) {
  const periodLabel = values.payPeriod === "monthly" ? "monthly" : "yearly";
  const regionLabel = values.region === "scotland" ? "Scotland" : "UK";
  return `£${Math.round(values.salary).toLocaleString("en-GB")} ${periodLabel} · ${regionLabel}`;
}

export function getSavedScenarios(): SavedScenario[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(SCENARIO_STORAGE_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw) as SavedScenario[];

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

export function saveScenario(
  values: CalculatorInput,
  result: TakeHomeResult,
  source: SavedScenario["source"] = "calculator"
) {
  if (!canUseStorage()) return null;

  const nextScenario: SavedScenario = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    label: makeScenarioLabel(values),
    values,
    result,
    source,
  };

  const current = getSavedScenarios();
  const deduped = current.filter((item) => {
    return !(
      item.values.salary === values.salary &&
      item.values.payPeriod === values.payPeriod &&
      item.values.region === values.region &&
      item.values.pensionPercent === values.pensionPercent &&
      item.values.studentLoanPlan === values.studentLoanPlan &&
      item.values.taxCode === values.taxCode
    );
  });

  const next = [nextScenario, ...deduped].slice(0, 20);

  window.localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(next));

  return nextScenario;
}

export function deleteScenario(id: string) {
  if (!canUseStorage()) return;

  const next = getSavedScenarios().filter((item) => item.id !== id);
  window.localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(next));
}

export function clearSavedScenarios() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SCENARIO_STORAGE_KEY);
}

export function getRememberedEmail() {
  if (!canUseStorage()) return "";

  try {
    return window.localStorage.getItem(EMAIL_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setRememberedEmail(email: string) {
  if (!canUseStorage()) return;

  const trimmed = email.trim().toLowerCase();
  window.localStorage.setItem(EMAIL_STORAGE_KEY, trimmed);
}

export function buildCalculatorHref(values: CalculatorInput) {
  const params = new URLSearchParams({
    salary: String(values.salary),
    payPeriod: values.payPeriod,
    region: values.region,
    pensionPercent: String(values.pensionPercent),
    studentLoanPlan: values.studentLoanPlan,
    taxCode: values.taxCode || "1257L",
  });

  return `/calculator?${params.toString()}`;
}