import {
  PROTECTED_INDEXED_BENCHMARK_PARAMS,
  PROTECTED_INDEXED_COMPARISON_SLUGS,
  PROTECTED_INDEXED_GOOD_SALARY_PARAMS,
  PROTECTED_INDEXED_MONTHLY_TAKE_HOME_VALUES,
  PROTECTED_INDEXED_SALARY_VALUES,
} from "./indexed-protected-routes";

export type BenchmarkRoleConfig = {
  slug: string;
  label: string;
  category:
    | "tech"
    | "finance"
    | "healthcare"
    | "education"
    | "operations"
    | "marketing";
};

export type RegionConfig = {
  slug: string;
  label: string;
  priority: number;
};

export type ExpansionRolloutMode = "flagship" | "priority" | "full";

export type ComparisonPair = {
  salaryA: number;
  salaryB: number;
};

export const PROGRAMMATIC_SALARY_RANGE = {
  min: 10000,
  max: 150000,
  step: 1000,
} as const;

export const PROGRAMMATIC_MONTHLY_TAKE_HOME_RANGE = {
  min: 1500,
  max: 5000,
  step: 100,
} as const;

export const FLAGSHIP_SALARY_POINTS = [
  20000,
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  60000,
  70000,
  80000,
  100000,
] as const;

export const PRIORITY_SALARY_POINTS = [
  18000,
  20000,
  22000,
  25000,
  28000,
  30000,
  32000,
  35000,
  38000,
  40000,
  45000,
  50000,
  55000,
  60000,
  70000,
  80000,
  90000,
  100000,
  120000,
] as const;

export const FLAGSHIP_MONTHLY_TAKE_HOME_POINTS = [
  2000,
  2500,
  3000,
  3500,
] as const;

export const PRIORITY_MONTHLY_TAKE_HOME_POINTS = [
  1800,
  2000,
  2200,
  2500,
  2800,
  3000,
  3200,
  3500,
  4000,
] as const;

export const EXPANSION_REGIONS: RegionConfig[] = [
  { slug: "london", label: "London", priority: 1 },
  { slug: "manchester", label: "Manchester", priority: 2 },
  { slug: "birmingham", label: "Birmingham", priority: 3 },
  { slug: "leeds", label: "Leeds", priority: 4 },
  { slug: "glasgow", label: "Glasgow", priority: 5 },
  { slug: "bristol", label: "Bristol", priority: 6 },
];

export const EXPANSION_BENCHMARK_ROLES: BenchmarkRoleConfig[] = [
  { slug: "software-engineer", label: "Software Engineer", category: "tech" },
  { slug: "data-analyst", label: "Data Analyst", category: "tech" },
  { slug: "project-manager", label: "Project Manager", category: "operations" },
  {
    slug: "marketing-manager",
    label: "Marketing Manager",
    category: "marketing",
  },
  { slug: "accountant", label: "Accountant", category: "finance" },
  {
    slug: "financial-analyst",
    label: "Financial Analyst",
    category: "finance",
  },
  { slug: "teacher", label: "Teacher", category: "education" },
  { slug: "nurse", label: "Nurse", category: "healthcare" },
  { slug: "retail-manager", label: "Retail Manager", category: "operations" },
  {
    slug: "warehouse-worker",
    label: "Warehouse Worker",
    category: "operations",
  },
];

export const FLAGSHIP_COMPARISON_PAIRS: ComparisonPair[] = [
  { salaryA: 30000, salaryB: 40000 },
  { salaryA: 40000, salaryB: 50000 },
  { salaryA: 50000, salaryB: 60000 },
  { salaryA: 60000, salaryB: 70000 },
];

export const PRIORITY_COMPARISON_PAIRS: ComparisonPair[] = [
  { salaryA: 18000, salaryB: 20000 },
  { salaryA: 20000, salaryB: 25000 },
  { salaryA: 25000, salaryB: 30000 },
  { salaryA: 28000, salaryB: 32000 },
  { salaryA: 30000, salaryB: 35000 },
  { salaryA: 30000, salaryB: 40000 },
  { salaryA: 32000, salaryB: 40000 },
  { salaryA: 35000, salaryB: 40000 },
  { salaryA: 35000, salaryB: 45000 },
  { salaryA: 38000, salaryB: 45000 },
  { salaryA: 40000, salaryB: 45000 },
  { salaryA: 40000, salaryB: 50000 },
  { salaryA: 45000, salaryB: 50000 },
  { salaryA: 45000, salaryB: 55000 },
  { salaryA: 50000, salaryB: 55000 },
  { salaryA: 50000, salaryB: 60000 },
  { salaryA: 55000, salaryB: 60000 },
  { salaryA: 60000, salaryB: 70000 },
  { salaryA: 70000, salaryB: 80000 },
  { salaryA: 80000, salaryB: 100000 },
  { salaryA: 100000, salaryB: 120000 },
];

