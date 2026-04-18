import type { Metadata } from "next";
import HomePageClient from "../components/home/home-page-client";

export const metadata: Metadata = {
  title: "TaxDecod — UK Salary Calculator, Take-Home Pay & Salary Comparison",
  description:
    "Understand your UK salary after tax. Compare salaries, reverse-plan target income, check payslips, and make better income decisions with practical UK salary clarity.",
};

export default function HomePage() {
  return <HomePageClient />;
}