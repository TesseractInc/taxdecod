import type { BenchmarkRoleConfig, RegionConfig } from "./programmatic-expansion-config";

type BenchmarkBand = {
  entry: number;
  median: number;
  upper: number;
};

const ROLE_BASELINES: Record<BenchmarkRoleConfig["slug"], BenchmarkBand> = {
  "software-engineer": { entry: 32000, median: 55000, upper: 85000 },
  "data-analyst": { entry: 28000, median: 42000, upper: 65000 },
  "project-manager": { entry: 32000, median: 50000, upper: 75000 },
  "marketing-manager": { entry: 30000, median: 45000, upper: 70000 },
  accountant: { entry: 30000, median: 46000, upper: 72000 },
  "financial-analyst": { entry: 34000, median: 52000, upper: 80000 },
  teacher: { entry: 30000, median: 41000, upper: 55000 },
  nurse: { entry: 29000, median: 39000, upper: 52000 },
  "retail-manager": { entry: 28000, median: 38000, upper: 55000 },
  "warehouse-worker": { entry: 24000, median: 30000, upper: 38000 },
};

const REGION_MULTIPLIERS: Record<RegionConfig["slug"], number> = {
  london: 1.18,
  manchester: 1.0,
  birmingham: 0.98,
  leeds: 0.96,
  glasgow: 0.97,
  bristol: 1.04,
};

function roundSalary(value: number) {
  return Math.round(value / 1000) * 1000;
}

export function getBenchmarkPageData(
  role: BenchmarkRoleConfig,
  region: RegionConfig
) {
  const base = ROLE_BASELINES[role.slug];
  const multiplier = REGION_MULTIPLIERS[region.slug] ?? 1;

  const entrySalary = roundSalary(base.entry * multiplier);
  const medianSalary = roundSalary(base.median * multiplier);
  const upperSalary = roundSalary(base.upper * multiplier);

  return {
    role,
    region,
    entrySalary,
    medianSalary,
    upperSalary,
    comparisonSalary: roundSalary(medianSalary + 10000),
    lowerComparisonSalary: roundSalary(Math.max(10000, medianSalary - 10000)),
  };
}