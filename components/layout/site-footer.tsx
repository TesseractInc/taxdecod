"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../ui/container";

const primaryLinks = [
  { label: "Salary calculator", href: "/calculator" },
  { label: "Compare salary", href: "/compare-salary" },
  { label: "Reverse salary", href: "/reverse-tax" },
  { label: "Salary hub", href: "/salary-hub" },
];

const specialistLinks = [
  { label: "Payslip checker", href: "/payslip-checker" },
  { label: "Tax refund calculator", href: "/tax-refund-calculator" },
  { label: "Tax code decoder", href: "/tax-code-decoder" },
  { label: "Student loan calculator", href: "/student-loan-calculator" },
  { label: "Bonus tax calculator", href: "/bonus-tax-calculator" },
  { label: "Overtime calculator", href: "/overtime-calculator" },
  { label: "Salary sacrifice calculator", href: "/salary-sacrifice-calculator" },
];

const guideLinks = [
  { label: "Guides hub", href: "/guides" },
  { label: "How Income Tax works in the UK", href: "/guides/how-income-tax-works-uk" },
  { label: "How student loan affects salary in the UK", href: "/guides/how-student-loan-affects-salary-uk" },
  { label: "How to read a payslip in the UK", href: "/guides/how-to-read-a-payslip-uk" },
  { label: "Benchmarks hub", href: "/benchmarks" },
  { label: "Benchmark roles", href: "/benchmarks/roles" },
  { label: "Benchmark regions", href: "/benchmarks/regions" },
  { label: "Is £40,000 good in London?", href: "/good-salary/40000/london" },
];

const trustLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Methodology", href: "/methodology" },
  { label: "Assumptions", href: "/assumptions" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

const featuredRoutes = [
  { label: "£30,000 after tax", href: "/30000-after-tax-uk" },
  { label: "£40,000 after tax", href: "/40000-after-tax-uk" },
  { label: "£50,000 after tax", href: "/50000-after-tax-uk" },
  { label: "£40k vs £50k", href: "/compare/40000-vs-50000-after-tax" },
  { label: "Take home £3,000 / month", href: "/monthly-take-home/3000" },
  { label: "What is a good salary in the UK?", href: "/guides/what-is-a-good-salary-uk" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="text-sm font-semibold app-title">{title}</p>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm app-copy transition hover:app-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.12), transparent 72%)",
          }}
          animate={{ x: [0, 18, 0], y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[6%] top-[12%] h-36 w-36 rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.10), transparent 72%)",
          }}
          animate={{ x: [0, -18, 0], y: [0, 16, 0] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(circle at center, black 38%, transparent 92%)",
          }}
        />
      </div>

      <Container className="relative py-12 sm:py-14">
        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.9fr_0.95fr_0.95fr_0.95fr]">
          <div className="max-w-md">
            <p className="text-sm font-semibold app-title">TaxDecod</p>
            <p className="mt-3 text-sm leading-7 app-copy">
              TaxDecod is a UK salary clarity platform built to help users understand
              take-home pay, compare salary outcomes, reverse-plan income targets,
              interpret payslips, and judge what salary may actually mean in practical life.
            </p>

            <div
              className="mt-5 rounded-[24px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 90%, white 10%), var(--surface-2))",
                boxShadow:
                  "0 20px 44px -34px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <p className="text-sm font-semibold app-title">Public trust framing</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                TaxDecod provides estimate-based salary guidance and interpretation.
                It is not payroll software, not an HMRC record, and not regulated
                financial or tax advice.
              </p>
            </div>

            <div
              className="mt-4 rounded-[24px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 90%, white 10%), var(--surface-2))",
                boxShadow:
                  "0 20px 44px -34px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <p className="text-sm font-semibold app-title">Use it best for</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                Salary comparison, take-home planning, monthly target thinking,
                payslip first-checks, and clearer understanding of deductions.
              </p>
            </div>
          </div>

          <FooterColumn title="Core tools" links={primaryLinks} />
          <FooterColumn title="Specialist tools" links={specialistLinks} />
          <FooterColumn title="Guides & benchmarks" links={guideLinks} />
          <FooterColumn title="Trust & legal" links={trustLinks} />
        </div>

        <div
          className="mt-10 rounded-[26px] border px-5 py-5 sm:px-6"
          style={{
            borderColor: "var(--line)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 94%, white 6%), var(--card-strong))",
            boxShadow:
              "0 24px 54px -38px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold app-title">Popular routes</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                These are strong next-step pages for salary interpretation, raise decisions,
                monthly planning, and broader salary judgement.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {featuredRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="rounded-full border px-3.5 py-2 text-xs font-medium transition hover-lift"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--surface-2)",
                    color: "var(--text)",
                  }}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="app-subtle">
            © {new Date().getFullYear()} TaxDecod. UK salary guidance and deduction interpretation platform.
          </p>

          <p className="app-subtle">
            Estimate-based guidance only. Verify important outcomes with official records where needed.
          </p>
        </div>
      </Container>
    </footer>
  );
}