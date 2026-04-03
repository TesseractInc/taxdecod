export function getRelatedSalaryLinks(salary: number) {
  const suggestions = [salary - 5000, salary - 2500, salary + 2500, salary + 5000]
    .filter((value) => value > 0);

  return suggestions.map((value) => ({
    label: `£${value.toLocaleString("en-GB")} after tax`,
    href: `/${value}-after-tax-uk`,
  }));
}

export function getVariantLinks(salary: number) {
  return [
    {
      label: `£${salary.toLocaleString("en-GB")} after tax monthly`,
      href: `/${salary}-after-tax-monthly`,
    },
    {
      label: `£${salary.toLocaleString("en-GB")} after tax with student loan`,
      href: `/${salary}-after-tax-with-student-loan`,
    },
    {
      label: `£${salary.toLocaleString("en-GB")} after tax Scotland`,
      href: `/${salary}-after-tax-scotland`,
    },
    {
      label: "Use the full UK salary calculator",
      href: "/calculator",
    },
  ];
}