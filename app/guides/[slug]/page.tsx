import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../../components/seo/cross-link-rail";
import { GUIDE_EXPANSION_SET, type GuideType } from "../../../components/seo/guide-expansion-config";
import { DynamicGuide } from "../../../components/guides/dynamic-guide";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import { TAX_YEAR_LABEL } from "../../../lib/tax/config";
import { getContextualLinks } from "../../../components/seo/contextual-link-engine";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return GUIDE_EXPANSION_SET.map((g) => ({
    slug: g.slug,
  }));
}

function prettifyDecisionSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => {
      if (/^\d+k$/i.test(part)) {
        return part.toUpperCase();
      }

      if (/^\d+$/.test(part)) {
        return formatCurrency(Number(part)).replace(".00", "");
      }

      if (part === "uk") {
        return "UK";
      }

      if (part === "vs") {
        return "vs";
      }

      if (part === "i") {
        return "I";
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function buildGuideTitle(slug: string, salary: number, type: GuideType) {
  if (type === "isGoodSalary") {
    return `Is ${formatCurrency(salary)} a good salary in the UK? | TaxDecod`;
  }

  if (type === "taxOnSalary") {
    return `How much tax on ${formatCurrency(salary)} in the UK? | TaxDecod`;
  }

  return `${prettifyDecisionSlug(slug)} | TaxDecod`;
}

function buildGuideDescription(
  slug: string,
  salary: number,
  type: GuideType
) {
  if (type === "isGoodSalary") {
    return `Understand what ${formatCurrency(
      salary
    )} means after tax, monthly, and in real-life UK salary terms.`;
  }

  if (type === "taxOnSalary") {
    return `See Income Tax, National Insurance, and take-home pay on ${formatCurrency(
      salary
    )} in the UK.`;
  }

  return `Use this salary decision guide to move from headline pay questions into comparison routes, monthly planning, and practical take-home judgement.`;
}

function buildFaqSchema(
  slug: string,
  salary: number,
  type: GuideType
) {
  if (type === "isGoodSalary") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Is ${formatCurrency(salary)} a good salary in the UK?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${formatCurrency(
              salary
            )} can be a good salary in the UK depending on location, housing costs, and deductions. The stronger way to judge it is by take-home pay and real monthly affordability, not gross salary alone.`,
          },
        },
        {
          "@type": "Question",
          name: `How should ${formatCurrency(salary)} be judged properly?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The best way to judge ${formatCurrency(
              salary
            )} is by checking the after-tax monthly result, comparing it with nearby salary bands, and viewing it in a real city-based context.`,
          },
        },
      ],
    };
  }

  if (type === "taxOnSalary") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much tax do you pay on ${formatCurrency(salary)} in the UK?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The exact amount depends on deductions and setup, but on ${formatCurrency(
              salary
            )} you typically pay Income Tax and National Insurance under standard UK salary assumptions before arriving at your take-home pay.`,
          },
        },
        {
          "@type": "Question",
          name: `Why is tax on ${formatCurrency(salary)} important for salary decisions?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Because the gross salary alone does not show how much money is really left each month. The practical salary decision depends on what remains after tax and deductions.`,
          },
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why can a salary increase feel smaller than expected?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because deductions absorb part of the headline raise, so the real monthly improvement is often smaller than the gross number suggests.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best way to judge whether a raise is worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compare the two salaries after tax, check the monthly difference, and judge whether that improvement changes real life enough to matter.",
        },
      },
    ],
  };
}

function buildGuideHeading(slug: string, salary: number, type: GuideType) {
  if (type === "isGoodSalary") {
    return `Is ${formatCurrency(salary)} a good salary in the UK?`;
  }

  if (type === "taxOnSalary") {
    return `How much tax on ${formatCurrency(salary)} in the UK?`;
  }

  return prettifyDecisionSlug(slug);
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = GUIDE_EXPANSION_SET.find((g) => g.slug === resolvedParams.slug);

  if (!guide) {
    return {};
  }

  return {
    title: buildGuideTitle(guide.slug, guide.salary, guide.type),
    description: buildGuideDescription(guide.slug, guide.salary, guide.type),
  };
}

export default async function Page({ params }: RouteParams) {
  const resolvedParams = await params;
  const guide = GUIDE_EXPANSION_SET.find((g) => g.slug === resolvedParams.slug);

  if (!guide) {
    return notFound();
  }

  const faqSchema = buildFaqSchema(guide.slug, guide.salary, guide.type);
  const contextualLinks = getContextualLinks({
    type: "guide",
    salary: guide.salary,
    guideType: guide.type,
  });

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container className="max-w-3xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />

          <h1 className="text-3xl font-bold app-title sm:text-5xl">
            {buildGuideHeading(guide.slug, guide.salary, guide.type)}
          </h1>

          <div className="mt-6">
            <TaxYearTrustBar
              description={`This guide uses ${TAX_YEAR_LABEL}-style UK salary assumptions to support explanation and planning.`}
              points={[
                "Estimate-based guidance",
                "Educational use",
                "Connected to salary routes",
                "Not financial advice",
              ]}
            />
          </div>

          <DynamicGuide
            slug={guide.slug}
            salary={guide.salary}
            type={guide.type}
          />

          <CrossLinkRail
            title="Move from this guide into the next useful route"
            description="These links connect the editorial explanation layer to salary breakdowns, monthly planning, comparison pages, and city-intent salary routes."
            items={contextualLinks}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}