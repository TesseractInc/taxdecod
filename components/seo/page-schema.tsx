type BreadcrumbItem = {
  name: string;
  url: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PageSchemaProps = {
  pageUrl: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FaqItem[];
};

export default function PageSchema({
  pageUrl,
  title,
  description,
  breadcrumbs = [],
  faqItems = [],
}: PageSchemaProps) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        "@id": "https://taxdecod.com/#website",
      },
      about: faqItems.length > 0 ? { "@id": `${pageUrl}#faq` } : undefined,
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
      "@type": "Organization",
      "@id": "https://taxdecod.com/#organization",
      name: "TaxDecod",
      url: "https://taxdecod.com",
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
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