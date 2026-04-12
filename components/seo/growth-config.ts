export const SEO_GROWTH_CONFIG = {
  salaryHub: {
    popularSalaries: [
      25000, 30000, 32000, 35000, 40000, 45000, 50000, 60000, 70000,
    ],
    gridSalaries: [
      18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000,
      35000, 38000, 40000, 45000, 50000, 55000, 60000, 70000,
      80000, 90000, 100000, 120000,
    ],
  },

  mainSalarySeo: {
    ranges: [
      { start: 18000, end: 60000, step: 1000 },
      { start: 62500, end: 100000, step: 2500 },
      { start: 110000, end: 200000, step: 10000 },
    ],
  },

  variantSalarySeo: {
    ranges: [
      { start: 18000, end: 60000, step: 2000 },
      { start: 65000, end: 100000, step: 5000 },
      { start: 120000, end: 200000, step: 20000 },
    ],
  },

  reverseSeo: {
    ranges: [
      { start: 1200, end: 5000, step: 100 },
      { start: 5250, end: 8000, step: 250 },
      { start: 8500, end: 10000, step: 500 },
    ],
  },

  comparisonSeo: {
    pairs: [
      [20000, 25000],
      [25000, 30000],
      [28000, 32000],
      [30000, 35000],
      [30000, 40000],
      [35000, 40000],
      [40000, 45000],
      [40000, 50000],
      [45000, 50000],
      [50000, 55000],
      [50000, 60000],
      [50000, 70000],
      [60000, 70000],
      [60000, 80000],
      [70000, 80000],
      [80000, 100000],
      [100000, 120000],
      [120000, 150000],
    ] as Array<[number, number]>,
  },

  contentClusters: {
    coreSalaryBands: [
      20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000,
    ],
    monthlyIntentTargets: [2000, 2500, 3000, 3500, 4000, 5000],
    cityIntentSeeds: [
      "london",
      "manchester",
      "birmingham",
      "leeds",
      "glasgow",
      "bristol",
    ],
  },
} as const;

export function expandNumericRanges(
  ranges: ReadonlyArray<{ start: number; end: number; step: number }>
): number[] {
  const values: number[] = [];

  for (const range of ranges) {
    for (let value = range.start; value <= range.end; value += range.step) {
      values.push(value);
    }
  }

  return Array.from(new Set(values)).sort((a, b) => a - b);
}

export function countExpandedRangeItems(
  ranges: ReadonlyArray<{ start: number; end: number; step: number }>
) {
  return expandNumericRanges(ranges).length;
}

export function getSeoFoundationCounts() {
  const mainSalaryPages = countExpandedRangeItems(
    SEO_GROWTH_CONFIG.mainSalarySeo.ranges
  );
  const variantSalaryValues = countExpandedRangeItems(
    SEO_GROWTH_CONFIG.variantSalarySeo.ranges
  );
  const reversePages = countExpandedRangeItems(
    SEO_GROWTH_CONFIG.reverseSeo.ranges
  );
  const comparisonPages = SEO_GROWTH_CONFIG.comparisonSeo.pairs.length;

  return {
    mainSalaryPages,
    variantSalaryValues,
    reversePages,
    comparisonPages,
    estimatedFoundationPages:
      mainSalaryPages + variantSalaryValues * 3 + reversePages + comparisonPages,
  };
}