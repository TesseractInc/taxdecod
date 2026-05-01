"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";

import SiteHeader from "../layout/site-header";
import SiteFooter from "../layout/site-footer";
import Container from "../ui/container";
import CalculatorCard from "../calculator/calculator-card";
import TaxYearTrustBar from "../shared/tax-year-trust-bar";
import HmrcReferencePanel from "../shared/hmrc-reference-panel";

const coreTools = [
  {
    title: "Salary calculator",
    href: "/calculator",
    label: "Start here",
    description: "See annual and monthly take-home pay after core deductions.",
  },
  {
    title: "Compare salaries",
    href: "/compare-salary",
    label: "Offer check",
    description: "Compare two salaries by real monthly difference.",
  },
  {
    title: "Reverse salary",
    href: "/reverse-tax",
    label: "Target income",
    description: "Work backwards from the monthly amount you want to keep.",
  },
  {
    title: "Payslip checker",
    href: "/payslip-checker",
    label: "Reality check",
    description: "Check if tax, NI, and payslip deductions broadly look right.",
  },
  {
    title: "Tax code decoder",
    href: "/tax-code-decoder",
    label: "Payroll clarity",
    description: "Understand common UK tax code patterns in plain English.",
  },
  {
    title: "Student loan",
    href: "/student-loan-calculator",
    label: "Deductions",
    description: "See how student loan plans affect your take-home pay.",
  },
];

const decisionRoutes = [
  {
    title: "I know the gross salary",
    description: "Start with the calculator and see estimated monthly take-home pay.",
    href: "#quick-calculator",
    action: "Calculate now",
  },
  {
    title: "I am comparing two offers",
    description: "Use compare salary to see the real monthly difference after deductions.",
    href: "/compare-salary",
    action: "Compare offers",
  },
  {
    title: "I need a target monthly income",
    description: "Use reverse salary to estimate the gross salary needed.",
    href: "/reverse-tax",
    action: "Reverse calculate",
  },
];

const deductionRows = [
  { label: "Take-home pay", value: "£42,742", width: "71%" },
  { label: "Income Tax", value: "£7,486", width: "42%" },
  { label: "National Insurance", value: "£4,128", width: "29%" },
  { label: "Student Loan", value: "£1,632", width: "18%" },
];