export const PROGRAMMATIC_ROLLOUT = {
  salaryPages: "flagship" as ExpansionRolloutMode,
  monthlyTakeHomePages: "flagship" as ExpansionRolloutMode,
  goodSalaryPages: "flagship" as ExpansionRolloutMode,
  benchmarkPages: "flagship" as ExpansionRolloutMode,
  comparisonPages: "flagship" as ExpansionRolloutMode,
} as const;

export function buildNumericRange(
  min: number,
  max: number,
  step: number
): number[] {
  const values: number[] = [];

  for (let current = min; current <= max; current += step) {
    values.push(current);
  }

  return values;
}

export function uniqueSortedNumbers(values: readonly number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}

export function uniqueComparisonPairs(values: ComparisonPair[]) {
  const seen = new Set<string>();
  const pairs: ComparisonPair[] = [];

  for (const pair of values) {
    const low = Math.min(pair.salaryA, pair.salaryB);
    const high = Math.max(pair.salaryA, pair.salaryB);
    const key = `${low}-${high}`;

    if (!seen.has(key) && low !== high) {
      seen.add(key);
      pairs.push({
        salaryA: low,
        salaryB: high,
      });
    }
  }

  return pairs.sort((a, b) => {
    if (a.salaryA === b.salaryA) return a.salaryB - b.salaryB;
    return a.salaryA - b.salaryA;
  });
}

export function getExpandedSalaryValues(): number[] {
  return buildNumericRange(
    PROGRAMMATIC_SALARY_RANGE.min,
    PROGRAMMATIC_SALARY_RANGE.max,
    PROGRAMMATIC_SALARY_RANGE.step
  );
}

export function getExpandedMonthlyTakeHomeValues(): number[] {
  return buildNumericRange(
    PROGRAMMATIC_MONTHLY_TAKE_HOME_RANGE.min,
    PROGRAMMATIC_MONTHLY_TAKE_HOME_RANGE.max,
    PROGRAMMATIC_MONTHLY_TAKE_HOME_RANGE.step
  );
}

export function getRegionSlugs(): string[] {
  return EXPANSION_REGIONS.map((region) => region.slug);
}

export function getBenchmarkRoleSlugs(): string[] {
  return EXPANSION_BENCHMARK_ROLES.map((role) => role.slug);
}

export function getPriorityRegionSlugs(): string[] {
  return [...EXPANSION_REGIONS]
    .sort((a, b) => a.priority - b.priority)
    .map((region) => region.slug);
}

export function getFlagshipSalaryValues(): number[] {
  return [...FLAGSHIP_SALARY_POINTS];
}

export function getPrioritySalaryValues(): number[] {
  return uniqueSortedNumbers([...PRIORITY_SALARY_POINTS]);
}

export function getFlagshipMonthlyTakeHomeValues(): number[] {
  return [...FLAGSHIP_MONTHLY_TAKE_HOME_POINTS];
}

export function getPriorityMonthlyTakeHomeValues(): number[] {
  return uniqueSortedNumbers([...PRIORITY_MONTHLY_TAKE_HOME_POINTS]);
}

export function getSalaryValuesByRollout(
  mode: ExpansionRolloutMode
): number[] {
  if (mode === "flagship") {
    return getFlagshipSalaryValues();
  }

  if (mode === "priority") {
    return getPrioritySalaryValues();
  }

  return getExpandedSalaryValues();
}

export function getMonthlyTakeHomeValuesByRollout(
  mode: ExpansionRolloutMode
): number[] {
  if (mode === "flagship") {
    return getFlagshipMonthlyTakeHomeValues();
  }

  if (mode === "priority") {
    return getPriorityMonthlyTakeHomeValues();
  }

  return getExpandedMonthlyTakeHomeValues();
}

export function getRegionsByRollout(mode: ExpansionRolloutMode): RegionConfig[] {
  if (mode === "flagship") {
    return EXPANSION_REGIONS.filter((region) => region.priority === 1);
  }

  if (mode === "priority") {
    return [...EXPANSION_REGIONS]
      .filter((region) => region.priority <= 3)
      .sort((a, b) => a.priority - b.priority);
  }

  return [...EXPANSION_REGIONS].sort((a, b) => a.priority - b.priority);
}

export function getBenchmarkRolesByRollout(
  mode: ExpansionRolloutMode
): BenchmarkRoleConfig[] {
  if (mode === "flagship") {
    return EXPANSION_BENCHMARK_ROLES.filter((role) =>
      ["software-engineer", "teacher", "nurse"].includes(role.slug)
    );
  }

  if (mode === "priority") {
    return EXPANSION_BENCHMARK_ROLES.filter((role) =>
      [
        "software-engineer",
        "data-analyst",
        "teacher",
        "nurse",
        "accountant",
        "project-manager",
      ].includes(role.slug)
    );
  }

  return [...EXPANSION_BENCHMARK_ROLES];
}

