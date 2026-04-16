import Link from "next/link";
import Container from "../ui/container";

const primaryLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Compare salary", href: "/compare-salary" },
  { label: "Reverse tax", href: "/reverse-tax" },
  { label: "Salary hub", href: "/salary-hub" },
];

const specialistLinks = [
  { label: "Payslip checker", href: "/payslip-checker" },
  { label: "Tax refund calculator", href: "/tax-refund-calculator" },
  { label: "Tax code decoder", href: "/tax-code-decoder" },
  { label: "Student loan calculator", href: "/student-loan-calculator" },
];

const trustLinks = [
  { label: "Methodology", href: "/methodology" },
  { label: "Assumptions", href: "/assumptions" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr]">
          <div className="max-w-md">
            <p className="text-sm font-semibold app-title">TaxDecod</p>
            <p className="mt-3 text-sm leading-7 app-copy">
              TaxDecod is built to help users understand UK salary, deductions,
              and take-home pay more clearly. It is designed for estimation,
              interpretation, and planning — not payroll processing, regulated
              advice, or HMRC decision-making.
            </p>

            <div
              className="mt-5 rounded-[22px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">
                Trust position
              </p>
              <p className="mt-2 text-sm leading-7 app-copy">
                Results should be read as guidance based on current site logic,
                visible assumptions, and UK tax-year interpretation. Final payroll,
                tax-code, and refund outcomes remain dependent on employer payroll
                systems and HMRC records.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold app-title">Core tools</p>
            <div className="mt-4 grid gap-3">
              {primaryLinks.map((link) => (
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

          <div>
            <p className="text-sm font-semibold app-title">Specialist tools</p>
            <div className="mt-4 grid gap-3">
              {specialistLinks.map((link) => (
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

          <div>
            <p className="text-sm font-semibold app-title">Trust and legal</p>
            <div className="mt-4 grid gap-3">
              {trustLinks.map((link) => (
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
        </div>

        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="app-subtle">
            © {new Date().getFullYear()} TaxDecod. UK salary guidance and
            deduction interpretation platform.
          </p>

          <p className="app-subtle">
            Built for clarity, not hype.
          </p>
        </div>
      </Container>
    </footer>
  );
}