const pulseCards = [
  { label: "Tax code", value: "1257L" },
  { label: "Keep rate", value: "71.3%" },
  { label: "Monthly net", value: "£3,562" },
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
  hidden: { opacity: 0, y: 16, scale: 0.985 },
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

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border bg-white/78 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.45)] backdrop-blur-2xl ${className}`}
      style={{ borderColor: "rgba(15,23,42,0.10)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.11),transparent_32%),radial-gradient(circle_at_100%_12%,rgba(99,102,241,0.10),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function AnimatedTakeHomeGraph() {
  const points = [
    [0, 86],
    [45, 76],
    [90, 78],
    [135, 61],
    [180, 66],
    [225, 50],
    [270, 44],
    [315, 34],
    [360, 27],
  ];

  const path = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  const areaPath = `${path} L 360 112 L 0 112 Z`;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.055] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Net pay signal
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Animated salary clarity view
          </p>
        </div>
        <div className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-bold text-emerald-300">
          +3.2%
        </div>
      </div>

      <svg viewBox="0 0 360 130" className="mt-4 h-36 w-full overflow-visible">
        <defs>
          <linearGradient id="homeGraphLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="55%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>

          <linearGradient id="homeGraphArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[24, 54, 84, 114].map((y) => (
          <line
            key={y}
            x1="0"
            x2="360"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
          />
        ))}

        <motion.path
          d={areaPath}
          fill="url(#homeGraphArea)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        <motion.path
          d={path}
          fill="none"
          stroke="url(#homeGraphLine)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.35, ease: "easeOut" }}
        />

        {points.map(([x, y], index) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="5"
            fill="#DFFBFF"
            stroke="#22D3EE"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.07, duration: 0.35 }}
          />
        ))}

        <motion.circle
          cx="360"
          cy="27"
          r="10"
          fill="#22D3EE"
          opacity="0.18"
          animate={{ scale: [1, 1.7, 1], opacity: [0.18, 0.03, 0.18] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function SmartDashboard() {
  return (
    <GlassCard className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-[28px] bg-[#071014] p-4 text-white shadow-2xl sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_96%_15%,rgba(99,102,241,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />

        <motion.div
          className="pointer-events-none absolute -right-10 top-10 h-56 w-56 rounded-full border border-cyan-300/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-4 top-20 h-32 w-32 rounded-full border border-indigo-300/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Live salary cockpit
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                £42,742
                <span className="ml-2 text-sm font-medium text-slate-400">
                  / year
                </span>
              </h2>
              <p className="mt-1 text-sm text-emerald-300">
                £3,562 monthly estimated take-home
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
              2026/27
            </div>
          </div>

          <div className="mt-5">
            <AnimatedTakeHomeGraph />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {pulseCards.map((card, index) => (
              <motion.div
                key={card.label}
                className="rounded-[20px] border border-white/10 bg-white/[0.055] p-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.08 }}
              >
                <p className="text-[11px] text-slate-400">{card.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-100">
                Deduction engine
              </p>
              <p className="text-xs text-slate-400">PAYE-style estimate</p>
            </div>

            <div className="mt-4 space-y-4">
              {deductionRows.map((row, index) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{row.label}</span>
                    <span className="font-semibold text-slate-100">
                      {row.value}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: row.width }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.9 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function InteractiveToolCard({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}% ${mouseY}%, rgba(34,211,238,0.18), transparent 58%)`;

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={href}
        onMouseMove={handleMove}
        className="group relative block h-full overflow-hidden rounded-[26px] border bg-white/76 p-5 shadow-[0_18px_48px_-38px_rgba(15,23,42,0.35)] backdrop-blur-xl transition hover:-translate-y-1"
        style={{ borderColor: "rgba(15,23,42,0.10)" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-cyan-200/70 bg-cyan-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-800">
              {label}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm text-white transition group-hover:translate-x-1">
              →
            </span>
          </div>

          <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-950">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function MotionSignalPanel() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, 10, 0], opacity: [0.35, 0.58, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[6%] h-64 w-64 rounded-full bg-indigo-400/18 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 14, 0], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[36%] h-52 w-52 rounded-full bg-pink-300/12 blur-3xl"
        animate={{ x: [0, 12, 0], y: [0, -12, 0], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
    </div>
  );
}

export default function HomePageClient() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fc] text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden pb-6 pt-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-16">
        <MotionSignalPanel />

        <Container>
          <motion.div
            className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 shadow-sm backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                UK salary intelligence platform
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl"
              >
                Your salary.
                <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Decoded in motion.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
              >
                A modern UK salary cockpit for take-home pay, offers, payslips,
                tax codes, and deductions — guided clearly, without payroll
                jargon.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="#quick-calculator"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_50px_-26px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5"
                >
                  Start calculating
                  <span className="ml-2">↓</span>
                </Link>

                <Link
                  href="/salary-tools"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-slate-200 bg-white/76 px-6 py-3 text-sm font-bold text-slate-950 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5"
                >
                  Explore tools
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
              >
                {[
                  ["Calculator-first", "tool appears right below"],
                  ["2026/27", "tax-year framing"],
                  ["Dex", "guided tool assistant"],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    className="rounded-2xl border border-slate-200 bg-white/66 px-4 py-3 shadow-sm backdrop-blur-xl"
                  >
                    <p className="text-lg font-semibold text-slate-950">
                      {value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <SmartDashboard />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section
  id="quick-calculator"
  className="relative z-10 px-0 pb-8 pt-4 sm:pb-10 sm:pt-6 lg:pb-12"
>
  <Container>
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className="mx-auto max-w-[1240px]"
    >
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[44px] border border-slate-200 bg-white/78 p-2 shadow-[0_44px_140px_-78px_rgba(15,23,42,0.62)] backdrop-blur-2xl sm:p-3 lg:p-4"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.13),transparent_34%),radial-gradient(circle_at_92%_10%,rgba(99,102,241,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,250,252,0.56))]" />

        <div className="relative z-10 overflow-hidden rounded-[36px] border border-slate-200 bg-slate-950">
          <div className="relative overflow-hidden border-b border-white/10 px-4 py-4 sm:px-5 lg:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_95%_10%,rgba(99,102,241,0.20),transparent_34%)]" />

            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-white text-sm font-black text-slate-950 shadow-lg">
                  £
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    TaxDecod salary console
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Calculate your take-home pay first.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    This is the main action on TaxDecod. Enter a gross salary,
                    then adjust only the settings that apply to you.
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[430px]">
                {[
                  ["1", "Enter salary"],
                  ["2", "Adjust settings"],
                  ["3", "Read result"],
                ].map(([step, label]) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">
                        {step}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#f7f8fc] p-2 sm:p-3 lg:p-4">
            <div className="rounded-[30px] border border-slate-200 bg-white/86 p-2 shadow-[0_30px_100px_-70px_rgba(15,23,42,0.58)] backdrop-blur-2xl sm:p-3">
              <CalculatorCard mode="overview" />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-5 lg:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  After you calculate, choose the next move.
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Compare an offer, reverse-plan a monthly target, or check a
                  payslip against the result.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/compare-salary"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Compare salary
                </Link>

                <Link
                  href="/reverse-tax"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Reverse salary
                </Link>

                <Link
                  href="/payslip-checker"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Check payslip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </Container>
</section>

      <section className="py-6 sm:py-8">
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="rounded-[34px] border border-slate-200 bg-white/72 p-5 shadow-[0_24px_80px_-55px_rgba(15,23,42,0.42)] backdrop-blur-2xl sm:p-7"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                  Choose your path
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Start with the question you actually have
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-slate-600">
                The homepage stays easy to understand. Dex and the tool paths
                guide users into the right place instead of showing everything at
                once.
              </p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="mt-6 grid gap-3 lg:grid-cols-3"
            >
              {decisionRoutes.map((route) => (
                <motion.div key={route.href} variants={itemVariants}>
                  <Link
                    href={route.href}
                    className="group block h-full rounded-[26px] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                  >
                    <h3 className="text-lg font-semibold text-slate-950">
                      {route.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {route.description}
                    </p>
                    <p className="mt-5 inline-flex items-center text-sm font-bold text-cyan-700">
                      {route.action}
                      <span className="ml-2 transition group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
          >
            <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                Tool launcher
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Powerful tools, cleanly organised
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Deeper tools live one click away, where each page can explain one
                job properly.
              </p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {coreTools.map((tool) => (
                <InteractiveToolCard
                  key={tool.href}
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                  label={tool.label}
                />
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <TaxYearTrustBar
              description="Built around current UK tax-year assumptions and designed for salary clarity, planning, and decision support."
              points={[
                "Updated for the 2026/27 UK tax year",
                "Estimate-based outputs, not financial advice",
                "PAYE-style salary interpretation",
                "Transparent assumptions and trust framing",
              ]}
            />

            <HmrcReferencePanel />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}