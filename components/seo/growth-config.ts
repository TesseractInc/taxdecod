export const SEO_GROWTH_CONFIG = {
  salaryHub: {
    popularSalaries: [
      18000, 20000, 22000, 25000, 28000, 30000, 32000, 35000, 40000, 45000,
      50000, 60000, 70000, 80000, 100000,
    ],
    gridSalaries: [
      18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000,
      35000, 38000, 40000, 42000, 45000, 48000, 50000, 55000,
      60000, 65000, 70000, 80000, 90000, 100000, 120000, 150000,
    ],
  },

  mainSalarySeo: {
    ranges: [
      { start: 18000, end: 70000, step: 1000 },
      { start: 72500, end: 100000, step: 2500 },
      { start: 110000, end: 200000, step: 10000 },
    ],
  },

  variantSalarySeo: {
    ranges: [
      { start: 18000, end: 50000, step: 2000 },
      { start: 52000, end: 80000, step: 4000 },
      { start: 85000, end: 120000, step: 5000 },
      { start: 140000, end: 200000, step: 20000 },
    ],
  },

  reverseSeo: {
    ranges: [
      { start: 1200, end: 3000, step: 100 },
      { start: 3200, end: 5000, step: 200 },
      { start: 5500, end: 8000, step: 500 },
      { start: 9000, end: 12000, step: 1000 },
    ],
  },

  comparisonSeo: {
    ladders: [
      { start: 18000, end: 30000, jump: 2000 },
      { start: 30000, end: 50000, jump: 5000 },
      { start: 50000, end: 80000, jump: 10000 },
      { start: 80000, end: 120000, jump: 20000 },
    ],
    featuredPairs: [
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
      18000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000,
      80000, 100000,
    ],
    monthlyIntentTargets: [1800, 2000, 2500, 3000, 3500, 4000, 5000, 6000],
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

export function expandComparisonLadders(
  ladders: ReadonlyArray<{ start: number; end: number; jump: number }>
): Array<[number, number]> {
  const pairs: Array<[number, number]> = [];

  for (const ladder of ladders) {
    for (let value = ladder.start; value < ladder.end; value += ladder.jump) {
      pairs.push([value, value + ladder.jump]);
    }
  }

  return pairs;
}

export function dedupePairs(
  pairs: ReadonlyArray<[number, number]>
): Array<[number, number]> {
  const seen = new Set<string>();
  const cleaned: Array<[number, number]> = [];

  for (const [a, b] of pairs) {
    const key = `${a}-${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      cleaned.push([a, b]);
    }
  }

  return cleaned;
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
  const comparisonPages = dedupePairs([
    ...expandComparisonLadders(SEO_GROWTH_CONFIG.comparisonSeo.ladders),
    ...SEO_GROWTH_CONFIG.comparisonSeo.featuredPairs,
  ]).length;

  return {
    mainSalaryPages,
    variantSalaryValues,
    reversePages,
    comparisonPages,
    estimatedFoundationPages:
      mainSalaryPages + variantSalaryValues * 3 + reversePages + comparisonPages,
  };
}