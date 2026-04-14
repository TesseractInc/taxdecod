type BenchmarkSeed = {
  role: string;
  city: string;
  low: number;
  median: number;
  high: number;
};

const benchmarkSeeds: BenchmarkSeed[] = [
  { role: "software-engineer", city: "london", low: 42000, median: 65000, high: 95000 },
  { role: "software-engineer", city: "manchester", low: 35000, median: 50000, high: 70000 },
  { role: "teacher", city: "london", low: 36000, median: 44000, high: 56000 },
  { role: "teacher", city: "manchester", low: 31000, median: 39000, high: 50000 },
  { role: "nurse", city: "london", low: 32000, median: 39000, high: 48000 },
  { role: "nurse", city: "glasgow", low: 30000, median: 36000, high: 44000 },
  { role: "data-analyst", city: "london", low: 36000, median: 50000, high: 70000 },
  { role: "data-analyst", city: "leeds", low: 30000, median: 42000, high: 58000 },
  { role: "accountant", city: "london", low: 38000, median: 52000, high: 70000 },
  { role: "accountant", city: "birmingham", low: 32000, median: 43000, high: 60000 },
  { role: "marketing-manager", city: "london", low: 42000, median: 58000, high: 80000 },
  { role: "marketing-manager", city: "bristol", low: 35000, median: 47000, high: 65000 },
];

export function getBenchmarkParams() {
  return benchmarkSeeds.map((item) => ({
    role: item.role,
    city: item.city,
  }));
}

export function parseBenchmark(role: string, city: string) {
  return benchmarkSeeds.find((item) => item.role === role && item.city === city) ?? null;
}

export function formatRoleSlug(role: string) {
  return role
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatCitySlug(city: string) {
  return city
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}