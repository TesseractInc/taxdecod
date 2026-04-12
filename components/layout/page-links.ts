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
  | "reverse";

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
  { label: "Payslip Check", href: "/payslip-checker" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Tools", href: "/salary-tools" },
  { label: "Reality", href: "/reality-check" },
];

export const headerPreviewGroups: HeaderPreviewGroup[] = [
  {
    label: "Calculator",
    href: "/calculator",
    title: "Take-home pay fast",
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
        description: "Check offer changes quickly.",
        icon: "compare",
      },
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description: "Sense-check overpayment.",
        badge: "Core",
        icon: "refund",
      },
      {
        label: "Reverse tax calculator",
        href: "/reverse-tax",
        description: "Work back from take-home pay.",
        icon: "reverse",
      },
    ],
  },
  {
    label: "Payslip Check",
    href: "/payslip-checker",
    title: "Read payroll properly",
    featured: {
      label: "Payslip checker",
      href: "/payslip-checker",
      description: "Check tax, NI, pension, and YTD.",
      badge: "Core",
      icon: "payslip",
    },
    links: [
      {
        label: "Payslip explained",
        href: "/payslip-explained",
        description: "Understand the main labels.",
        icon: "payslip",
      },
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description: "Useful when payroll looks off.",
        icon: "refund",
      },
      {
        label: "Salary tools",
        href: "/salary-tools",
        description: "Go deeper into scenarios.",
        icon: "tools",
      },
    ],
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    title: "See salary in context",
    featured: {
      label: "Salary leaderboard",
      href: "/leaderboard",
      description: "See where a salary sits.",
      badge: "Insight",
      icon: "leaderboard",
    },
    links: [
      {
        label: "Reality check",
        href: "/reality-check",
        description: "Move into monthly reality.",
        icon: "reality",
      },
      {
        label: "Compare salaries",
        href: "/compare-salary",
        description: "Judge two salaries side by side.",
        icon: "compare",
      },
      {
        label: "Salary hub",
        href: "/salary-hub",
        description: "Browse common salary pages.",
        icon: "salaryhub",
      },
    ],
  },
  {
    label: "Tools",
    href: "/salary-tools",
    title: "Focused salary tools",
    featured: {
      label: "Salary tools",
      href: "/salary-tools",
      description: "Raise, bonus, refund, and reverse tools.",
      badge: "Toolset",
      icon: "tools",
    },
    links: [
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description: "Check likely refund direction.",
        badge: "Core",
        icon: "refund",
      },
      {
        label: "Compare salaries",
        href: "/compare-salary",
        description: "Useful for pay decisions.",
        icon: "compare",
      },
      {
        label: "Reality check",
        href: "/reality-check",
        description: "See practical monthly impact.",
        icon: "reality",
      },
    ],
  },
  {
    label: "Reality",
    href: "/reality-check",
    title: "Beyond the headline number",
    featured: {
      label: "Reality check",
      href: "/reality-check",
      description: "Understand monthly reality after deductions.",
      badge: "Guide",
      icon: "reality",
    },
    links: [
      {
        label: "Main calculator",
        href: "/calculator",
        description: "Start with clean take-home numbers.",
        icon: "calculator",
      },
      {
        label: "Salary leaderboard",
        href: "/leaderboard",
        description: "Add broader salary context.",
        icon: "leaderboard",
      },
      {
        label: "Tax refund calculator",
        href: "/tax-refund-calculator",
        description: "Check if payroll over-collected.",
        icon: "refund",
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
    label: "Payslip checker",
    href: "/payslip-checker",
    description: "Check payroll deductions.",
    badge: "Core",
    icon: "payslip",
  },
  {
    label: "Tax refund calculator",
    href: "/tax-refund-calculator",
    description: "Check possible overpayment.",
    badge: "Core",
    icon: "refund",
  },
  {
    label: "Compare salaries",
    href: "/compare-salary",
    description: "Useful for offer decisions.",
    icon: "compare",
  },
  {
    label: "Salary tools",
    href: "/salary-tools",
    description: "More focused calculators.",
    icon: "tools",
  },
  {
    label: "Reality check",
    href: "/reality-check",
    description: "See practical monthly impact.",
    icon: "reality",
  },
];

export const utilityMenuLinks: HeaderPreviewLink[] = [
  {
    label: "Methodology",
    href: "/methodology",
    description: "How calculations work.",
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
    description: "Support and partnerships.",
    icon: "contact",
  },
  {
    label: "Salary hub",
    href: "/salary-hub",
    description: "Popular salary pages.",
    icon: "salaryhub",
  },
];