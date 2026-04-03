type SalaryPageSchemaProps = {
  salary: number;
  netAnnual: number;
  netMonthly: number;
};

export default function SalaryPageSchema({
  salary,
  netAnnual,
  netMonthly,
}: SalaryPageSchemaProps) {
  const pageUrl = `https://taxdecod.com/${salary}-after-tax-uk`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `£${salary.toLocaleString("en-GB")} After Tax UK | TaxDecod`,
    description: `Estimated take-home pay breakdown for £${salary.toLocaleString(
      "en-GB"
    )} salary in the UK, including Income Tax, National Insurance, pension, and monthly net pay.`,
    url: pageUrl,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much is £${salary.toLocaleString("en-GB")} after tax per month?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Estimated monthly take-home pay is £${netMonthly.toLocaleString(
              "en-GB",
              { maximumFractionDigits: 0 }
            )}.`,
          },
        },
        {
          "@type": "Question",
          name: `How much is £${salary.toLocaleString("en-GB")} after tax per year?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Estimated annual take-home pay is £${netAnnual.toLocaleString(
              "en-GB",
              { maximumFractionDigits: 0 }
            )}.`,
          },
        },
        {
          "@type": "Question",
          name: `Why might my actual payslip be different from this estimate?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Actual payslips may differ because of tax code changes, pension setup, student loan deductions, bonuses, overtime, salary sacrifice, and payroll timing.`,
          },
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "TaxDecod",
      url: "https://taxdecod.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}