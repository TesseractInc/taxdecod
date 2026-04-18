import { getSalaryPageData } from "./salary-pages";
import {
  getComparisonStaticParamsForRollout,
  getPrioritySalaryValues,
} from "./programmatic-expansion-config";

type ParsedComparison = {
  salaryA: number;
  salaryB: number;
};

export type ComparisonRouteSummary = {
  href: string;
  title: string;
  description: string;
};

export function parseComparisonSlug(slug: string): ParsedComparison | null {
  const match = slug.match(/^(\d+)-vs-(\d+)-after-tax$/i);

  if (!match) {
    return null;
  }

  const salaryA = Number(match[1]);
  const salaryB = Number(match[2]);

  if (
    !Number.isFinite(salaryA) ||
    !Number.isFinite(salaryB) ||
    salaryA <= 0 ||
    salaryB <= 0 ||
    salaryA === salaryB
  ) {
    return null;
  }

  return {
    salaryA: Math.min(salaryA, salaryB),
    salaryB: Math.max(salaryA, salaryB),
  };
}

export function getComparisonSeoSlugs() {
  return getComparisonStaticParamsForRollout();
}

export function getComparisonPageData(salaryA: number, salaryB: number) {
  const lowSalary = Math.min(salaryA, salaryB);
  const highSalary = Math.max(salaryA, salaryB);

  const low = getSalaryPageData(lowSalary);
  const high = getSalaryPageData(highSalary);

  const grossDifference = highSalary - lowSalary;
  const netAnnualDifference = high.result.netAnnual - low.result.netAnnual;
  const netMonthlyDifference = high.result.netMonthly - low.result.netMonthly;

  const keepPercent =
    grossDifference > 0 ? (netAnnualDifference / grossDifference) * 100 : 0;

  const taxDrag = grossDifference - netAnnualDifference;
  const taxDragPercent =
    grossDifference > 0 ? (taxDrag / grossDifference) * 100 : 0;

  return {
    salaryA: lowSalary,
    salaryB: highSalary,
    resultA: low.result,
    resultB: high.result,
    grossDifference,
    netAnnualDifference,
    netMonthlyDifference,
    taxDrag,
    keepPercent,
    taxDragPercent,
  };
}

function routeTitle(a: number, b: number) {
  return `£${a.toLocaleString("en-GB")} vs £${b.toLocaleString("en-GB")}`;
}

function routeHref(a: number, b: number) {
  const low = Math.min(a, b);
  const high = Math.max(a, b);
  return `/compare/${low}-vs-${high}-after-tax`;
}

export function getNearbyComparisonRoutes(
  salaryA: number,
  salaryB: number
): ComparisonRouteSummary[] {
  const low = Math.min(salaryA, salaryB);
  const high = Math.max(salaryA, salaryB);
  const rawStep = Math.round((high - low) / 2 / 5000) * 5000;
  const step = Math.max(5000, rawStep || 5000);

  const candidates: Array<[number, number, string]> = [
    [
      Math.max(10000, low - step),
      high,
      "Pull the lower side down and test whether the gap feels more meaningful.",
    ],
    [
      low,
      high + step,
      "Push the higher side up and see what a bigger jump really returns after deductions.",
    ],
    [
      Math.max(10000, low - step),
      Math.max(10000, high - step),
      "Shift the same comparison band downward and compare a lower-income decision path.",
    ],
    [
      low + step,
      high + step,
      "Shift the same comparison band upward and compare a higher-income decision path.",
    ],
  ];

  const seen = new Set<string>();

  return candidates
    .filter(([a, b]) => a !== b)
    .map(([a, b, description]) => {
      const lower = Math.min(a, b);
      const higher = Math.max(a, b);
      return {
        key: `${lower}-${higher}`,
        href: routeHref(lower, higher),
        title: routeTitle(lower, higher),
        description,
      };
    })
    .filter((item) => {
      if (item.href === routeHref(low, high) || seen.has(item.key)) {
        return false;
      }

      seen.add(item.key);
      return true;
    })
    .slice(0, 4)
    .map(({ href, title, description }) => ({
      href,
      title,
      description,
    }));
}

export function getComparisonClusterRoutes(
  salaryA: number,
  salaryB: number
): ComparisonRouteSummary[] {
  const low = Math.min(salaryA, salaryB);
  const high = Math.max(salaryA, salaryB);
  const priorities = getPrioritySalaryValues();

  const lowerAnchor = priorities
    .filter((salary) => salary < low)
    .slice(-1)[0];

  const higherAnchor = priorities.find((salary) => salary > high);

  const routes: ComparisonRouteSummary[] = [];

  if (lowerAnchor) {
    routes.push({
      href: routeHref(lowerAnchor, low),
      title: routeTitle(lowerAnchor, low),
      description:
        "Use a tighter lower-band comparison before stepping into this route.",
    });
  }

  routes.push({
    href: routeHref(low, high),
    title: routeTitle(low, high),
    description:
      "This fixed route shows the retained-value difference after tax and deductions.",
  });

  if (higherAnchor) {
    routes.push({
      href: routeHref(high, higherAnchor),
      title: routeTitle(high, higherAnchor),
      description:
        "Continue upward into the next nearby comparison band.",
    });
  }

  if (low >= 30000 && high <= 60000) {
    routes.push({
      href: routeHref(40000, 50000),
      title: routeTitle(40000, 50000),
      description:
        "One of the strongest mid-income decision routes on the site.",
    });
  }

  if (high >= 50000) {
    routes.push({
      href: routeHref(50000, 60000),
      title: routeTitle(50000, 60000),
      description:
        "A strong raise-decision comparison where tax drag becomes more visible.",
    });
  }

  const seen = new Set<string>();

  return routes.filter((route) => {
    if (seen.has(route.href)) return false;
    seen.add(route.href);
    return true;
  });
}

export function getComparisonDecisionSummary(
  salaryA: number,
  salaryB: number,
  monthlyDifference: number
) {
  const low = Math.min(salaryA, salaryB);
  const high = Math.max(salaryA, salaryB);

  if (monthlyDifference < 150) {
    return `The jump from £${low.toLocaleString(
      "en-GB"
    )} to £${high.toLocaleString(
      "en-GB"
    )} looks larger in gross terms than it feels monthly, so this kind of comparison needs careful judging through retained income, not headline salary.`;
  }

  if (monthlyDifference < 300) {
    return `The jump from £${low.toLocaleString(
      "en-GB"
    )} to £${high.toLocaleString(
      "en-GB"
    )} is meaningful, but not transformative on its own for many people. The right decision depends on monthly affordability, not just the size of the gross increase.`;
  }

  return `The jump from £${low.toLocaleString(
    "en-GB"
  )} to £${high.toLocaleString(
    "en-GB"
  )} is large enough to matter monthly, but it should still be judged by the net improvement after deductions and how that translates into real-life cost context.`;
}