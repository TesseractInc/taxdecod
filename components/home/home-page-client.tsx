"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import SiteHeader from "../layout/site-header";
import SiteFooter from "../layout/site-footer";
import Container from "../ui/container";
import CalculatorCard from "../calculator/calculator-card";
import TaxYearTrustBar from "../shared/tax-year-trust-bar";
import HmrcReferencePanel from "../shared/hmrc-reference-panel";
import AdSlot from "../ads/ad-slot";

const tools = [
  {
    title: "Reverse Salary",
    href: "/reverse-tax",
    tag: "Target income",
    blurb: "Work backwards from what you want to keep.",
  },
  {
    title: "Compare Salary",
    href: "/compare-salary",
    tag: "Offer decision",
    blurb: "See whether the jump is really worth it.",
  },
  {
    title: "Payslip Checker",
    href: "/payslip-checker",
    tag: "Reality check",
    blurb: "Check whether deductions broadly look right.",
  },
  {
    title: "Student Loan",
    href: "/student-loan-calculator",
    tag: "Deductions",
    blurb: "See how loan repayments change net pay.",
  },
  {
    title: "Tax Refund",
    href: "/tax-refund-calculator",
    tag: "Refunds",
    blurb: "Estimate whether you may have overpaid.",
  },
  {
    title: "Tax Code",
    href: "/tax-code-decoder",
    tag: "Payroll",
    blurb: "Decode common UK tax code confusion.",
  },
  {
    title: "Overtime",
    href: "/overtime-calculator",
    tag: "Extra pay",
    blurb: "See what extra hours really add.",
  },
  {
    title: "Bonus Tax",
    href: "/bonus-tax-calculator",
    tag: "One-off pay",
    blurb: "Estimate the deduction impact of a bonus.",
  },
  {
    title: "Salary Sacrifice",
    href: "/salary-sacrifice-calculator",
    tag: "Trade-offs",
    blurb: "See how sacrifice changes take-home pay.",
  },
  {
    title: "Holiday Pay",
    href: "/holiday-pay-calculator",
    tag: "Leave pay",
    blurb: "Check holiday-related pay more clearly.",
  },
];

