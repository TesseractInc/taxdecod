"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  BadgePoundSterling,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Code2,
  ContactRound,
  FileCheck2,
  FileText,
  Gauge,
  GraduationCap,
  Landmark,
  LayoutGrid,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  PiggyBank,
  ReceiptText,
  RefreshCcw,
  Scale,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User2,
  X,
} from "lucide-react";

import Container from "../ui/container";
import ThemeToggle from "../ui/theme-toggle";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";

type HeaderLink = {
  label: string;
  href: string;
  description: string;
  badge?: string;
  icon: ComponentType<{ className?: string }>;
};

type HeaderSection = {
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  featured: HeaderLink;
  links: HeaderLink[];
};

const headerSections: HeaderSection[] = [
  {
    label: "Calculate",
    href: "/calculator",
    eyebrow: "Core tools",
    title: "Start with your real take-home number.",
    description:
      "Salary, student loan, overtime, bonus, and sacrifice calculators for first-check clarity.",
    icon: Calculator,
    featured: {
      label: "Salary calculator",
      href: "/calculator",
      description:
        "Estimate annual and monthly take-home pay after UK salary deductions.",
      badge: "Start",
      icon: Calculator,
    },
    links: [
      {
        label: "Student loan",
        href: "/student-loan-calculator",
        description:
          "Check how Plan 1, 2, 4, 5, or postgraduate loans affect pay.",
        badge: "Deduction",
        icon: GraduationCap,
      },
      {
        label: "Bonus tax",
        href: "/bonus-tax-calculator",
        description: "Understand how a bonus can change monthly deductions.",
        badge: "Scenario",
        icon: Banknote,
      },
      {
        label: "Overtime",
        href: "/overtime-calculator",
        description: "Estimate extra pay after tax and National Insurance.",
        badge: "Extra pay",
        icon: TrendingUp,
      },
      {
        label: "Salary sacrifice",
        href: "/salary-sacrifice-calculator",
        description: "Explore pension sacrifice and deduction effects.",
        badge: "Pension",
        icon: PiggyBank,
      },
    ],
  },
  {
    label: "Decide",
    href: "/compare-salary",
    eyebrow: "Decision tools",
    title: "Turn salary numbers into decisions.",
    description:
      "Compare offers, reverse-plan income targets, and understand if a raise is actually worth it.",
    icon: Scale,
    featured: {
      label: "Compare salaries",
      href: "/compare-salary",
      description:
        "Compare two salaries by the real monthly difference after deductions.",
      badge: "Offer",
      icon: Scale,
    },
    links: [
      {
        label: "Reverse salary",
        href: "/reverse-tax",
        description: "Work backwards from the monthly amount you want to keep.",
        badge: "Target",
        icon: Target,
      },
      {
        label: "Salary hub",
        href: "/salary-hub",
        description: "Browse core salary after-tax routes and salary bands.",
        badge: "Hub",
        icon: Gauge,
      },
      {
        label: "Benchmarks",
        href: "/benchmarks",
        description: "Explore role and region salary context.",
        badge: "Context",
        icon: BriefcaseBusiness,
      },
      {
        label: "£100k tax trap",
        href: "/100k-tax-trap",
        description: "Understand one of the UK’s most confusing salary zones.",
        badge: "Guide",
        icon: BadgePoundSterling,
      },
    ],
  },
  {
    label: "Check",
    href: "/payslip-checker",
    eyebrow: "Payslip and payroll clarity",
    title: "Check what payroll is doing to your money.",
    description:
      "Use payslip, tax code, refund, and deduction routes when the real-world numbers look wrong.",
    icon: ReceiptText,
    featured: {
      label: "Payslip checker",
      href: "/payslip-checker",
      description:
        "Check whether PAYE, NI, and year-to-date deductions broadly look right.",
      badge: "YTD",
      icon: ReceiptText,
    },
    links: [
      {
        label: "Tax code decoder",
        href: "/tax-code-decoder",
        description: "Understand tax code patterns in plain English.",
        badge: "PAYE",
        icon: Code2,
      },
      {
        label: "Tax refund",
        href: "/tax-refund-calculator",
        description: "Check possible overpayment or refund signals.",
        badge: "Refund",
        icon: RefreshCcw,
      },
      {
        label: "Payslip explained",
        href: "/payslip-explained",
        description: "Learn what each payslip line is usually trying to show.",
        badge: "Learn",
        icon: FileText,
      },
      {
        label: "Leave pay",
        href: "/leave-pay",
        description:
          "Explore sick, maternity, paternity, and holiday pay routes.",
        badge: "Leave",
        icon: FileCheck2,
      },
    ],
  },
  {
    label: "Learn",
    href: "/guides",
    eyebrow: "Guides and trust",
    title: "Understand the rules behind the result.",
    description:
      "Editorial guides, assumptions, methodology, and trust pages for credibility and clarity.",
    icon: BookOpen,
    featured: {
      label: "Guides",
      href: "/guides",
      description:
        "Plain-English guides for salary, tax, take-home pay, and payslips.",
      badge: "Editorial",
      icon: BookOpen,
    },
    links: [
      {
        label: "Methodology",
        href: "/methodology",
        description: "How TaxDecod frames estimates and assumptions.",
        badge: "Trust",
        icon: SearchCheck,
      },
      {
        label: "Assumptions",
        href: "/assumptions",
        description: "Read the current tax-year assumptions behind the tools.",
        badge: "Rules",
        icon: Landmark,
      },
      {
        label: "Disclaimer",
        href: "/disclaimer",
        description: "Important limitations: estimates, not financial advice.",
        badge: "Legal",
        icon: ShieldCheck,
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Questions, corrections, or site feedback.",
        badge: "Support",
        icon: ContactRound,
      },
    ],
  },
];

