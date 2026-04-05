export const SEO_GROWTH_CONFIG = {
  salaryHub: {
    popularSalaries: [25000, 30000, 35000, 40000, 50000, 60000, 80000],
    gridSalaries: [
      20000, 22000, 24000, 26000, 28000, 30000, 32000, 35000,
      40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000,
    ],
  },

  mainSalarySeo: {
    ranges: [
      { start: 20000, end: 100000, step: 1000 },
      { start: 105000, end: 200000, step: 5000 },
    ],
  },

  variantSalarySeo: {
    ranges: [
      { start: 20000, end: 100000, step: 2000 },
      { start: 110000, end: 200000, step: 10000 },
    ],
  },

  reverseSeo: {
    ranges: [
      { start: 1000, end: 6000, step: 100 },
      { start: 6250, end: 10000, step: 250 },
    ],
  },

  comparisonSeo: {
    pairs: [
      [20000, 25000],
      [25000, 30000],
      [30000, 35000],
      [30000, 40000],
      [35000, 40000],
      [40000, 45000],
      [40000, 50000],
      [45000, 50000],
      [50000, 60000],
      [50000, 70000],
      [60000, 70000],
      [60000, 80000],
      [70000, 80000],
      [80000, 100000],
      [100000, 120000],
    ] as Array<[number, number]>,
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