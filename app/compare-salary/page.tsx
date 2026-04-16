import type { Metadata } from "next";
import CompareSalaryPageClient from "../../components/compare-salary/compare-salary-page-client";

export const metadata: Metadata = {
  title: "Compare Salaries After Tax UK | TaxDecod",
  description:
    "Compare two UK salaries after tax, National Insurance, pension, and student loan deductions to see what actually changes month to month.",
};

export default function CompareSalaryPage() {
  return <CompareSalaryPageClient />;
}