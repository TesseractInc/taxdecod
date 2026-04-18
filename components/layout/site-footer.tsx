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

const guideLinks = [
  { label: "Guides hub", href: "/guides" },
  {
    label: "How Income Tax works in the UK",
    href: "/guides/how-income-tax-works-uk",
  },
  {
    label: "How student loan affects salary in the UK",
    href: "/guides/how-student-loan-affects-salary-uk",
  },
  {
    label: "How to read a payslip in the UK",
    href: "/guides/how-to-read-a-payslip-uk",
  },
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

export default function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.8fr_0.9fr_1fr_1fr]">
          <div className="max-w-md">
            <p className="text-sm font-semibold app-title">TaxDecod</p>
            <p className="mt-3 text-sm leading-7 app-copy">
              TaxDecod is a UK salary and deduction interpretation platform.
              It is designed to help users understand take-home pay, payslips,
              and salary decisions more clearly through estimate-based guidance.
            </p>

            <div
              className="mt-5 rounded-[22px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">Public trust framing</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                TaxDecod should be read as a salary-decision and deduction
                interpretation platform. It does not replace payroll software,
                HMRC records, or regulated advice.
              </p>
            </div>

            <div
              className="mt-4 rounded-[22px] border px-4 py-4"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <p className="text-sm font-semibold app-title">Contact</p>
              <p className="mt-2 text-sm leading-7 app-copy">
                contact@taxdecod.com
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
            <p className="text-sm font-semibold app-title">Guides</p>
            <div className="mt-4 grid gap-3">
              {guideLinks.map((link) => (
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
            Public guidance only. Verify important outcomes with official records where needed.
          </p>
        </div>
      </Container>
    </footer>
  );
}