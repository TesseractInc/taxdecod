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
  badge?: string;
  icon: HeaderIconKey;
};

export type HeaderPreviewGroup = {
  label: string;
  href: string;
  title: string;
  featured: HeaderPreviewLink;
  links: HeaderPreviewLink[];
};

export const primaryNavLinks = [
  { label: "Calculator", href: "/calculator" },
  { label: "Compare", href: "/compare-salary" },
  { label: "Reverse", href: "/reverse-tax" },
  { label: "Salary Hub", href: "/salary-hub" },
  { label: "Benchmarks", href: "/benchmarks" },
];

export const headerPreviewGroups: HeaderPreviewGroup[] = [
  {
    label: "Calculator",
    href: "/calculator",
    title: "Start from gross salary",
    featured: {
      label: "Main calculator",
      href: "/calculator",
      description: "Annual and monthly take-home pay.",
      badge: "Core",
      icon: "calculator",
    },
    links: [
      {
        label: "Compare salaries",
        href: "/compare-salary",
        description: "Check offer changes properly.",
        icon: "compare",
      },
      {
        label: "Reverse salary tool",
        href: "/reverse-tax",
        description: "Work back from target take-home.",
        badge: "Planning",
        icon: "reverse",
      },
      {
        label: "Salary hub",
        href: "/salary-hub",
        description: "Browse common salary routes.",
        icon: "salaryhub",
      },
    ],
  },
  {
    label: "Compare",
    href: "/compare-salary",
    title: "Judge salary jumps properly",
    featured: {
      label: "Salary comparison",
      href: "/compare-salary",
      description: "See whether a raise really improves monthly life.",
      badge: "Decision",
      icon: "compare",
    },
    links: [
      {
        label: "Reverse from monthly target",
        href: "/reverse-tax",
        description: "Work backwards from the number you want to keep.",
        icon: "reverse",
      },
      {
        label: "Monthly target pages",
        href: "/monthly-take-home/2500",
        description: "Jump into common take-home targets.",
        icon: "monthly",
      },
      {
        label: "Hourly routes",
        href: "/hourly/15",
        description: "Translate hourly pay into real take-home.",
        icon: "hourly",
      },
    ],
  },
  {
    label: "Salary Hub",
    href: "/salary-hub",
    title: "Browse salary routes by intent",
    featured: {
      label: "Salary hub",
      href: "/salary-hub",
      description: "Move between salary, hourly, monthly, and benchmark entry points.",
      badge: "Hub",
      icon: "salaryhub",
    },
    links: [
      {
        label: "£15 an hour after tax",
        href: "/hourly/15",
        description: "One of the strongest hourly entry routes.",
        icon: "hourly",
      },
      {
        label: "What salary gives £2,500/month?",
        href: "/monthly-take-home/2500",
        description: "Strong reverse-intent page.",
        icon: "monthly",
      },
      {
        label: "Compare salaries",
        href: "/compare-salary",
        description: "Continue from lookup into decision mode.",
        icon: "compare",
      },
    ],
  },
  {
    label: "Benchmarks",
    href: "/benchmarks",
    title: "Add role and city context",
    featured: {
      label: "Benchmarks hub",
      href: "/benchmarks",
      description: "Use role and city salary context before checking take-home.",
      badge: "Context",
      icon: "benchmark",
    },
    links: [
      {
        label: "Software Engineer salary London",
        href: "/benchmarks/software-engineer/london",
        description: "Role + city benchmark page.",
        icon: "benchmark",
      },
      {
        label: "Is 40k a good salary in Manchester?",
        href: "/good-salary/40000/manchester",
        description: "City-intent salary judgment route.",
        icon: "benchmark",
      },
      {
        label: "Open the main calculator",
        href: "/calculator",
        description: "Move from benchmark context into after-tax numbers.",
        icon: "calculator",
      },
    ],
  },
  {
    label: "More",
    href: "/salary-tools",
    title: "Payslip, refund, and support routes",
    featured: {
      label: "Salary tools",
      href: "/salary-tools",
      description: "Go beyond salary reading into verification and support tools.",
      badge: "Toolset",
      icon: "tools",
    },
    links: [
      {
        label: "Payslip checker",
        href: "/payslip-checker",
        description: "Check payroll deductions and year-to-date values.",
        icon: "payslip",
      },
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description: "Sense-check whether tax may have been over-collected.",
        icon: "refund",
      },
      {
        label: "Methodology",
        href: "/methodology",
        description: "Understand how TaxDecod frames salary results.",
        icon: "methodology",
      },
    ],
  },
];

export const quickAccessLinks: HeaderPreviewLink[] = [
  {
    label: "Main calculator",
    href: "/calculator",
    description: "Best first stop.",
    badge: "Start",
    icon: "calculator",
  },
  {
    label: "Compare salaries",
    href: "/compare-salary",
    description: "Best for raise and offer decisions.",
    badge: "Decision",
    icon: "compare",
  },
  {
    label: "Reverse salary tool",
    href: "/reverse-tax",
    description: "Best for monthly-target planning.",
    badge: "Planning",
    icon: "reverse",
  },
  {
    label: "Salary hub",
    href: "/salary-hub",
    description: "Browse salary routes by intent.",
    icon: "salaryhub",
  },
  {
    label: "Benchmarks hub",
    href: "/benchmarks",
    description: "Add role and city context.",
    icon: "benchmark",
  },
  {
    label: "Payslip checker",
    href: "/payslip-checker",
    description: "Check payroll deductions.",
    icon: "payslip",
  },
];

export const utilityMenuLinks: HeaderPreviewLink[] = [
  {
    label: "Methodology",
    href: "/methodology",
    description: "How TaxDecod frames salary logic.",
    icon: "methodology",
  },
  {
    label: "Services",
    href: "/services",
    description: "Business-facing offerings.",
    icon: "services",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Support and commercial routes.",
    icon: "contact",
  },
];