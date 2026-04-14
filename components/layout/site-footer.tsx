import Link from "next/link";
import { BriefcaseBusiness, LifeBuoy, Mail, Orbit, ShieldCheck } from "lucide-react";

const coreLinks = [
  { label: "Salary calculator", href: "/calculator" },
  { label: "Compare salaries", href: "/compare-salary" },
  { label: "Reverse salary tool", href: "/reverse-tax" },
  { label: "Payslip checker", href: "/payslip-checker" },
  { label: "Tax refund calculator", href: "/tax-refund-calculator" },
  { label: "Salary hub", href: "/salary-hub" },
];

const exploreLinks = [
  { label: "Payslip explained", href: "/payslip-explained" },
  { label: "Reality check", href: "/reality-check" },
  { label: "Salary tools", href: "/salary-tools" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Services", href: "/services" },
];

const trustLinks = [
  { label: "Methodology", href: "/methodology" },
  { label: "Assumptions", href: "/assumptions" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

const trustPills = [
  "Built for UK salary decisions",
  "Based on current UK tax-year logic",
  "Methodology and assumptions visible",
];

const lastReviewedLabel = "Reviewed April 2026";

export default function SiteFooter() {
  return (
    <footer className="pb-12 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950/96">
          <div className="grid gap-8 p-7 md:p-8 xl:grid-cols-[1.2fr_0.86fr_0.86fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="site-header-mark">
                  <Orbit className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[2rem] font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">
                    TaxDecod
                  </p>
                  <p className="mt-1 text-lg text-slate-500 dark:text-slate-400">
                    UK salary intelligence platform
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-md text-base leading-10 text-slate-600 dark:text-slate-300">
                TaxDecod is built to make UK salary, take-home pay, deductions,
                and payslip understanding clearer for real financial decisions.
              </p>

              <div className="mt-7 flex max-w-xl flex-wrap gap-3">
                {trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid max-w-xl gap-4 sm:grid-cols-2">
                <Link
                  href="/contact"
                  className="rounded-[24px] border border-slate-200 bg-slate-50/78 p-5 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-950">
                    <Mail className="h-5 w-5 app-accent" />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Contact
                  </p>
                  <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                    Support, partnerships, editorial, or commercial enquiries.
                  </p>
                </Link>

                <Link
                  href="/methodology"
                  className="rounded-[24px] border border-slate-200 bg-slate-50/78 p-5 transition hover:border-sky-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/72 dark:hover:border-sky-800 dark:hover:bg-slate-900"
                >
                  <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-950">
                    <BriefcaseBusiness className="h-5 w-5 app-accent" />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Methodology
                  </p>
                  <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                    See how TaxDecod approaches salary logic, assumptions, and
                    result framing.
                  </p>
                </Link>
              </div>

              <p className="mt-7 max-w-xl text-sm leading-8 text-slate-500 dark:text-slate-400">
                TaxDecod is not HMRC and does not provide tax, financial, or
                legal advice. Results are estimates and may vary depending on
                tax code, payroll timing, pension arrangement, salary sacrifice,
                region, employer setup, and student loan status.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                Core tools
              </p>
              <div className="mt-5 space-y-4">
                {coreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-2xl font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                Explore
              </p>
              <div className="mt-5 space-y-4">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-2xl font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                Trust & legal
              </p>

              <div className="mt-5 space-y-4">
                {trustLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-2xl font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/78 p-5 dark:border-slate-800 dark:bg-slate-900/72">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-950">
                      <LifeBuoy className="h-5 w-5 app-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Transparent by default
                      </p>
                      <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                        Methodology, assumptions, disclaimer, and legal pages
                        are visible so users can understand how results should
                        be interpreted.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-50/78 p-5 dark:border-slate-800 dark:bg-slate-900/72">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex rounded-[16px] bg-white p-3 shadow-sm dark:bg-slate-950">
                      <ShieldCheck className="h-5 w-5 app-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {lastReviewedLabel}
                      </p>
                      <p className="mt-2 text-sm leading-8 text-slate-600 dark:text-slate-400">
                        Trust pages and platform-level explanatory copy reviewed
                        for clarity and interpretation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-7 py-5 dark:border-slate-800 md:px-8">
            <div className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <span>© 2026 TaxDecod. All rights reserved.</span>
                <span>Built for salary decisions, not just raw numbers.</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {trustLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}