const quickLaunch: HeaderLink[] = [
  headerSections[0].featured,
  headerSections[1].featured,
  headerSections[2].featured,
  headerSections[0].links[0],
  headerSections[2].links[1],
  headerSections[3].featured,
  {
    label: "All tools",
    href: "/salary-tools",
    description: "Open the full TaxDecod tool directory.",
    badge: "Index",
    icon: LayoutGrid,
  },
  {
    label: "Services",
    href: "/services",
    description: "Explore TaxDecod platform services and future offerings.",
    badge: "Platform",
    icon: BriefcaseBusiness,
  },
];

const supportLinks: HeaderLink[] = [
  {
    label: "Contact",
    href: "/contact",
    description: "Send corrections, feedback, or questions.",
    badge: "Support",
    icon: ContactRound,
  },
  {
    label: "About",
    href: "/about",
    description: "Learn what TaxDecod is built to do.",
    badge: "Company",
    icon: CircleHelp,
  },
  {
    label: "Privacy",
    href: "/privacy-policy",
    description: "How privacy and data handling are explained.",
    badge: "Privacy",
    icon: ShieldCheck,
  },
  {
    label: "Terms",
    href: "/terms",
    description: "Terms and conditions for using the platform.",
    badge: "Legal",
    icon: FileText,
  },
];

function PremiumLogo() {
  return (
    <div className="relative grid h-12 w-12 shrink-0 place-items-center">
      <div className="absolute inset-0 rounded-[20px] bg-slate-200/80 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.55)] dark:bg-white/10" />
      <div className="absolute inset-[3px] rounded-[18px] bg-white dark:bg-[#071014]" />
      <div className="absolute inset-[7px] rounded-[15px] bg-[radial-gradient(circle_at_28%_22%,rgba(34,211,238,0.26),transparent_34%),linear-gradient(145deg,#020617,#111827)] dark:bg-[radial-gradient(circle_at_28%_22%,rgba(34,211,238,0.22),transparent_34%),linear-gradient(145deg,#111827,#020617)]" />
      <BadgePoundSterling className="relative z-10 h-5 w-5 text-white" />
    </div>
  );
}