const nextSteps = [
  {
    title: "Compare this salary against another offer",
    href: "/compare-salary",
    description:
      "Use this when the real decision is whether a raise or new role changes monthly life enough after deductions.",
  },
  {
    title: "Work backwards from the income you want to keep",
    href: "/reverse-tax",
    description:
      "Use this when you know the monthly amount you need and want the estimated gross salary required to support it.",
  },
  {
    title: "Check whether a payslip looks on track",
    href: "/payslip-checker",
    description:
      "Use a first-check reading of PAYE, National Insurance, pension, and year-to-date deductions when something feels off.",
  },
  {
    title: "Explore nearby salary levels before deciding",
    href: "/salary-hub",
    description:
      "Use salary pages and nearby ranges to understand whether slightly higher or lower pay materially changes the result.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function AnimatedSectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[34px] border ${className}`}
      style={{
        borderColor: "var(--line)",
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 95%, white 5%), var(--card-strong))",
        boxShadow:
          "0 24px 60px -38px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-8 h-36 w-36 rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.12), transparent 72%)",
          }}
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[2%] top-[12%] h-32 w-32 rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.10), transparent 72%)",
          }}
          animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-[-8%] left-[28%] h-28 w-28 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.07), transparent 72%)",
          }}
          animate={{ x: [0, 10, 0], y: [0, -12, 0] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-y-0 left-[18%] w-px opacity-40"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(56,189,248,0.26), transparent)",
          }}
          animate={{ opacity: [0.18, 0.45, 0.18] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-y-0 right-[18%] w-px opacity-30"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(99,102,241,0.22), transparent)",
          }}
          animate={{ opacity: [0.14, 0.34, 0.14] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(circle at center, black 42%, transparent 88%)",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ToolCard({
  title,
  href,
  tag,
  blurb,
}: {
  title: string;
  href: string;
  tag: string;
  blurb: string;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}% ${mouseY}%, color-mix(in srgb, var(--accent, #38bdf8) 18%, transparent), transparent 60%)`;

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{ y: -5, scale: 1.014 }}
        transition={{ duration: 0.22 }}
      >
        <Link
          href={href}
          onMouseMove={handleMove}
          className="group relative block h-full overflow-hidden rounded-[24px] border px-4 py-4 sm:px-5 sm:py-5"
          style={{
            borderColor: "var(--line)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 92%, white 8%), var(--surface-2))",
            boxShadow:
              "0 16px 36px -28px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.58), transparent)",
            }}
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 3.1,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.3,
            }}
          />

          <div
            className="pointer-events-none absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.10), transparent 72%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-x-4 bottom-0 h-px opacity-40"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 55%, transparent), transparent)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between gap-3">
              <span
                className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  borderColor: "var(--line)",
                  background:
                    "color-mix(in srgb, var(--primary) 7%, transparent)",
                  color: "var(--primary)",
                }}
              >
                {tag}
              </span>

              <span className="text-sm app-subtle transition group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="mt-4">
              <motion.p
                className="text-sm font-semibold tracking-[0.01em] app-title sm:text-[15px]"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.16 }}
              >
                {title}
              </motion.p>

              <p className="mt-2 text-xs leading-6 app-subtle sm:text-[13px]">
                {blurb}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function NextStepCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}% ${mouseY}%, rgba(99,102,241,0.10), transparent 58%)`;

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.22 }}
      >
        <Link
          href={href}
          onMouseMove={handleMove}
          className="group relative block overflow-hidden rounded-[26px] border px-5 py-6"
          style={{
            borderColor: "var(--line)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 96%, white 4%), var(--card-strong))",
            boxShadow:
              "0 18px 40px -30px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.52), transparent)",
            }}
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.1,
            }}
          />

          <div
            className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full blur-2xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.08), transparent 72%)",
            }}
          />

          <div className="relative z-10">
            <motion.p
              className="text-base font-semibold leading-7 app-title sm:text-lg"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.16 }}
            >
              {title}
            </motion.p>

            <p className="mt-3 text-sm leading-7 app-copy">{description}</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function HomePageClient() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-12">
        <Container>
          <motion.section
            className="relative overflow-hidden rounded-[34px] border px-5 py-8 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--card-strong) 92%, #0b2240 8%) 0%, color-mix(in srgb, var(--card-strong) 88%, #12396b 12%) 52%, color-mix(in srgb, var(--card-strong) 92%, #0b2240 8%) 100%)",
              boxShadow:
                "0 28px 70px -42px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                className="absolute inset-y-0 left-0 w-1/3 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at left center, rgba(56,189,248,0.16), transparent 72%)",
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-1/3 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at right center, rgba(99,102,241,0.14), transparent 72%)",
                }}
              />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm"
              >
                UK salary clarity platform
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl"
              >
                Know exactly what your salary really leaves you with
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-4 text-sm leading-7 app-copy sm:text-base sm:leading-8"
              >
                Check take-home pay after Income Tax, National Insurance, pension,
                and student loan deductions, then move into the next step that
                actually helps the salary decision.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="mt-3 text-xs app-subtle"
              >
                Updated for the 2026/27 UK tax year • Estimate-based guidance •
                Built for salary clarity, not payroll replacement
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap justify-center gap-3"
              >
                <Link href="/calculator" className="app-button-primary">
                  Calculate your take-home
                </Link>
                <Link href="/compare-salary" className="app-button-secondary">
                  Compare salaries properly
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-7 grid gap-4 sm:grid-cols-3"
              >
                <div
                  className="rounded-[20px] border px-4 py-4 text-left"
                  style={{
                    borderColor: "var(--line)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">Take-home first</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Start with the real net result, not just the gross salary headline.
                  </p>
                </div>

                <div
                  className="rounded-[20px] border px-4 py-4 text-left"
                  style={{
                    borderColor: "var(--line)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">Solution routes</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Compare, reverse-plan, or use payslip routes depending on the question.
                  </p>
                </div>

                <div
                  className="rounded-[20px] border px-4 py-4 text-left"
                  style={{
                    borderColor: "var(--line)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <p className="text-sm font-semibold app-title">Trust layer</p>
                  <p className="mt-2 text-sm leading-7 app-copy">
                    Use methodology and assumptions when the result matters for a real decision.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <div className="mt-8">
            <AdSlot label="Advertisement" minHeight={90} />
          </div>

          <motion.section
            className="mt-8 rounded-[30px] border px-4 py-5 sm:px-6 sm:py-6"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 96%, white 4%), var(--card-strong))",
              boxShadow:
                "0 22px 54px -38px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.div variants={itemVariants} className="mb-5">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] app-accent">
                  Core calculator
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
                  Check the real take-home result
                </h2>
                <p className="mt-3 text-sm leading-7 app-copy sm:text-base">
                  Enter the salary you want to understand, see what it becomes after
                  deductions, then move into the next useful route.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div
                className="rounded-[24px] border p-2 sm:p-3"
                style={{
                  borderColor: "var(--line)",
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 88%, #0c2748 12%), color-mix(in srgb, var(--surface-2) 94%, #08152a 6%))",
                  boxShadow:
                    "0 16px 40px -30px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <CalculatorCard mode="overview" />
              </div>
            </motion.div>
          </motion.section>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            className="mt-12"
          >
            <AnimatedSectionShell className="px-5 py-8 sm:px-8 sm:py-10">
              <div className="relative">
                <div className="mx-auto max-w-3xl text-center">
                  <motion.p
                    className="text-xs font-semibold uppercase tracking-[0.18em] app-accent"
                    variants={itemVariants}
                  >
                    Tool system
                  </motion.p>

                  <motion.h2
                    className="mt-3 text-2xl font-semibold tracking-tight app-title sm:text-3xl"
                    variants={itemVariants}
                  >
                    All salary tools in one place
                  </motion.h2>

                  <motion.p
                    className="mx-auto mt-3 max-w-2xl text-sm leading-7 app-copy sm:text-base"
                    variants={itemVariants}
                  >
                    Use the right route for the exact salary question you are trying
                    to answer, from take-home checks to salary comparison, reverse
                    planning, and payslip interpretation.
                  </motion.p>
                </div>

                <motion.div
                  className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
                  variants={sectionVariants}
                >
                  {tools.map((tool) => (
                    <ToolCard
                      key={tool.href}
                      title={tool.title}
                      href={tool.href}
                      tag={tool.tag}
                      blurb={tool.blurb}
                    />
                  ))}
                </motion.div>
              </div>
            </AnimatedSectionShell>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            className="mt-14"
          >
            <AnimatedSectionShell className="px-5 py-8 sm:px-8 sm:py-10">
              <div className="relative">
                <motion.h2
                  className="text-center text-2xl font-semibold tracking-tight app-title sm:text-3xl"
                  variants={itemVariants}
                >
                  What to do after the first result
                </motion.h2>

                <motion.p
                  className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 app-copy sm:text-base"
                  variants={itemVariants}
                >
                  Once you have a salary result, the best next step should be
                  obvious: compare, reverse-plan, check a payslip, or explore nearby ranges.
                </motion.p>

                <motion.div
                  className="mt-7 grid gap-4 md:grid-cols-2"
                  variants={sectionVariants}
                >
                  {nextSteps.map((step) => (
                    <NextStepCard
                      key={step.href}
                      title={step.title}
                      description={step.description}
                      href={step.href}
                    />
                  ))}
                </motion.div>
              </div>
            </AnimatedSectionShell>
          </motion.section>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <div className="mt-14">
            <TaxYearTrustBar
              description="Built around current UK tax-year assumptions and designed for salary clarity, planning, and decision support."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based outputs, not financial advice",
                "PAYE-style salary interpretation",
                "Transparent assumptions and trust framing",
              ]}
            />
          </div>

          <div className="mt-10">
            <HmrcReferencePanel />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}