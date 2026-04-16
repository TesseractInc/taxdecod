import type { Metadata } from "next";
import HomePageClient from "../components/home/home-page-client";

export const metadata: Metadata = {
  title:
    "UK Salary Calculator, Payslip Checker and Take-Home Pay Tools | TaxDecod",
  description:
    "Check salary after tax, compare take-home pay, reverse income targets, and understand payslips with TaxDecod.",
};

export default function HomePage() {
  return <HomePageClient />;
}