function ToolTile({
  item,
  onNavigate,
  compact = false,
}: {
  item: HeaderLink;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white/78 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-cyan-300/25 ${
        compact ? "p-3.5" : "p-4"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_100%_16%,rgba(99,102,241,0.14),transparent_36%)]" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[17px] bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950">
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
              {item.label}
            </p>
            {item.badge ? (
              <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:inline-flex">
                {item.badge}
              </span>
            ) : null}
          </div>

          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
            {item.description}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-600 dark:text-slate-500 dark:group-hover:text-cyan-300" />
      </div>
    </Link>
  );
}

function SectionDropdown({
  section,
  onNavigate,
  onEnter,
  onLeave,
}: {
  section: HeaderSection;
  onNavigate: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const FeaturedIcon = section.featured.icon;
  const SectionIcon = section.icon;

  return (
    <motion.div
      key={section.label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 top-[86px] z-[95] hidden w-[min(1040px,calc(100vw-48px))] -translate-x-1/2 xl:block"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/90 p-4 shadow-[0_34px_140px_-62px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071014]/94">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_92%_10%,rgba(99,102,241,0.12),transparent_34%)]" />

        <div className="relative z-10 grid gap-4 lg:grid-cols-[0.76fr_1.24fr]">
          <Link
            href={section.featured.href}
            onClick={onNavigate}
            className="group relative overflow-hidden rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_32px_100px_-60px_rgba(15,23,42,0.95)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_100%_18%,rgba(99,102,241,0.26),transparent_34%)]" />
            <motion.div
              className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full border border-cyan-300/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-[18px] bg-white text-slate-950">
                  <FeaturedIcon className="h-5 w-5" />
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10">
                  <SectionIcon className="h-4.5 w-4.5 text-cyan-200" />
                </div>
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                {section.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {section.featured.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {section.featured.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition group-hover:-translate-y-0.5">
                Open
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          <div>
            <div className="flex items-end justify-between gap-4 px-1">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  {section.label}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {section.title}
                </h3>
              </div>

              <Link
                href={section.href}
                onClick={onNavigate}
                className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950 sm:inline-flex"
              >
                Open hub
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {section.links.map((link) => (
                <ToolTile
                  key={link.href + link.label}
                  item={link}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExplorePanel({
  onNavigate,
  onEnter,
  onLeave,
}: {
  onNavigate: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 top-[86px] z-[95] hidden w-[min(1120px,calc(100vw-48px))] -translate-x-1/2 xl:block"
    >
      <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/90 p-4 shadow-[0_34px_140px_-62px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071014]/94">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_92%_10%,rgba(99,102,241,0.12),transparent_34%)]" />

        <div className="relative z-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                TaxDecod command menu
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Everything important, one click away.
              </h3>
            </div>

            <Link
              href="/salary-tools"
              onClick={onNavigate}
              className="inline-flex min-h-10 items-center rounded-full bg-slate-950 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
            >
              Full tool index
            </Link>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="grid gap-3 md:grid-cols-2">
              {quickLaunch.map((link) => (
                <ToolTile
                  key={link.href + link.label}
                  item={link}
                  onNavigate={onNavigate}
                />
              ))}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Support and trust
              </p>
              <div className="mt-4 grid gap-3">
                {supportLinks.map((link) => (
                  <ToolTile
                    key={link.href + link.label}
                    item={link}
                    onNavigate={onNavigate}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AccountPanel({
  configured,
  signedIn,
  email,
  loginEmail,
  setLoginEmail,
  ready,
  status,
  notice,
  clearNotice,
  handleSendLink,
  signOut,
}: {
  configured: boolean;
  signedIn: boolean;
  email: string | null;
  loginEmail: string;
  setLoginEmail: (value: string) => void;
  ready: boolean;
  status: string;
  notice: string | null;
  clearNotice: () => void;
  handleSendLink: () => Promise<void>;
  signOut: () => Promise<void>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute right-6 top-[86px] z-[96] w-[min(420px,calc(100vw-32px))] overflow-hidden rounded-[30px] border border-slate-200 bg-white/92 p-4 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071014]/94"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-[17px] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          {signedIn ? <User2 className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
        </div>

        <div>
          <p className="text-sm font-bold text-slate-950 dark:text-white">
            {signedIn ? "Account active" : "Login to TaxDecod"}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {signedIn
              ? email
              : configured
                ? "Use a magic link to save scenarios and return later."
                : "Account saving is not active yet. You can still use all public tools."}
          </p>
        </div>
      </div>

      {signedIn ? (
        <div className="mt-4 grid gap-2">
          <Link
            href="/calculator"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            Open calculator
          </Link>

          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-slate-950 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </div>
      ) : configured ? (
        <div className="mt-4 grid gap-2">
          <input
            type="email"
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
              clearNotice();
            }}
            placeholder="you@example.com"
            className="min-h-[48px] rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={() => void handleSendLink()}
            disabled={!ready || status === "sending-link"}
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
          >
            {status === "sending-link" ? "Sending..." : "Send magic link"}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          <Link
            href="/calculator"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            Continue to calculator
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-slate-950 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
          >
            Contact support
          </Link>
        </div>
      )}

      {notice ? (
        <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
          {notice}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  const dropdownCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    configured,
    ready,
    email,
    user,
    status,
    notice,
    sendMagicLink,
    signOut,
    clearNotice,
  } = useSupabaseAuth();

  const signedIn = Boolean(user);

  const currentSection = useMemo(
    () => headerSections.find((section) => section.label === activeSection) ?? null,
    [activeSection],
  );

  useEffect(() => {
    if (email) setLoginEmail(email);
  }, [email]);

  useEffect(() => {
    setActiveSection(null);
    setExploreOpen(false);
    setAccountOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownCloseTimer.current) {
        clearTimeout(dropdownCloseTimer.current);
      }
    };
  }, []);

  function clearDropdownCloseTimer() {
    if (dropdownCloseTimer.current) {
      clearTimeout(dropdownCloseTimer.current);
      dropdownCloseTimer.current = null;
    }
  }

  function scheduleDropdownClose() {
    clearDropdownCloseTimer();

    dropdownCloseTimer.current = setTimeout(() => {
      setActiveSection(null);
      setExploreOpen(false);
    }, 1000);
  }

  function openSectionDropdown(sectionLabel: string) {
    clearDropdownCloseTimer();
    setExploreOpen(false);
    setAccountOpen(false);
    setActiveSection(sectionLabel);
  }

  function openExploreDropdown() {
    clearDropdownCloseTimer();
    setActiveSection(null);
    setAccountOpen(false);
    setMobileOpen(false);
    setExploreOpen(true);
  }

  async function handleSendLink() {
    await sendMagicLink(loginEmail);
  }

  function closePanels() {
    clearDropdownCloseTimer();
    setActiveSection(null);
    setExploreOpen(false);
    setAccountOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-[95]">
      <div className="pt-3">
        <Container>
          <div
            className={`relative rounded-full border px-3 transition-all duration-300 ${
              scrolled
                ? "border-slate-200 bg-white/84 shadow-[0_18px_70px_-42px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071014]/84"
                : "border-slate-200/70 bg-white/58 backdrop-blur-xl dark:border-white/10 dark:bg-[#071014]/58"
            }`}
          >
            <div className="flex h-[66px] items-center justify-between gap-3">
              <Link
                href="/"
                onClick={closePanels}
                className="flex min-w-0 items-center gap-3"
                aria-label="TaxDecod home"
              >
                <PremiumLogo />
                <span className="hidden text-lg font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:block">
                  TaxDecod
                </span>
              </Link>

              <nav className="hidden items-center gap-1 xl:flex">
                {headerSections.map((section) => {
                  const active =
                    activeSection === section.label ||
                    pathname === section.href ||
                    pathname?.startsWith(`${section.href}/`);

                  return (
                    <button
                      key={section.label}
                      type="button"
                      onMouseEnter={() => openSectionDropdown(section.label)}
                      onMouseLeave={scheduleDropdownClose}
                      onClick={() => {
                        clearDropdownCloseTimer();
                        setExploreOpen(false);
                        setAccountOpen(false);
                        setActiveSection((current) =>
                          current === section.label ? null : section.label,
                        );
                      }}
                      className={`relative inline-flex min-h-[42px] items-center gap-1.5 rounded-full px-4 text-sm font-bold transition ${
                        active
                          ? "text-slate-950 dark:text-white"
                          : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="premium-header-active-section"
                          className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/[0.08]"
                          transition={{ duration: 0.22 }}
                        />
                      ) : null}

                      <span className="relative z-10">{section.label}</span>
                      <ChevronDown
                        className={`relative z-10 h-3.5 w-3.5 transition ${
                          activeSection === section.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseEnter={openExploreDropdown}
                  onMouseLeave={scheduleDropdownClose}
                  onClick={() => {
                    clearDropdownCloseTimer();
                    setActiveSection(null);
                    setAccountOpen(false);
                    setMobileOpen(false);
                    setExploreOpen((value) => !value);
                  }}
                  className="hidden min-h-[42px] items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-bold text-white shadow-[0_16px_44px_-30px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950 xl:inline-flex"
                >
                  <Sparkles className="h-4 w-4" />
                  Explore
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearDropdownCloseTimer();
                    setActiveSection(null);
                    setExploreOpen(false);
                    setMobileOpen(false);
                    setAccountOpen((value) => !value);
                  }}
                  className="hidden min-h-[42px] items-center gap-2 rounded-full border border-slate-200 bg-white/76 px-4 text-sm font-bold text-slate-950 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:text-white lg:inline-flex"
                  aria-label={signedIn ? "Open account" : "Login"}
                >
                  {signedIn ? (
                    <User2 className="h-4 w-4" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  <span>{signedIn ? "Account" : "Login"}</span>
                </button>

                <ThemeToggle compact />

                <button
                  type="button"
                  onClick={() => {
                    clearDropdownCloseTimer();
                    setActiveSection(null);
                    setExploreOpen(false);
                    setAccountOpen(false);
                    setMobileOpen((value) => !value);
                  }}
                  className="grid h-[42px] w-[42px] place-items-center rounded-full border border-slate-200 bg-white/76 text-slate-950 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:text-white xl:hidden"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {currentSection ? (
          <SectionDropdown
            section={currentSection}
            onNavigate={closePanels}
            onEnter={clearDropdownCloseTimer}
            onLeave={scheduleDropdownClose}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {exploreOpen ? (
          <ExplorePanel
            onNavigate={closePanels}
            onEnter={clearDropdownCloseTimer}
            onLeave={scheduleDropdownClose}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {accountOpen ? (
          <AccountPanel
            configured={configured}
            signedIn={signedIn}
            email={email}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            ready={ready}
            status={status}
            notice={notice}
            clearNotice={clearNotice}
            handleSendLink={handleSendLink}
            signOut={signOut}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[86px] z-[95] xl:hidden"
          >
            <Container>
              <div className="max-h-[calc(100vh-110px)] overflow-y-auto rounded-[30px] border border-slate-200 bg-white/92 p-4 shadow-[0_34px_120px_-70px_rgba(15,23,42,0.55)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071014]/94">
                <div className="grid gap-3">
                  {headerSections.map((section) => {
                    const SectionIcon = section.icon;

                    return (
                      <div
                        key={section.label}
                        className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        <Link
                          href={section.href}
                          onClick={closePanels}
                          className="flex items-center justify-between gap-3 px-1 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-[16px] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                              <SectionIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-950 dark:text-white">
                                {section.label}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {section.eyebrow}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </Link>

                        <div className="mt-2 grid gap-2">
                          {[section.featured, ...section.links.slice(0, 2)].map(
                            (link) => (
                              <ToolTile
                                key={link.href + link.label}
                                item={link}
                                onNavigate={closePanels}
                                compact
                              />
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {supportLinks.map((link) => (
                    <ToolTile
                      key={link.href + link.label}
                      item={link}
                      onNavigate={closePanels}
                      compact
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAccountOpen(true);
                  }}
                  className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                >
                  {signedIn ? "Open account" : "Login"}
                </button>

                <Link
                  href="/contact"
                  onClick={closePanels}
                  className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-950 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Contact support
                </Link>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}