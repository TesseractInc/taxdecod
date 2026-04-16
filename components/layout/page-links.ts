import {
  BadgePoundSterling,
  BriefcaseBusiness,
  Calculator,
  ContactRound,
  FileText,
  Gauge,
  LayoutGrid,
  RefreshCcw,
  Scale,
  SearchCheck,
  Trophy,
  Wallet,
} from "lucide-react";

export type HeaderIconKey =
  | "calculator"
  | "payslip"
  | "refund"
  | "compare"
  | "leaderboard"
  | "tools"
  | "reality"
  | "methodology"
  | "services"
  | "contact"
  | "salaryhub"
  | "reverse"
  | "benchmark"
  | "hourly"
  | "monthly";

export type HeaderPreviewLink = {
  label: string;
  href: string;
  description: string;
  icon: HeaderIconKey;
  badge?: string;
};

export type HeaderPreviewGroup = {
  label: string;
  title: string;
  href: string;
  featured: HeaderPreviewLink;
  links: HeaderPreviewLink[];
};

export const primaryNavLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Compare", href: "/compare-salary" },
  { label: "Salary Hub", href: "/salary-hub" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "More", href: "/salary-tools" },
];

export const headerPreviewGroups: HeaderPreviewGroup[] = [
  {
    label: "Calculator",
    title: "Main salary routes",
    href: "/calculator",
    featured: {
      label: "Salary calculator",
      href: "/calculator",
      description:
        "Use this when you want the clearest reading of one salary after tax and deductions.",
      icon: "calculator",
      badge: "Core",
    },
    links: [
      {
        label: "Payslip checker",
        href: "/payslip-checker",
        description:
          "Check whether year-to-date Income Tax and NI look broadly on track.",
        icon: "payslip",
      },
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description:
          "Estimate whether Income Tax paid looks high, low, or broadly aligned.",
        icon: "refund",
      },
      {
        label: "Tax code decoder",
        href: "/tax-code-decoder",
        description:
          "Decode common PAYE tax codes in plain English before guessing at deductions.",
        icon: "methodology",
      },
    ],
  },
  {
    label: "Compare",
    title: "Decision tools",
    href: "/compare-salary",
    featured: {
      label: "Compare two salaries",
      href: "/compare-salary",
      description:
        "Use this when you need to know whether a raise or new offer really improves monthly life.",
      icon: "compare",
      badge: "Decision",
    },
    links: [
      {
        label: "Reverse from take-home",
        href: "/reverse-tax",
        description:
          "Start from a monthly target and work backwards to the gross salary needed.",
        icon: "reverse",
      },
      {
        label: "Reality check",
        href: "/reality-check",
        description:
          "Use this when you want to frame salary against real monthly pressure.",
        icon: "reality",
      },
      {
        label: "Leaderboard",
        href: "/leaderboard",
        description:
          "Browse stronger and weaker salary routes in a more comparative format.",
        icon: "leaderboard",
      },
    ],
  },
  {
    label: "Salary Hub",
    title: "Salary exploration",
    href: "/salary-hub",
    featured: {
      label: "Salary hub",
      href: "/salary-hub",
      description:
        "Browse salary bands, monthly targets, Scotland routes, and supporting pages quickly.",
      icon: "salaryhub",
      badge: "Explore",
    },
    links: [
      {
        label: "Monthly take-home routes",
        href: "/monthly-take-home/2500",
        description:
          "Start from a monthly amount you want to keep and explore nearby targets.",
        icon: "monthly",
      },
      {
        label: "Hourly salary routes",
        href: "/hourly/15",
        description:
          "Explore hourly-rate conversions and salary context more quickly.",
        icon: "hourly",
      },
      {
        label: "Salary pages",
        href: "/salary-pages",
        description:
          "Move through common salary lookups and after-tax routes with less friction.",
        icon: "salaryhub",
      },
    ],
  },
  {
    label: "Benchmarks",
    title: "Role and city context",
    href: "/benchmarks",
    featured: {
      label: "Salary benchmarks",
      href: "/benchmarks",
      description:
        "Use this when the real question is whether a salary is weak, typical, or strong in market context.",
      icon: "benchmark",
      badge: "Context",
    },
    links: [
      {
        label: "Browse by role",
        href: "/benchmarks/roles",
        description:
          "Start with the job family first, then move into city or region context.",
        icon: "benchmark",
      },
      {
        label: "Browse by region",
        href: "/benchmarks/regions",
        description:
          "Start with the city or region first, then inspect the available roles.",
        icon: "benchmark",
      },
      {
        label: "Good salary routes",
        href: "/good-salary/40000/london",
        description:
          "Judge whether a salary looks strong or weak in a given local context.",
        icon: "benchmark",
      },
    ],
  },
  {
    label: "More",
    title: "Specialist tools and platform pages",
    href: "/salary-tools",
    featured: {
      label: "Specialist salary tools",
      href: "/salary-tools",
      description:
        "Move into bonus, overtime, leave pay, student loan, and other salary-adjacent tools.",
        icon: "tools",
        badge: "Specialist",
      },
    links: [
      {
        label: "Student loan calculator",
        href: "/student-loan-calculator",
        description:
          "Estimate how student loan drag changes what salary actually leaves you with.",
        icon: "tools",
      },
      {
        label: "Bonus tax calculator",
        href: "/bonus-tax-calculator",
        description:
          "Estimate how bonus pay is affected by tax pressure and salary context.",
        icon: "tools",
      },
      {
        label: "Overtime calculator",
        href: "/overtime-calculator",
        description:
          "Estimate how overtime affects take-home rather than just gross pay.",
        icon: "tools",
      },
    ],
  },
];

