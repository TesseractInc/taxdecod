import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import TaxYearTrustBar from "../../../components/shared/tax-year-trust-bar";
import SeoPageHero from "../../../components/seo/seo-page-hero";
import SeoRealityCard from "../../../components/seo/seo-reality-card";
import SeoCtaCluster from "../../../components/seo/seo-cta-cluster";
import SalaryPageSchema from "../../../components/seo/salary-page-schema";
import MonthlyTakeHomeContent from "../../../components/seo/monthly-take-home-content";
import { buildSeoMetadata } from "../../../components/seo/metadata";
import { TAX_YEAR_LABEL } from "../../../lib/tax/config";
import { formatCurrency } from "../../../lib/tax/utils/currency";
import {
  getMonthlyTakeHomeAmounts,
  getMonthlyTakeHomePageData,
  parseMonthlyTakeHomeAmount,
} from "../../../components/seo/monthly-target-pages";
import { getMonthlyTakeHomeContent } from "../../../components/seo/monthly-take-home-programmatic-content";

type PageProps = {
  params: Promise<{
    amount: string;
  }>;
};

export async function generateStaticParams() {
  return getMonthlyTakeHomeAmounts().map((amount) => ({
    amount: String(amount),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeAmount(resolvedParams.amount);

  if (!amount) {
    return buildSeoMetadata({
      title: "Monthly Take-Home Salary Pages | TaxDecod",
      description:
        "Find the salary needed to reach target monthly take-home amounts in the UK.",
      path: "/salary-hub",
    });
  }

  const data = getMonthlyTakeHomePageData(amount);

  const contentPack = getMonthlyTakeHomeContent({
    targetMonthly: amount,
    requiredSalary: data.grossAnnual,
    annualNet: data.result.netAnnual,
  });

  return buildSeoMetadata({
    title: `How Much Salary to Take Home ${formatCurrency(amount)} a Month | TaxDecod`,
    description: `${contentPack.summary} ${contentPack.thresholdNote}`.slice(
      0,
      155
    ),
    path: `/monthly-take-home/${amount}`,
  });
}

export default async function MonthlyTakeHomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const amount = parseMonthlyTakeHomeAmount(resolvedParams.amount);

  if (!amount) {
    notFound();
  }

  const data = getMonthlyTakeHomePageData(amount);

  const contentPack = getMonthlyTakeHomeContent({
    targetMonthly: amount,
    requiredSalary: data.grossAnnual,
    annualNet: data.result.netAnnual,
  });

  const lowerTarget = Math.max(amount - 500, 1000);
  const higherTarget = amount + 500;
  const lowerSalary = Math.max(data.grossAnnual - 5000, 15000);
  const higherSalary = data.grossAnnual + 5000;

  const monthlyGross = data.grossAnnual / 12;
  const weeklyGross = data.grossAnnual / 52;
  const weeklyNet = data.result.netAnnual / 52;

  return (
    <main className="app-shell">
      <SalaryPageSchema
        salary={data.grossAnnual}
        netAnnual={data.result.netAnnual}
        netMonthly={data.result.netMonthly}
        faqItems={contentPack.faqItems}
      />

      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container>
          <SeoPageHero
            eyebrow="Monthly target route"
            title={`How much salary to take home ${formatCurrency(amount)} a month`}
            description={contentPack.summary}
            highlightValue={formatCurrency(data.grossAnnual)}
            highlightSubtext={`estimated gross salary needed under ${TAX_YEAR_LABEL}-style assumptions`}
          />

          <div className="mt-8">
            <TaxYearTrustBar
              description={`This reverse-intent page uses ${TAX_YEAR_LABEL}-style UK salary assumptions to estimate the gross salary needed to take home about ${formatCurrency(
                amount
              )} per month.`}
              points={[
                `Updated for the ${TAX_YEAR_LABEL} UK tax year`,
                "Built for target take-home planning",
                "Useful for job search and raise decisions",
                "Estimate-based guidance, not payroll exact",
              ]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard label="Monthly target reality">
              The practical question is not “what salary sounds good?” but “what
              gross salary is likely to leave about{" "}
              <strong>{formatCurrency(amount)}</strong> per month after
              deductions?” This page exists to answer that more directly.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/reverse-tax",
                  title: "Use the full reverse salary calculator",
                  description:
                    "Best when you want to change region, pension, or student loan settings instead of relying on the default route.",
                },
                {
                  href: "/compare-salary",
                  title: "Compare against another salary route",
                  description:
                    "Useful when you want to test whether a nearby salary creates a materially better monthly result.",
                },
                {
                  href: "/calculator",
                  title: "Inspect the required salary in full",
                  description:
                    "Use the main calculator when you want the broader tax, pension, and deduction picture behind the result.",
                },
              ]}
            />
          </div>

          <section className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <Link
              href={`/monthly-take-home/${lowerTarget}`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Take home {formatCurrency(lowerTarget)} a month
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to see whether a slightly lower monthly
                target makes salary planning easier.
              </p>
            </Link>

            <Link
              href={`/monthly-take-home/${higherTarget}`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                Take home {formatCurrency(higherTarget)} a month
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to test how much extra salary is needed for
                the next monthly step up.
              </p>
            </Link>

            <Link
              href={`/${lowerSalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See {formatCurrency(lowerSalary)} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to compare the nearest lower salary band
                against this monthly target.
              </p>
            </Link>

            <Link
              href={`/${higherSalary}-after-tax-uk`}
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{
                borderColor: "var(--line)",
                background: "var(--card-strong)",
              }}
            >
              <p className="text-lg font-semibold app-title">
                See {formatCurrency(higherSalary)} after tax
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when you want to know whether the next salary band creates
                a meaningfully better result.
              </p>
            </Link>
          </section>

          <div className="mt-14">
            <MonthlyTakeHomeContent
              targetMonthly={amount}
              requiredSalary={data.grossAnnual}
              result={data.result}
              monthlyGross={monthlyGross}
              weeklyGross={weeklyGross}
              weeklyNet={weeklyNet}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}