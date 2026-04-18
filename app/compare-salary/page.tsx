import type { Metadata } from "next";
import CompareSalaryPageClient from "../../components/compare-salary/compare-salary-page-client";

export const metadata: Metadata = {
  title: "Compare Salaries After Tax | UK Salary Comparison Tool | TaxDecod",
  description:
    "Compare two UK salaries after tax, National Insurance, pension, and student loan deductions to see what really changes month to month.",
};

export default function CompareSalaryPage() {
  return <CompareSalaryPageClient />;
}