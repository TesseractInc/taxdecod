import { calculateTakeHome } from "../../lib/tax/calculators/take-home";
import { getStandardUkEmployeeInput } from "../../lib/tax/config";

type CityIntentSeed = {
  region: string;
  label: string;
  rentLevel: "very-high" | "high" | "medium" | "lower";
  tone: string;
};

const citySeeds: CityIntentSeed[] = [
  {
    region: "london",
    label: "London",
    rentLevel: "very-high",
    tone: "Higher housing and transport costs mean take-home pressure is usually strongest here.",
  },
  {
    region: "manchester",
    label: "Manchester",
    rentLevel: "high",
    tone: "Take-home can stretch further than London, but rent and lifestyle costs still change the picture quickly.",
  },
  {
    region: "birmingham",
    label: "Birmingham",
    rentLevel: "medium",
    tone: "This is often a more balanced affordability context than London, but salary still needs to be judged against rent and fixed costs.",
  },
  {
    region: "leeds",
    label: "Leeds",
    rentLevel: "medium",
    tone: "Leeds can offer a stronger affordability balance than the highest-cost cities, but monthly take-home still drives the real answer.",
  },
  {
    region: "glasgow",
    label: "Glasgow",
    rentLevel: "medium",
    tone: "Housing pressure can be lower than in London, but affordability still depends on tax, deductions, and household structure.",
  },
  {
    region: "bristol",
    label: "Bristol",
    rentLevel: "high",
    tone: "Bristol salary decisions often need careful monthly affordability checking because costs can still be relatively strong.",
  },
];

export function getCityIntentParams() {
  const salaries = [
    20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000,
  ];

  return citySeeds.flatMap((city) =>
    salaries.map((salary) => ({
      salary: String(salary),
      region: city.region,
    }))
  );
}

export function parseCityIntentRegion(region: string) {
  return citySeeds.find((item) => item.region === region) ?? null;
}

export function formatCityIntentLabel(region: string) {
  const found = parseCityIntentRegion(region);
  return found?.label ?? region;
}

export function getCitySalaryIntentData(salary: number, region: string) {
  const city = parseCityIntentRegion(region);

  if (!city) return null;

  const input = getStandardUkEmployeeInput({
    salary,
    payPeriod: "yearly",
    region: "uk",
    studentLoanPlan: "none",
  });

  const result = calculateTakeHome(input);

  const keepPercent =
    result.grossAnnual > 0 ? (result.netAnnual / result.grossAnnual) * 100 : 0;

  const affordabilityView =
    city.rentLevel === "very-high"
      ? result.netMonthly >= 4200
        ? "strong"
        : result.netMonthly >= 3000
        ? "workable"
        : "tight"
      : city.rentLevel === "high"
      ? result.netMonthly >= 3400
        ? "strong"
        : result.netMonthly >= 2400
        ? "workable"
        : "tight"
      : city.rentLevel === "medium"
      ? result.netMonthly >= 2800
        ? "strong"
        : result.netMonthly >= 2100
        ? "workable"
        : "tight"
      : result.netMonthly >= 2400
      ? "strong"
      : result.netMonthly >= 1800
      ? "workable"
      : "tight";

  const verdictTitle =
    affordabilityView === "strong"
      ? `Yes, ${salary.toLocaleString("en-GB")} can be a strong salary in ${city.label} depending on your setup`
      : affordabilityView === "workable"
      ? `${salary.toLocaleString("en-GB")} can be workable in ${city.label}, but monthly cost structure matters`
      : `${salary.toLocaleString("en-GB")} may feel tight in ${city.label} once monthly costs are applied`;

  const verdictSummary =
    affordabilityView === "strong"
      ? `A take-home pay of about £${result.netMonthly.toLocaleString(
          "en-GB",
          { maximumFractionDigits: 0 }
        )} a month is often enough to feel meaningfully more flexible in ${city.label}, but rent, travel, family structure, and debt still matter.`
      : affordabilityView === "workable"
      ? `A take-home pay of about £${result.netMonthly.toLocaleString(
          "en-GB",
          { maximumFractionDigits: 0 }
        )} a month can work in ${city.label}, but it usually needs to be judged carefully against rent, transport, and savings goals.`
      : `A take-home pay of about £${result.netMonthly.toLocaleString(
          "en-GB",
          { maximumFractionDigits: 0 }
        )} a month can feel restrictive in ${city.label}, especially if rent and fixed monthly costs are high.`;

  return {
    city,
    input,
    result,
    keepPercent,
    affordabilityView,
    verdictTitle,
    verdictSummary,
  };
}