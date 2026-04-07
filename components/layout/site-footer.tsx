import Link from "next/link";
import Container from "../ui/container";

const productLinks = [
  { label: "Salary calculator", href: "/calculator" },
  { label: "Compare salaries", href: "/compare-salary" },
  { label: "Reverse calculator", href: "/reverse-tax" },
  { label: "Salary hub", href: "/salary-hub" },
];

const exploreLinks = [
  { label: "Salary pages", href: "/salary-pages" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Payslip explained", href: "/payslip-explained" },
  { label: "Reality check", href: "/reality-check" },
];

const supportLinks = [
  { label: "Salary tools", href: "/salary-tools" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-6 border-t" style={{ borderColor: "var(--line)" }}>
      <Container className="py-14">
        <div className="app-card-strong rounded-[34px] p-8 sm:p-10">
          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div className="max-w-xl">
              <p className="text-2xl font-bold app-title">TaxDecod</p>
              <p className="mt-4 text-sm leading-8 app-copy">
                TaxDecod is a UK salary intelligence platform built to make
                take-home pay, deductions, and payslip understanding clearer
                for real salary decisions.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <div className="app-chip px-4 py-2 text-xs font-semibold">
                  UK PAYE-aligned logic
                </div>
                <div className="app-soft px-4 py-2 text-xs app-subtle">
                  Updated tax-year assumptions
                </div>
                <div className="app-soft px-4 py-2 text-xs app-subtle">
                  PDF salary reports
                </div>
              </div>

              <p className="mt-6 text-xs leading-6 app-subtle">
                TaxDecod is not HMRC or legal advice. Results are estimates and
                can vary based on tax code, pension setup, salary sacrifice,
                student loan plan, payroll timing, region, and employer-specific
                arrangements.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
                Product
              </p>

              <div className="mt-4 space-y-3">
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm app-copy transition hover:translate-x-0.5 hover:text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
                Explore
              </p>

              <div className="mt-4 space-y-3">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm app-copy transition hover:translate-x-0.5 hover:text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
                Support
              </p>

              <div className="mt-4 space-y-3">
                {supportLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm app-copy transition hover:translate-x-0.5 hover:text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="app-subtle">© 2026 TaxDecod. All rights reserved.</p>
            <p className="app-subtle">
              Built for salary decisions, not just raw numbers.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}