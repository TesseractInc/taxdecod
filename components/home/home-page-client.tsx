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
  { title: "Reverse Salary", href: "/reverse-tax" },
  { title: "Compare Salary", href: "/compare-salary" },
  { title: "Payslip Checker", href: "/payslip-checker" },
  { title: "Student Loan", href: "/student-loan-calculator" },
  { title: "Tax Refund", href: "/tax-refund-calculator" },
  { title: "Tax Code", href: "/tax-code-decoder" },
  { title: "Overtime", href: "/overtime-calculator" },
  { title: "Bonus Tax", href: "/bonus-tax-calculator" },
  { title: "Salary Sacrifice", href: "/salary-sacrifice-calculator" },
  { title: "Holiday Pay", href: "/holiday-pay-calculator" },
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

function ToolCard({ title, href }: { title: string; href: string }) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${mouseX}% ${mouseY}%, color-mix(in srgb, var(--accent, #38bdf8) 16%, transparent), transparent 58%)`;

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{ y: -4, scale: 1.014 }}
        transition={{ duration: 0.22 }}
      >
        <Link
          href={href}
          onMouseMove={handleMove}
          className="group relative block overflow-hidden rounded-[22px] border px-4 py-5"
          style={{
            borderColor: "var(--line)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 94%, white 6%), var(--surface-2))",
            boxShadow:
              "0 16px 36px -28px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.14)",
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
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
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
            className="pointer-events-none absolute -right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full blur-2xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.10), transparent 72%)",
            }}
          />

          <div className="relative z-10 flex min-h-[58px] items-center justify-center text-center">
            <motion.span
              className="text-sm font-semibold tracking-[0.01em] app-title sm:text-[15px]"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.16 }}
            >
              {title}
            </motion.span>
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] app-accent sm:text-sm">
              UK salary clarity platform
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight app-title sm:text-5xl">
              Know exactly what your salary really leaves you with
            </h1>

            <p className="mt-4 text-sm leading-7 app-copy sm:text-base sm:leading-8">
              Check take-home pay after Income Tax, National Insurance, pension,
              and student loan deductions, then move into the next step that
              actually helps the salary decision.
            </p>

            <p className="mt-3 text-xs app-subtle">
              Updated for the 2026/27 UK tax year • Estimate-based guidance •
              Built for salary clarity, not payroll replacement
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/calculator" className="app-button-primary">
                Calculate your take-home
              </Link>
              <Link href="/compare-salary" className="app-button-secondary">
                Compare salaries properly
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <AdSlot label="Advertisement" minHeight={90} />
          </div>

          <div className="mt-6">
            <CalculatorCard mode="overview" />
          </div>

          <div className="mt-8">
            <AdSlot label="Advertisement" />
          </div>

          <motion.section
            className="relative mt-12 overflow-hidden rounded-[34px] border px-5 py-8 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 95%, white 5%), var(--card-strong))",
              boxShadow:
                "0 24px 60px -38px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-8 top-8 h-36 w-36 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.10), transparent 70%)",
                }}
                animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute right-[2%] top-[12%] h-32 w-32 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.08), transparent 72%)",
                }}
                animate={{ x: [0, -12, 0], y: [0, 12, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute bottom-[-8%] left-[28%] h-28 w-28 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.06), transparent 72%)",
                }}
                animate={{ x: [0, 10, 0], y: [0, -12, 0] }}
                transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  maskImage:
                    "radial-gradient(circle at center, black 42%, transparent 88%)",
                }}
              />
            </div>

            <div className="relative">
              <motion.h2
                className="text-center text-2xl font-semibold tracking-tight app-title sm:text-3xl"
                variants={itemVariants}
              >
                All salary tools in one place
              </motion.h2>

              <motion.p
                className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 app-copy sm:text-base"
                variants={itemVariants}
              >
                Use the right route for the exact salary question you are trying
                to answer, from take-home checks to salary comparison, reverse
                planning, and payslip interpretation.
              </motion.p>

              <motion.div
                className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
                variants={sectionVariants}
              >
                {tools.map((tool) => (
                  <ToolCard key={tool.href} title={tool.title} href={tool.href} />
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="relative mt-14 overflow-hidden rounded-[34px] border px-5 py-8 sm:px-8 sm:py-10"
            style={{
              borderColor: "var(--line)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--card-strong) 96%, white 4%), var(--card-strong))",
              boxShadow:
                "0 24px 60px -38px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute left-[10%] top-[10%] h-28 w-28 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.08), transparent 72%)",
                }}
                animate={{ x: [0, 12, 0], y: [0, 10, 0] }}
                transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[8%] bottom-[8%] h-32 w-32 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.07), transparent 72%)",
                }}
                animate={{ x: [0, -14, 0], y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  maskImage:
                    "radial-gradient(circle at center, black 42%, transparent 90%)",
                }}
              />
            </div>

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