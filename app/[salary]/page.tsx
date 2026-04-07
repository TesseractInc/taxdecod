import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import Container from "@/components/ui/container";
import SalaryPageContent from "@/components/seo/salary-page-content";
import SeoRealityCard from "@/components/seo/seo-reality-card";
import SeoCtaCluster from "@/components/seo/seo-cta-cluster";
import TaxYearTrustBar from "@/components/shared/tax-year-trust-bar";
import TopSalaryCheckpoints from "@/components/shared/top-salary-checkpoints";
import PdfReportStrip from "@/components/shared/pdf-report-strip";
import {
  buildSalaryPageMetadata,
  getSalaryFromParams,
  getSalaryPageData,
} from "@/lib/tax/seo/salary-page";
import { TAX_YEAR_LABEL, TRUST_COPY } from "@/lib/tax/config";

type PageProps = {
  params: Promise<{ salary: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { salary: rawSalary } = await params;
  const salary = getSalaryFromParams(rawSalary);
  return buildSalaryPageMetadata(salary);
}

export default async function SalaryPage({ params }: PageProps) {
  const { salary: rawSalary } = await params;
  const salary = getSalaryFromParams(rawSalary);
  const data = getSalaryPageData(salary);

  const totalDeductions =
    data.result.incomeTaxAnnual +
    data.result.nationalInsuranceAnnual +
    data.result.pensionAnnual +
    data.result.studentLoanAnnual;

  const keepPercent =
    data.result.grossAnnual > 0
      ? (data.result.netAnnual / data.result.grossAnnual) * 100
      : 0;

  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] app-accent">
              Salary breakdown UK
            </p>

            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              £{salary.toLocaleString("en-GB")} after tax in the UK
            </h1>

            <p className="mt-4 text-lg leading-8 app-copy">
              Based on {TAX_YEAR_LABEL}-style assumptions, a salary of{" "}
              <strong className="app-title">
                £{salary.toLocaleString("en-GB")}
              </strong>{" "}
              gives an estimated take-home of{" "}
              <strong className="app-title">
                £{data.result.netAnnual.toLocaleString("en-GB")}
              </strong>{" "}
              per year and{" "}
              <strong className="app-title">
                £{data.result.netMonthly.toLocaleString("en-GB")}
              </strong>{" "}
              per month after tax and deductions.
            </p>
          </div>

          <div className="mt-8">
            <TaxYearTrustBar
              description={TRUST_COPY.salaryPage.description}
              points={[...TRUST_COPY.salaryPage.points]}
            />
          </div>

          <div className="mt-10">
            <SeoRealityCard>
              Using {TAX_YEAR_LABEL}-style assumptions, you keep{" "}
              <strong>{keepPercent.toFixed(0)}%</strong> of your salary and lose{" "}
              <strong>£{totalDeductions.toLocaleString("en-GB")}</strong> to tax
              and deductions. For most users, the number that actually matters in
              real life is the monthly take-home figure, not the gross headline.
            </SeoRealityCard>
          </div>

          <div className="mt-10">
            <PdfReportStrip
              title={`Download the £${salary.toLocaleString("en-GB")} salary report`}
              description="Save this salary breakdown as a PDF for later, job comparisons, or budgeting discussions."
              values={data.input}
              result={data.result}
              filename={`taxdecod-${salary}-salary-report.pdf`}
            />
          </div>

          <div className="mt-10">
            <TopSalaryCheckpoints currentSalary={salary} />
          </div>

          <div className="mt-10">
            <SeoCtaCluster
              items={[
                {
                  href: "/compare-salary",
                  title: "Compare this with another salary",
                  description:
                    "See whether a higher salary really changes your monthly life.",
                },
                {
                  href: "/reverse-tax",
                  title: "Hit a target monthly income",
                  description:
                    "Find what you need to earn to reach your ideal take-home pay.",
                },
                {
                  href: "/salary-hub",
                  title: "Explore more salary pages",
                  description:
                    "Jump to nearby salary levels and related scenarios.",
                },
              ]}
            />
          </div>

          <div className="mt-14">
            <SalaryPageContent
              salary={salary}
              input={data.input}
              result={data.result}
              monthlyGross={data.monthlyGross}
              weeklyGross={data.weeklyGross}
              weeklyNet={data.weeklyNet}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}