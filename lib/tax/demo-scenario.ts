import { calculateTakeHome } from "./calculators/take-home";
import { CalculatorInput } from "../../types/tax";

export const demoScenarioInput: CalculatorInput = {
  salary: 40000,
  payPeriod: "yearly",
  region: "uk",
  pensionPercent: 5,
  studentLoanPlan: "plan2",
  taxCode: "1257L",
};

export const demoScenarioResult = calculateTakeHome(demoScenarioInput);