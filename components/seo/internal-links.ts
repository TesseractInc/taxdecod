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

export function getRelatedSalaryLinks(salary: number): LinkItem[] {
  const suggestions = [
    salary - 5000,
    salary - 2500,
    salary + 2500,
    salary + 5000,
    salary + 10000,
    salary + 20000,
  ].filter((value) => value >= 10000);

  return dedupeLinks(
    suggestions.map((value) => ({
      label: `${formatSalaryLabel(value)} after tax in the UK`,
      href: `/${value}-after-tax-uk`,
    }))
  );
}

export function getVariantLinks(salary: number): LinkItem[] {
  return [
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
      label: "Use the full UK salary calculator",
      href: "/calculator",
    },
    {
      label: "Use the reverse salary calculator",
      href: "/reverse-tax",
    },
    {
      label: "Compare two salaries after tax",
      href: "/compare-salary",
    },
    {
      label: "Explore the salary hub",
      href: "/salary-hub",
    },
  ];
}