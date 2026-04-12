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
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `£${salary.toLocaleString("en-GB")} after tax in the UK | TaxDecod`,
        description: `Estimated take-home pay breakdown for £${salary.toLocaleString(
          "en-GB"
        )} salary in the UK, including monthly and annual net pay.`,
        isPartOf: {
          "@id": "https://taxdecod.com/#website",
        },
        about: {
          "@id": `${pageUrl}#faq`,
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://taxdecod.com/#website",
        url: "https://taxdecod.com",
        name: "TaxDecod",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://taxdecod.com/salary-hub",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `How much is £${salary.toLocaleString(
              "en-GB"
            )} after tax per month in the UK?`,
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
            name: `How much is £${salary.toLocaleString(
              "en-GB"
            )} after tax per year in the UK?`,
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
            name: "Why can my actual payslip be different from this estimate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Actual payslips can differ because of tax code changes, pension setup, student loan deductions, bonuses, overtime, salary sacrifice, benefits, and payroll timing.",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://taxdecod.com/#organization",
        name: "TaxDecod",
        url: "https://taxdecod.com",
      },
    ],
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