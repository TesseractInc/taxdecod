import type { Metadata } from "next";
import CompareSalaryPageClient from "@/components/compare-salary/compare-salary-page-client";
import PageSchema from "@/components/seo/page-schema";
import { buildSeoMetadata } from "@/components/seo/metadata";

export const metadata: Metadata = buildSeoMetadata({
  title: "Compare Two Salaries After Tax UK",
  description:
    "Compare two UK salaries after tax and see the real monthly and annual take-home difference, deduction drag, and raise impact.",
  path: "/compare-salary",
});

export default function CompareSalaryPage() {
  return (
    <>
      <PageSchema
        pageUrl="https://taxdecod.com/compare-salary"
        title="Compare Two Salaries After Tax UK | TaxDecod"
        description="Compare two UK salaries after tax and understand whether a raise or new offer really improves monthly life."
        breadcrumbs={[
          {
            name: "Home",
            url: "https://taxdecod.com",
          },
          {
            name: "Compare salary",
            url: "https://taxdecod.com/compare-salary",
          },
        ]}
        faqItems={[
          {
            question: "How do I compare two salaries after tax in the UK?",
            answer:
              "Enter both salaries and compare the estimated annual and monthly take-home difference after tax, National Insurance, pension, and student loan deductions.",
          },
          {
            question: "Why does a bigger salary rise feel smaller after tax?",
            answer:
              "Because only part of the gross increase reaches take-home pay. The rest can be lost to tax, National Insurance, pension contributions, and student loan deductions.",
          },
          {
            question: "Is comparing salaries better than looking at gross pay alone?",
            answer:
              "Yes. Salary comparison is much more useful when deciding whether a raise, offer, or move actually changes real monthly life after deductions.",
          },
        ]}
      />
      <CompareSalaryPageClient />
    </>
  );
}