export const quickAccessLinks: HeaderPreviewLink[] = [
  {
    label: "Salary calculator",
    href: "/calculator",
    description:
      "Best first stop when you want a full reading of one salary after deductions.",
    icon: "calculator",
    badge: "Core",
  },
  {
    label: "Compare salary",
    href: "/compare-salary",
    description:
      "Best when you want to compare two salaries after tax rather than at gross level.",
    icon: "compare",
  },
  {
    label: "Reverse salary",
    href: "/reverse-tax",
    description:
      "Best when the monthly amount you want to keep matters more than the headline salary.",
    icon: "reverse",
  },
  {
    label: "Payslip checker",
    href: "/payslip-checker",
    description:
      "Best when you need a first-check reading of PAYE, NI, and year-to-date deductions.",
    icon: "payslip",
  },
  {
    label: "Salary hub",
    href: "/salary-hub",
    description:
      "Best when you want to browse nearby salary bands, routes, and support pages.",
    icon: "salaryhub",
  },
  {
    label: "Benchmarks",
    href: "/benchmarks",
    description:
      "Best when you need market context, not just a take-home number.",
    icon: "benchmark",
  },
];

export const utilityMenuLinks: HeaderPreviewLink[] = [
  {
    label: "Guides",
    href: "/guides",
    description:
      "Read plain-English salary, tax, and payslip guides that add context beyond calculation.",
    icon: "methodology",
    badge: "Read",
  },
  {
    label: "Methodology",
    href: "/methodology",
    description:
      "Understand how TaxDecod approaches salary, deduction, and comparison estimates.",
    icon: "methodology",
  },
  {
    label: "Assumptions",
    href: "/assumptions",
    description:
      "Review the practical assumptions behind salary, payslip, and benchmark pages.",
    icon: "methodology",
  },
  {
    label: "About TaxDecod",
    href: "/about",
    description:
      "Read what TaxDecod is built for, what it is not, and how the platform should be interpreted.",
    icon: "services",
  },
  {
    label: "Services",
    href: "/services",
    description:
      "Explore the broader product and platform direction behind TaxDecod.",
    icon: "services",
  },
  {
    label: "Contact",
    href: "/contact",
    description:
      "Use this for general platform contact and trust-related clarification.",
    icon: "contact",
  },
];