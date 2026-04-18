import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxYearTrustBar from "../../components/shared/tax-year-trust-bar";
import CrossLinkRail from "../../components/seo/cross-link-rail";
import { TAX_YEAR_LABEL } from "../../lib/tax/config";

export const metadata: Metadata = {
  title: "Salary Tools | TaxDecod",
  description:
    "Explore salary tools across TaxDecod including after-tax calculation, salary comparison, reverse salary planning, payslip checks, refund, deduction, and statutory-pay tools.",
};

const coreTools = [
  {
    href: "/calculator",
    title: "Salary calculator",
    tag: "Core route",
    description:
      "Best for checking what a gross UK salary actually leaves you with after deductions.",
  },
  {
    href: "/compare-salary",
    title: "Compare salary",
    tag: "Decision route",
    description:
      "Best for deciding whether a raise or new role materially changes monthly life.",
  },
  {
    href: "/reverse-tax",
    title: "Reverse salary calculator",
    tag: "Planning route",
    description:
      "Best for starting from the monthly amount you want to keep rather than from gross salary.",
  },
  {
    href: "/payslip-checker",
    title: "Payslip checker",
    tag: "Reality check",
    description:
      "Best for first-check interpretation when real deductions look unusual.",
  },
];

const supportTools = [
  {
    href: "/student-loan-calculator",
    title: "Student loan calculator",
    tag: "Deductions",
  },
  {
    href: "/tax-refund-calculator",
    title: "Tax refund calculator",
    tag: "Refunds",
  },
  {
    href: "/tax-code-decoder",
    title: "Tax code decoder",
    tag: "Payroll signals",
  },
  {
    href: "/overtime-calculator",
    title: "Overtime calculator",
    tag: "Extra pay",
  },
  {
    href: "/bonus-tax-calculator",
    title: "Bonus tax calculator",
    tag: "One-off pay",
  },
  {
    href: "/salary-sacrifice-calculator",
    title: "Salary sacrifice calculator",
    tag: "Trade-offs",
  },
  {
    href: "/maternity-pay-calculator",
    title: "Maternity pay calculator",
    tag: "Statutory pay",
  },
  {
    href: "/paternity-pay-calculator",
    title: "Paternity pay calculator",
    tag: "Statutory pay",
  },
  {
    href: "/holiday-pay-calculator",
    title: "Holiday pay calculator",
    tag: "Leave pay",
  },
];

function ToolSurface({
  href,
  title,
  description,
  tag,
  strong = false,
}: {
  href: string;
  title: string;
  description: string;
  tag: string;
  strong?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[26px] border px-6 py-6 transition hover-lift"
      style={{
        borderColor: "var(--line)",
        background: strong
          ? "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 94%, white 6%), var(--card-strong))"
          : "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 92%, white 8%), var(--surface-2))",
        boxShadow:
          "0 22px 50px -38px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at center, black 38%, transparent 90%)",
        }}
      />

      <div
        className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.10), transparent 72%)",
        }}
      />

      <div className="relative z-10">
        <span
          className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{
            borderColor: "var(--line)",
            background: "rgba(255,255,255,0.05)",
            color: "var(--muted)",
          }}
        >
          {tag}
        </span>

        <p className="mt-4 text-lg font-semibold app-title">{title}</p>
        <p className="mt-3 text-sm leading-8 app-copy">{description}</p>
      </div>
    </Link>
  );
}

