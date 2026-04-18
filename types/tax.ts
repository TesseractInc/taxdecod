export type PayPeriod = "yearly" | "monthly";

export type Region = "uk" | "scotland";

export type StudentLoanPlan =
  | "none"
  | "plan1"
  | "plan2"
  | "plan4"
  | "plan5"
  | "postgrad";

export type CalculatorInput = {
  salary: number;
  payPeriod: PayPeriod;
  region: Region;
  pensionPercent: number;
  studentLoanPlan: StudentLoanPlan;
  taxCode: string;
};

export type TakeHomeResult = {
  grossAnnual: number;
  incomeTaxAnnual: number;
  nationalInsuranceAnnual: number;
  pensionAnnual: number;
  studentLoanAnnual: number;
  totalDeductionsAnnual: number;
  netAnnual: number;
  netMonthly: number;
};