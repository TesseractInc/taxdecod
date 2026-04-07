import type {
  CalculatorInput,
  Region,
  StudentLoanPlan,
  TakeHomeResult,
} from "../../../types/tax";

export type SupportedTaxYear = "2024/25" | "2025/26";

type TaxYearConfig = {
  personalAllowance: number;
  ukBasicRateLimit: number;
  ukHigherRateLimit: number;
  niPrimaryThresholdMonthly: number;
  niUpperEarningsLimitMonthly: number;
  studentLoanThresholds: Record<StudentLoanPlan, number>;
  studentLoanRates: Record<StudentLoanPlan, number>;
};

const TAX_YEAR_CONFIG: Record<SupportedTaxYear, TaxYearConfig> = {
  "2024/25": {
    personalAllowance: 12570,
    ukBasicRateLimit: 50270,
    ukHigherRateLimit: 125140,
    niPrimaryThresholdMonthly: 1048,
    niUpperEarningsLimitMonthly: 4189,
    studentLoanThresholds: {
      none: 0,
      plan1: 24990,
      plan2: 27295,
      plan4: 31395,
      postgrad: 21000,
    },
    studentLoanRates: {
      none: 0,
      plan1: 0.09,
      plan2: 0.09,
      plan4: 0.09,
      postgrad: 0.06,
    },
  },
  "2025/26": {
    personalAllowance: 12570,
    ukBasicRateLimit: 50270,
    ukHigherRateLimit: 125140,
    niPrimaryThresholdMonthly: 1048,
    niUpperEarningsLimitMonthly: 4189,
    studentLoanThresholds: {
      none: 0,
      plan1: 26065,
      plan2: 28470,
      plan4: 32745,
      postgrad: 21000,
    },
    studentLoanRates: {
      none: 0,
      plan1: 0.09,
      plan2: 0.09,
      plan4: 0.09,
      postgrad: 0.06,
    },
  },
};

function calculateIncomeTaxByYear(
  annualSalary: number,
  region: Region,
  year: SupportedTaxYear
) {
  const config = TAX_YEAR_CONFIG[year];
  if (annualSalary <= 0) return 0;

  if (region === "scotland") {
    const bands =
      year === "2024/25"
        ? [
            { from: 12570, to: 14876, rate: 0.19 },
            { from: 14876, to: 26561, rate: 0.2 },
            { from: 26561, to: 43662, rate: 0.21 },
            { from: 43662, to: 75000, rate: 0.42 },
            { from: 75000, to: 125140, rate: 0.45 },
            { from: 125140, to: Infinity, rate: 0.48 },
          ]
        : [
            { from: 12570, to: 15197, rate: 0.19 },
            { from: 15197, to: 27491, rate: 0.2 },
            { from: 27491, to: 43662, rate: 0.21 },
            { from: 43662, to: 75000, rate: 0.42 },
            { from: 75000, to: 125140, rate: 0.45 },
            { from: 125140, to: Infinity, rate: 0.48 },
          ];

    return bands.reduce((total, band) => {
      const taxable = Math.max(0, Math.min(annualSalary, band.to) - band.from);
      return total + taxable * band.rate;
    }, 0);
  }

  const basicBand = Math.max(
    0,
    Math.min(annualSalary, config.ukBasicRateLimit) - config.personalAllowance
  );
  const higherBand = Math.max(
    0,
    Math.min(annualSalary, config.ukHigherRateLimit) - config.ukBasicRateLimit
  );
  const additionalBand = Math.max(0, annualSalary - config.ukHigherRateLimit);

  return basicBand * 0.2 + higherBand * 0.4 + additionalBand * 0.45;
}

function calculateNiByYear(annualSalary: number, year: SupportedTaxYear) {
  const config = TAX_YEAR_CONFIG[year];
  const monthlySalary = annualSalary / 12;

  const monthlyNi =
    Math.max(
      0,
      Math.min(monthlySalary, config.niUpperEarningsLimitMonthly) -
        config.niPrimaryThresholdMonthly
    ) *
      0.08 +
    Math.max(0, monthlySalary - config.niUpperEarningsLimitMonthly) * 0.02;

  return monthlyNi * 12;
}

export function calculateTakeHomeByYear(
  input: CalculatorInput,
  year: SupportedTaxYear
): TakeHomeResult {
  const config = TAX_YEAR_CONFIG[year];

  const grossAnnual =
    input.payPeriod === "monthly" ? input.salary * 12 : input.salary;

  const incomeTaxAnnual = calculateIncomeTaxByYear(
    grossAnnual,
    input.region,
    year
  );
  const nationalInsuranceAnnual = calculateNiByYear(grossAnnual, year);
  const pensionAnnual = grossAnnual * (input.pensionPercent / 100);

  const threshold = config.studentLoanThresholds[input.studentLoanPlan];
  const rate = config.studentLoanRates[input.studentLoanPlan];

  const studentLoanAnnual =
    input.studentLoanPlan === "none"
      ? 0
      : Math.max(0, grossAnnual - threshold) * rate;

  const totalDeductionsAnnual =
    incomeTaxAnnual +
    nationalInsuranceAnnual +
    pensionAnnual +
    studentLoanAnnual;

  const netAnnual = grossAnnual - totalDeductionsAnnual;

  return {
    grossAnnual,
    incomeTaxAnnual,
    nationalInsuranceAnnual,
    pensionAnnual,
    studentLoanAnnual,
    totalDeductionsAnnual,
    netAnnual,
    netMonthly: netAnnual / 12,
  };
}