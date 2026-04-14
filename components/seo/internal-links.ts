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
  if (salary <= 24000) return 1800;
  if (salary <= 30000) return 2000;
  if (salary <= 40000) return 2500;
  if (salary <= 50000) return 3000;
  if (salary <= 70000) return 3500;
  if (salary <= 90000) return 4000;
  return 5000;
}

function getNearbySalaryValues(salary: number) {
  return [
    salary - 10000,
    salary - 5000,
    salary - 2000,
    salary + 2000,
    salary + 5000,
    salary + 10000,
  ].filter((value) => value >= 18000);
}

export function getPrimaryNextAction(salary: number): LinkItem {
  if (salary < 32000) {
    return {
      label: `Find the salary needed for ${formatSalaryLabel(
        toMonthlyTargetFromSalary(salary)
      )} monthly take-home`,
      href: `/take-home-${toMonthlyTargetFromSalary(salary)}-month-uk`,
    };
  }

  if (salary >= 45000 && salary <= 60000) {
    return {
      label: `Compare ${formatSalaryLabel(salary)} against a nearby raise`,
      href: "/compare-salary",
    };
  }

  return {
    label: "Open the full UK salary calculator",
    href: "/calculator",
  };
}

export function getAdjacentScenarioLinks(salary: number): LinkItem[] {
  const nearby = getNearbySalaryValues(salary);

  return dedupeLinks([
    ...nearby.slice(0, 4).map((value) => ({
      label: `${formatSalaryLabel(value)} after tax in the UK`,
      href: `/${value}-after-tax-uk`,
    })),
    {
      label: `${formatSalaryLabel(salary)} after tax monthly`,
      href: `/${salary}-after-tax-monthly`,
    },
    {
      label: `${formatSalaryLabel(salary)} after tax in Scotland`,
      href: `/${salary}-after-tax-scotland`,
    },
    {
      label: `${formatSalaryLabel(salary)} after tax with student loan`,
      href: `/${salary}-after-tax-with-student-loan`,
    },
  ]).slice(0, 4);
}

export function getUnderstandingLinks(salary: number): LinkItem[] {
  const monthlyTarget = toMonthlyTargetFromSalary(salary);

  return dedupeLinks([
    {
      label: "Understand your payslip deductions",
      href: "/payslip-explained",
    },
    {
      label: `What salary gives ${formatSalaryLabel(monthlyTarget)} per month?`,
      href: `/take-home-${monthlyTarget}-month-uk`,
    },
    {
      label: "Use reverse salary planning",
      href: "/reverse-tax",
    },
  ]).slice(0, 3);
}

export function getRetentionLink(salary: number): LinkItem {
  if (salary >= 40000) {
    return {
      label: "Send or save this salary scenario",
      href: "/calculator",
    };
  }

  return {
    label: "Compare this salary with another path",
    href: "/compare-salary",
  };
}

export function getRelatedSalaryLinks(salary: number): LinkItem[] {
  return dedupeLinks(
    getNearbySalaryValues(salary).map((value) => ({
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
      label: "Compare salary outcomes interactively",
      href: "/compare-salary",
    },
    {
      label: "Open the full UK salary calculator",
      href: "/calculator",
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
  const monthlyTarget = toMonthlyTargetFromSalary(salary);

  if (salary < 30000) {
    return dedupeLinks([
      {
        label: "Can this salary cover monthly essentials comfortably?",
        href: `/take-home-${monthlyTarget}-month-uk`,
      },
      {
        label: "Would the next salary band feel meaningfully better?",
        href: "/compare-salary",
      },
      {
        label: "Decode a payslip in plain English",
        href: "/payslip-explained",
      },
    ]);
  }

  if (salary < 50000) {
    return dedupeLinks([
      {
        label: "Is this a strong mid-range UK salary after deductions?",
        href: `/${salary}-after-tax-uk`,
      },
      {
        label: "Does a raise actually change monthly life here?",
        href: "/compare-salary",
      },
      {
        label: `What salary gets me to ${formatSalaryLabel(monthlyTarget)} monthly take-home?`,
        href: `/take-home-${monthlyTarget}-month-uk`,
      },
    ]);
  }

  return dedupeLinks([
    {
      label: "How much of a higher salary do I really keep?",
      href: "/compare-salary",
    },
    {
      label: "Should I reverse-plan my next income target?",
      href: "/reverse-tax",
    },
    {
      label: "Understand the deduction logic behind these results",
      href: "/payslip-explained",
    },
  ]);
}