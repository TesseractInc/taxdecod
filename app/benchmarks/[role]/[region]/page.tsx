import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../components/layout/site-header";
import Container from "../../../../components/ui/container";
import BenchmarkJsonLd from "../../../../components/benchmarks/benchmark-json-ld";
import CompareWithBenchmarkCard from "../../../../components/benchmarks/compare-with-benchmark-card";
import { benchmarkData } from "../../../../lib/benchmarks/benchmark-data";
import {
  getBenchmarkEntry,
  getRegionName,
  getRelatedRegionBenchmarks,
  getRelatedRoleBenchmarks,
  getRoleTitle,
} from "../../../../lib/benchmarks/benchmark-helpers";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateStaticParams() {
  return benchmarkData.map((entry) => ({
    role: entry.role,
    region: entry.region,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; region: string }>;
}): Promise<Metadata> {
  const { role, region } = await params;

  const data = getBenchmarkEntry(role, region);
  const roleTitle = getRoleTitle(role);
  const regionName = getRegionName(region);

  if (!data) {
    return {
      title: "Benchmark page not found | TaxDecod",
    };
  }

  return {
    title: `${roleTitle} salary in ${regionName} | TaxDecod`,
    description: `See the benchmark ${roleTitle.toLowerCase()} salary in ${regionName}, including lower range, median and upper range, with TaxDecod benchmark context.`,
  };
}

export default async function BenchmarkPage({
  params,
}: {
  params: Promise<{ role: string; region: string }>;
}) {
  const { role, region } = await params;

  const data = getBenchmarkEntry(role, region);

  if (!data) return notFound();

  const roleTitle = getRoleTitle(role);
  const regionName = getRegionName(region);

  const relatedRolePages = getRelatedRoleBenchmarks(role, region).slice(0, 4);
  const relatedRegionPages = getRelatedRegionBenchmarks(role, region).slice(0, 4);

  const pageTitle = `${roleTitle} salary in ${regionName} | TaxDecod`;
  const pageDescription = `See the benchmark ${roleTitle.toLowerCase()} salary in ${regionName}, including lower range, median and upper range, with TaxDecod benchmark context.`;

  return (
    <main className="app-shell">
      <SiteHeader />
      <BenchmarkJsonLd
        title={pageTitle}
        description={pageDescription}
        url={`https://taxdecod.com/benchmarks/${role}/${region}`}
      />

      <section className="py-12 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm app-accent">Salary benchmark</p>

            <h1 className="mt-3 text-4xl font-bold app-title sm:text-5xl">
              {roleTitle} salary in {regionName}
            </h1>

            <p className="mt-4 text-base leading-8 app-copy">
              The median salary for a {roleTitle.toLowerCase()} in {regionName} is{" "}
              <strong>{formatCurrency(data.median)}</strong> per year.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="app-soft p-5">
              <p className="text-xs app-subtle">Lower range</p>
              <p className="text-xl font-semibold app-title">
                {formatCurrency(data.lower)}
              </p>
            </div>

            <div className="app-soft p-5">
              <p className="text-xs app-subtle">Median</p>
              <p className="text-xl font-semibold app-title">
                {formatCurrency(data.median)}
              </p>
            </div>

            <div className="app-soft p-5">
              <p className="text-xs app-subtle">Upper range</p>
              <p className="text-xl font-semibold app-title">
                {formatCurrency(data.upper)}
              </p>
            </div>
          </div>

          <div className="mt-8 app-card p-6">
            <p className="text-sm app-copy">
              Source: {data.source} • Updated: {data.updated}
            </p>

            <p className="mt-4 text-sm leading-8 app-copy">
              This is based on employee earnings data and should be used as a
              benchmark reference. Your actual salary may vary based on
              experience, employer, employer type, and role specifics.
            </p>
          </div>

          <div className="mt-8">
            <CompareWithBenchmarkCard
              roleTitle={roleTitle}
              regionName={regionName}
              median={data.median}
            />
          </div>

          {relatedRolePages.length > 0 ? (
            <div className="mt-8 app-card rounded-[30px] p-6 sm:p-7">
              <p className="text-sm font-medium app-accent">Same role, other regions</p>
              <h2 className="mt-2 text-2xl font-semibold app-title">
                Explore more {roleTitle.toLowerCase()} benchmark pages
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {relatedRolePages.map((item) => (
                  <Link
                    key={`${item.role}-${item.region}`}
                    href={`/benchmarks/${item.role}/${item.region}`}
                    className="app-soft rounded-[22px] p-5 hover-lift"
                  >
                    <p className="font-semibold app-title">
                      {roleTitle} in {getRegionName(item.region)}
                    </p>
                    <p className="mt-2 text-sm app-copy">
                      Median {formatCurrency(item.median)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {relatedRegionPages.length > 0 ? (
            <div className="mt-8 app-card rounded-[30px] p-6 sm:p-7">
              <p className="text-sm font-medium app-accent">Same region, other roles</p>
              <h2 className="mt-2 text-2xl font-semibold app-title">
                Explore more benchmark pages in {regionName}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {relatedRegionPages.map((item) => (
                  <Link
                    key={`${item.role}-${item.region}`}
                    href={`/benchmarks/${item.role}/${item.region}`}
                    className="app-soft rounded-[22px] p-5 hover-lift"
                  >
                    <p className="font-semibold app-title">
                      {getRoleTitle(item.role)}
                    </p>
                    <p className="mt-2 text-sm app-copy">
                      Median {formatCurrency(item.median)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </main>
  );
}