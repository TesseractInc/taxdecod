import type { Metadata } from "next";
import ReverseTaxPageClient from "@/components/reverse-tax/reverse-tax-page-client";
import PageSchema from "@/components/seo/page-schema";
import { buildSeoMetadata } from "@/components/seo/metadata";

export const metadata: Metadata = buildSeoMetadata({
  title: "Reverse Salary Calculator UK",
  description:
    "Start from your target take-home pay and find the estimated gross salary needed in the UK after tax and deductions.",
  path: "/reverse-tax",
});

export default function ReverseTaxPage() {
  return (
    <>
      <PageSchema
        pageUrl="https://taxdecod.com/reverse-tax"
        title="Reverse Salary Calculator UK | TaxDecod"
        description="Reverse salary planning for the UK. Start from the monthly or yearly take-home pay you want and estimate the gross salary needed."
        breadcrumbs={[
          {
            name: "Home",
            url: "https://taxdecod.com",
          },
          {
            name: "Reverse salary calculator",
            url: "https://taxdecod.com/reverse-tax",
          },
        ]}
        faqItems={[
          {
            question: "How do I work out the salary needed for a target take-home pay?",
            answer:
              "Use a reverse salary calculator to start from the monthly or yearly amount you want to keep, then estimate the gross salary needed after tax and deductions.",
          },
          {
            question: "Why is the required gross salary higher than my take-home target?",
            answer:
              "Because income tax, National Insurance, pension contributions, and student loan deductions reduce the amount that reaches you as net pay.",
          },
          {
            question: "Is reverse salary planning useful for job offers?",
            answer:
              "Yes. Reverse planning is useful when you care more about the monthly money you actually keep than the headline gross salary alone.",
          },
        ]}
      />
      <ReverseTaxPageClient />
    </>
  );
}