export function getComparisonPairsByRollout(
  mode: ExpansionRolloutMode
): ComparisonPair[] {
  if (mode === "flagship") {
    return uniqueComparisonPairs([...FLAGSHIP_COMPARISON_PAIRS]);
  }

  if (mode === "priority") {
    return uniqueComparisonPairs([...PRIORITY_COMPARISON_PAIRS]);
  }

  const salaryValues = getPrioritySalaryValues();
  const adjacentPairs: ComparisonPair[] = [];
  const anchorPairs: ComparisonPair[] = [];
  const fiveAndTenKPairs: ComparisonPair[] = [];

  for (let index = 0; index < salaryValues.length - 1; index += 1) {
    adjacentPairs.push({
      salaryA: salaryValues[index],
      salaryB: salaryValues[index + 1],
    });
  }

  const anchors = [30000, 40000, 50000, 60000, 80000, 100000];

  for (const anchor of anchors) {
    for (const candidate of salaryValues) {
      if (
        candidate !== anchor &&
        Math.abs(candidate - anchor) >= 5000 &&
        Math.abs(candidate - anchor) <= 20000
      ) {
        anchorPairs.push({
          salaryA: Math.min(anchor, candidate),
          salaryB: Math.max(anchor, candidate),
        });
      }
    }
  }

  for (const salary of salaryValues) {
    const plusFive = salary + 5000;
    const plusTen = salary + 10000;

    if (salaryValues.includes(plusFive)) {
      fiveAndTenKPairs.push({
        salaryA: salary,
        salaryB: plusFive,
      });
    }

    if (salaryValues.includes(plusTen)) {
      fiveAndTenKPairs.push({
        salaryA: salary,
        salaryB: plusTen,
      });
    }
  }

  return uniqueComparisonPairs([
    ...FLAGSHIP_COMPARISON_PAIRS,
    ...PRIORITY_COMPARISON_PAIRS,
    ...adjacentPairs,
    ...anchorPairs,
    ...fiveAndTenKPairs,
  ]);
}

export function getFeaturedComparisonPairs(): ComparisonPair[] {
  return uniqueComparisonPairs([
    { salaryA: 25000, salaryB: 30000 },
    { salaryA: 30000, salaryB: 40000 },
    { salaryA: 40000, salaryB: 50000 },
    { salaryA: 50000, salaryB: 60000 },
    { salaryA: 60000, salaryB: 80000 },
    { salaryA: 80000, salaryB: 100000 },
  ]);
}

export function getSalaryStaticParamsForRollout() {
  return uniqueSortedNumbers([
    ...getSalaryValuesByRollout(PROGRAMMATIC_ROLLOUT.salaryPages),
    ...PROTECTED_INDEXED_SALARY_VALUES,
  ]).map((salary) => ({
    salary: `${salary}-after-tax-uk`,
  }));
}

export function getMonthlyTakeHomeStaticParamsForRollout() {
  return uniqueSortedNumbers([
    ...getMonthlyTakeHomeValuesByRollout(
      PROGRAMMATIC_ROLLOUT.monthlyTakeHomePages
    ),
    ...PROTECTED_INDEXED_MONTHLY_TAKE_HOME_VALUES,
  ]).map((amount) => ({
    amount: String(amount),
  }));
}

export function getGoodSalaryStaticParamsForRollout() {
  const salaries = getSalaryValuesByRollout(PROGRAMMATIC_ROLLOUT.goodSalaryPages);
  const regions = getRegionsByRollout(PROGRAMMATIC_ROLLOUT.goodSalaryPages);

  const generated = salaries.flatMap((salary) =>
    regions.map((region) => ({
      salary: String(salary),
      region: region.slug,
    }))
  );

  return [...generated, ...PROTECTED_INDEXED_GOOD_SALARY_PARAMS].filter(
    (item, index, list) =>
      list.findIndex(
        (candidate) =>
          candidate.salary === item.salary && candidate.region === item.region
      ) === index
  );
}

export function getBenchmarkStaticParamsForRollout() {
  const roles = getBenchmarkRolesByRollout(PROGRAMMATIC_ROLLOUT.benchmarkPages);
  const regions = getRegionsByRollout(PROGRAMMATIC_ROLLOUT.benchmarkPages);

  const generated = roles.flatMap((role) =>
    regions.map((region) => ({
      role: role.slug,
      region: region.slug,
    }))
  );

  return [...generated, ...PROTECTED_INDEXED_BENCHMARK_PARAMS].filter(
    (item, index, list) =>
      list.findIndex(
        (candidate) =>
          candidate.role === item.role && candidate.region === item.region
      ) === index
  );
}

export function getComparisonStaticParamsForRollout() {
  const generated = getComparisonPairsByRollout(
    PROGRAMMATIC_ROLLOUT.comparisonPages
  ).map((pair) => ({
    comparison: `${pair.salaryA}-vs-${pair.salaryB}-after-tax`,
  }));

  const protectedIndexed = PROTECTED_INDEXED_COMPARISON_SLUGS.map(
    (comparison) => ({
      comparison,
    })
  );

  return [...generated, ...protectedIndexed].filter(
    (item, index, list) =>
      list.findIndex((candidate) => candidate.comparison === item.comparison) ===
      index
  );
}