export default function SalaryToolsPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <section
            className="relative overflow-hidden rounded-[34px] border px-5 py-8 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 95%, white 5%), var(--card-strong))",
              boxShadow:
                "0 26px 62px -40px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "radial-gradient(circle at center, black 38%, transparent 92%)",
              }}
            />

            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-medium app-accent">Salary tools</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight app-title sm:text-5xl">
                All salary tools in one connected system
              </h1>
              <p className="mt-5 text-sm leading-8 app-copy sm:text-base">
                These tools should feel like one coordinated product layer, not a loose
                list of calculators. Use the route that matches the real question:
                take-home clarity, comparison, reverse planning, payslip checking,
                deduction interpretation, or statutory-pay support.
              </p>
            </div>
          </section>

          <div className="mt-8">
            <TaxYearTrustBar
              description={`Tool routes use ${TAX_YEAR_LABEL}-style UK assumptions where relevant and are designed for clarity, interpretation, and planning support.`}
              points={[
                `Using ${TAX_YEAR_LABEL} UK tax assumptions`,
                "Built for real decision support",
                "Connected to salary, compare, and guide pages",
                "Useful for crawl discovery and user flow",
              ]}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Core decision tools
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {coreTools.map((tool) => (
                <ToolSurface
                  key={tool.href}
                  href={tool.href}
                  title={tool.title}
                  description={tool.description}
                  tag={tool.tag}
                  strong
                />
              ))}
            </div>
          </section>

          <section
            className="relative mt-12 overflow-hidden rounded-[32px] border px-5 py-8 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 92%, white 8%), var(--surface-2))",
              boxShadow:
                "0 24px 56px -40px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <div className="relative z-10">
              <div className="max-w-2xl">
                <p className="text-sm font-medium app-accent">Tool flow</p>
                <h2 className="mt-3 text-2xl font-semibold app-title sm:text-3xl">
                  Use the tool network in the right order
                </h2>
                <p className="mt-3 text-sm leading-8 app-copy">
                  A typical journey starts with gross-to-net clarity, then moves into
                  comparison, reverse planning, or payslip interpretation depending
                  on what the user is actually trying to decide.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-4">
                <div
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] app-accent">01</p>
                  <p className="mt-3 text-lg font-semibold app-title">Check take-home</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Start with the salary calculator for the base net reading.
                  </p>
                </div>

                <div
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] app-accent">02</p>
                  <p className="mt-3 text-lg font-semibold app-title">Choose the decision route</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Move into compare salary, reverse salary, or payslip checking.
                  </p>
                </div>

                <div
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] app-accent">03</p>
                  <p className="mt-3 text-lg font-semibold app-title">Layer deductions or support tools</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Add student loan, bonus, overtime, sacrifice, or tax-code context.
                  </p>
                </div>

                <div
                  className="rounded-[24px] border px-5 py-5"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--card-strong)",
                  }}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] app-accent">04</p>
                  <p className="mt-3 text-lg font-semibold app-title">Validate and interpret</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Use guides, benchmarks, and trust pages when the decision matters.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold app-title">
              Specialist and supporting tools
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {supportTools.map((tool) => (
                <ToolSurface
                  key={tool.href}
                  href={tool.href}
                  title={tool.title}
                  tag={tool.tag}
                  description="Open this supporting tool and continue the salary or payslip decision journey with more specific context."
                />
              ))}
            </div>
          </section>

          <CrossLinkRail
            eyebrow="Strong next-step routes"
            title="Use the tools layer to move into the right salary funnel"
            description="These are the strongest adjacent route families after using one of the core tools."
            items={[
              {
                href: "/salary-pages",
                title: "Salary pages",
                description:
                  "Browse expanded after-tax salary routes across the core salary cluster.",
              },
              {
                href: "/salary-hub",
                title: "Salary hub",
                description:
                  "Move across salary, monthly, city-intent, compare, and guide route families.",
              },
              {
                href: "/guides",
                title: "Guides",
                description:
                  "Read the editorial explanation layer behind the tool logic and next decisions.",
              },
              {
                href: "/benchmarks",
                title: "Benchmarks",
                description:
                  "Add role and region market context to salary-tool outputs.",
              },
            ]}
          />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            <Link
              href="/30000-after-tax-uk"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
            >
              <p className="text-lg font-semibold app-title">
                Start with a common salary route
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Use a concrete salary page when the user needs a practical anchor before using a tool.
              </p>
            </Link>

            <Link
              href="/compare/40000-vs-50000-after-tax"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
            >
              <p className="text-lg font-semibold app-title">
                Use a fixed comparison route
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Strong for raise and offer decisions where retained value matters more than gross change.
              </p>
            </Link>

            <Link
              href="/good-salary/40000/london"
              className="rounded-[28px] border px-6 py-6 transition hover-lift"
              style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
            >
              <p className="text-lg font-semibold app-title">
                Judge salary in a city context
              </p>
              <p className="mt-3 text-sm leading-8 app-copy">
                Useful when the real question is what the salary feels like in real life locally.
              </p>
            </Link>
          </section>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}