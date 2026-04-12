type LinkItem = {
  label: string;
  href: string;
};

function dedupeLinks(items: LinkItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

function formatSalaryLabel(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

function toMonthlyTargetFromSalary(salary: number) {
  if (salary <= 25000) return 1800;
  if (salary <= 30000) return 2000;
  if (salary <= 40000) return 2500;
  if (salary <= 50000) return 3000;
  if (salary <= 70000) return 3500;
  return 4000;
}

export function getRelatedSalaryLinks(salary: number): LinkItem[] {
  const suggestions = [
    salary - 10000,
    salary - 5000,
    salary - 2500,
    salary + 2500,
    salary + 5000,
    salary + 10000,
    salary + 20000,
  ].filter((value) => value >= 18000);

  return dedupeLinks(
    suggestions.map((value) => ({
      label: `${formatSalaryLabel(value)} after tax in the UK`,
      href: `/${value}-after-tax-uk`,
    }))
  ).slice(0, 6);
}

export function getVariantLinks(salary: number): LinkItem[] {
  const monthlyTarget = toMonthlyTargetFromSalary(salary);

  return dedupeLinks([
    {
      label: `${formatSalaryLabel(salary)} after tax monthly`,
      href: `/${salary}-after-tax-monthly`,
    },
    {
      label: `${formatSalaryLabel(salary)} after tax with student loan`,
      href: `/${salary}-after-tax-with-student-loan`,
    },
    {
      label: `${formatSalaryLabel(salary)} after tax in Scotland`,
      href: `/${salary}-after-tax-scotland`,
    },
    {
      label: `What salary gives ${formatSalaryLabel(monthlyTarget)} per month?`,
      href: `/take-home-${monthlyTarget}-month-uk`,
    },
    {
      label: `Compare ${formatSalaryLabel(salary)} with another salary`,
      href: "/compare-salary",
    },
    {
      label: "Use the full UK salary calculator",
      href: "/calculator",
    },
    {
      label: "Explore the salary hub",
      href: "/salary-hub",
    },
  ]);
}

export function getDecisionLinks(salary: number): LinkItem[] {
  const higherSalary =
    salary < 30000
      ? salary + 5000
      : salary < 60000
      ? salary + 10000
      : salary + 20000;

  const monthlyTarget = toMonthlyTargetFromSalary(salary);

  return dedupeLinks([
    {
      label: `Compare ${formatSalaryLabel(salary)} vs ${formatSalaryLabel(
        higherSalary
      )}`,
      href: `/compare/${salary}-vs-${higherSalary}`,
    },
    {
      label: `Find the salary behind ${formatSalaryLabel(monthlyTarget)} monthly take-home`,
      href: `/take-home-${monthlyTarget}-month-uk`,
    },
    {
      label: "Compare salary outcomes interactively",
      href: "/compare-salary",
    },
    {
      label: "Reverse from a target monthly income",
      href: "/reverse-tax",
    },
  ]);
}

export function getSalaryIntentLinks(salary: number): LinkItem[] {
  const labels =
    salary < 30000
      ? [
          "Is this salary enough for monthly essentials?",
          "How much better is the next salary band?",
          "What monthly take-home should I target?",
        ]
      : salary < 50000
      ? [
          "Is this a strong mid-range UK salary?",
          "Does a raise meaningfully change monthly life?",
          "What salary gets me to the next monthly level?",
        ]
      : [
          "How much of a higher salary do I really keep?",
          "Does this salary meaningfully improve take-home pay?",
          "What target monthly income should I reverse from next?",
        ];

  const monthlyTarget = toMonthlyTargetFromSalary(salary);

  return dedupeLinks([
    {
      label: labels[0],
      href: `/${salary}-after-tax-uk`,
    },
    {
      label: labels[1],
      href: "/compare-salary",
    },
    {
      label: labels[2],
      href: `/take-home-${monthlyTarget}-month-uk`,
    },
    {
      label: "Decode a payslip in plain English",
      href: "/payslip-explained",
    },
  ]);
}