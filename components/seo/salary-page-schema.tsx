type SalaryPageSchemaProps = {
  salary: number;
  netAnnual: number;
  netMonthly: number;
  faqItems?: {
    question: string;
    answer: string;
  }[];
};

export default function SalaryPageSchema({
  salary,
  netAnnual,
  netMonthly,
  faqItems = [],
}: SalaryPageSchemaProps) {
  const pageUrl = `https://taxdecod.com/${salary}-after-tax-uk`;

  const fallbackFaq = [
    {
      question: `How much is £${salary.toLocaleString(
        "en-GB"
      )} after tax per month in the UK?`,
      answer: `Estimated monthly take-home pay is £${netMonthly.toLocaleString(
        "en-GB",
        { maximumFractionDigits: 0 }
      )}.`,
    },
    {
      question: `How much is £${salary.toLocaleString(
        "en-GB"
      )} after tax per year in the UK?`,
      answer: `Estimated annual take-home pay is £${netAnnual.toLocaleString(
        "en-GB",
        { maximumFractionDigits: 0 }
      )}.`,
    },
    {
      question: "Why can my actual payslip be different from this estimate?",
      answer:
        "Actual payslips can differ because of tax code changes, pension setup, student loan deductions, bonuses, overtime, salary sacrifice, benefits, and payroll timing.",
    },
  ];

  const finalFaq = faqItems.length > 0 ? faqItems : fallbackFaq;

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
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://taxdecod.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Salary hub",
            item: "https://taxdecod.com/salary-hub",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `£${salary.toLocaleString("en-GB")} after tax in the UK`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: finalFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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