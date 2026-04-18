import { formatCurrency } from "../../lib/tax/utils/currency";

export type ContextualLinkItem = {
  href: string;
  title: string;
  description: string;
};

export type ContextualLinkContext =
  | {
      type: "salary";
      salary: number;
      monthlyNet: number;
    }
  | {
      type: "monthly";
      amount: number;
      requiredSalary: number;
    }
  | {
      type: "guide";
      salary: number;
      guideType: "isGoodSalary" | "taxOnSalary" | "decision";
    }
  | {
      type: "compare";
      salaryA: number;
      salaryB: number;
      strongerSalary: number;
      strongerMonthlyNet: number;
    }
  | {
      type: "benchmark";
      role: string;
      region: string;
      medianSalary: number;
    }
  | {
      type: "goodSalary";
      salary: number;
      region: string;
      monthlyNet: number;
      nearbyRegions: string[];
    };

function clampMonthlyTarget(value: number) {
  return Math.max(1500, Math.min(5000, Math.round(value / 100) * 100));
}

function normalizeSalary(value: number) {
  return Math.max(10000, Math.round(value / 1000) * 1000);
}

function lowerSalary(value: number, step = 10000) {
  return normalizeSalary(value - step);
}

function higherSalary(value: number, step = 10000) {
  return normalizeSalary(value + step);
}

function compareHref(a: number, b: number) {
  const low = Math.min(a, b);
  const high = Math.max(a, b);
  return `/compare/${low}-vs-${high}-after-tax`;
}

function link(
  href: string,
  title: string,
  description: string
): ContextualLinkItem {
  return { href, title, description };
}

function finalizeLinks(items: ContextualLinkItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (!item.href || !item.title || !item.description || seen.has(item.href)) {
      return false;
    }

    seen.add(item.href);
    return true;
  });
}

export function getContextualLinks(
  context: ContextualLinkContext
): ContextualLinkItem[] {
  if (context.type === "salary") {
    const lower = lowerSalary(context.salary);
    const higher = higherSalary(context.salary);
    const monthlyTarget = clampMonthlyTarget(context.monthlyNet);

    return finalizeLinks([
      link(
        `/monthly-take-home/${monthlyTarget}`,
        `Reverse from ${formatCurrency(monthlyTarget)} / month`,
        "Switch from gross salary thinking into monthly planning."
      ),
      link(
        compareHref(lower, context.salary),
        `Compare ${formatCurrency(lower)} vs ${formatCurrency(context.salary)}`,
        "See whether this salary is materially stronger than the nearby lower band."
      ),
      link(
        compareHref(context.salary, higher),
        `Compare ${formatCurrency(context.salary)} vs ${formatCurrency(higher)}`,
        "Test whether the next salary jump is really worth it after deductions."
      ),
      link(
        `/good-salary/${context.salary}/london`,
        `${formatCurrency(context.salary)} in London`,
        "Judge this salary in a higher-cost city context instead of tax alone."
      ),
      link(
        `/guides/is-${context.salary}-a-good-salary-uk`,
        `Is ${formatCurrency(context.salary)} a good salary?`,
        "Move into the editorial interpretation layer for this salary band."
      ),
      link(
        `/guides/how-much-tax-on-${context.salary}`,
        `How much tax on ${formatCurrency(context.salary)}?`,
        "See the tax-focused editorial breakdown for this salary."
      ),
    ]);
  }

  if (context.type === "monthly") {
    const lower = lowerSalary(context.requiredSalary);
    const higher = higherSalary(context.requiredSalary);

    return finalizeLinks([
      link(
        `/${context.requiredSalary}-after-tax-uk`,
        `See ${formatCurrency(context.requiredSalary)} after tax`,
        "Open the full salary route behind this monthly target."
      ),
      link(
        compareHref(lower, context.requiredSalary),
        `Compare ${formatCurrency(lower)} vs ${formatCurrency(
          context.requiredSalary
        )}`,
        "See whether the required salary is materially better than the nearby lower route."
      ),
      link(
        compareHref(context.requiredSalary, higher),
        `Compare ${formatCurrency(context.requiredSalary)} vs ${formatCurrency(
          higher
        )}`,
        "See how much stronger the next salary band looks after deductions."
      ),
      link(
        `/good-salary/${context.requiredSalary}/london`,
        `${formatCurrency(context.requiredSalary)} in London`,
        "Judge this salary in a real higher-cost city context."
      ),
      link(
        "/guides/how-much-salary-to-take-home-3000",
        "Read the monthly salary planning guide",
        "Move into the editorial planning layer behind take-home targets."
      ),
      link(
        "/reverse-tax",
        "Use the full reverse salary tool",
        "Change region, pension, and other settings instead of relying on the default route."
      ),
    ]);
  }

  if (context.type === "guide") {
    const lower = lowerSalary(context.salary);
    const higher = higherSalary(context.salary);
    const monthlyTarget = clampMonthlyTarget(context.salary * 0.68);

    if (context.guideType === "decision") {
      return finalizeLinks([
        link(
          "/compare/40000-vs-50000-after-tax",
          "Compare £40k vs £50k",
          "See a high-intent salary jump through the full compare route."
        ),
        link(
          "/compare/50000-vs-60000-after-tax",
          "Compare £50k vs £60k",
          "See how retained value changes across a common jump."
        ),
        link(
          "/reverse-tax",
          "Reverse plan your target income",
          "Start from the monthly amount you actually want to keep."
        ),
        link(
          "/guides/how-much-salary-increase-is-worth-it",
          "Read the raise-worth-it guide",
          "Move into the editorial decision layer behind salary jumps."
        ),
        link(
          "/compare-salary",
          "Use the live compare tool",
          "Check any two salaries instead of staying with a fixed comparison pair."
        ),
      ]);
    }

    return finalizeLinks([
      link(
        `/${context.salary}-after-tax-uk`,
        `See ${formatCurrency(context.salary)} after tax`,
        "Move from explanation into the full salary breakdown route."
      ),
      link(
        compareHref(lower, context.salary),
        `Compare ${formatCurrency(lower)} vs ${formatCurrency(context.salary)}`,
        "See whether this salary is materially stronger than the nearby lower band."
      ),
      link(
        compareHref(context.salary, higher),
        `Compare ${formatCurrency(context.salary)} vs ${formatCurrency(higher)}`,
        "See whether the next salary band is worth it after deductions."
      ),
      link(
        `/monthly-take-home/${monthlyTarget}`,
        `Reverse from about ${formatCurrency(monthlyTarget)} / month`,
        "Switch into monthly planning instead of gross salary thinking."
      ),
      link(
        `/good-salary/${context.salary}/london`,
        `${formatCurrency(context.salary)} in London`,
        "Judge this salary in a real city-cost context."
      ),
      link(
        "/salary-hub",
        "Browse the salary hub",
        "Move into the wider salary route system across the platform."
      ),
    ]);
  }

  if (context.type === "compare") {
    const lower = lowerSalary(context.strongerSalary);
    const monthlyTarget = clampMonthlyTarget(context.strongerMonthlyNet);

    return finalizeLinks([
      link(
        `/${context.salaryA}-after-tax-uk`,
        `See ${formatCurrency(context.salaryA)} after tax`,
        "Inspect the lower salary route on its own."
      ),
      link(
        `/${context.salaryB}-after-tax-uk`,
        `See ${formatCurrency(context.salaryB)} after tax`,
        "Inspect the stronger salary route on its own."
      ),
      link(
        `/monthly-take-home/${monthlyTarget}`,
        `Reverse from ${formatCurrency(monthlyTarget)} / month`,
        "Turn the stronger result into a planning target."
      ),
      link(
        `/good-salary/${context.strongerSalary}/london`,
        `${formatCurrency(context.strongerSalary)} in London`,
        "Judge the stronger salary in a real higher-cost city context."
      ),
      link(
        compareHref(lower, context.strongerSalary),
        `Compare ${formatCurrency(lower)} vs ${formatCurrency(
          context.strongerSalary
        )}`,
        "Extend the comparison cluster into another nearby decision route."
      ),
      link(
        "/guides/how-much-salary-increase-is-worth-it",
        "Read the salary-increase guide",
        "Move into the editorial decision layer behind compare pages."
      ),
    ]);
  }

  if (context.type === "goodSalary") {
    const lower = lowerSalary(context.salary);
    const higher = higherSalary(context.salary);
    const monthlyTarget = clampMonthlyTarget(context.monthlyNet);

    return finalizeLinks([
      link(
        `/${context.salary}-after-tax-uk`,
        `See ${formatCurrency(context.salary)} after tax`,
        "Open the full salary route behind this regional salary reading."
      ),
      link(
        `/monthly-take-home/${monthlyTarget}`,
        `Reverse from ${formatCurrency(monthlyTarget)} / month`,
        "Turn this regional salary reading into a monthly planning route."
      ),
      link(
        compareHref(context.salary, higher),
        `Compare ${formatCurrency(context.salary)} vs ${formatCurrency(higher)}`,
        "See whether the next salary band looks materially stronger after deductions."
      ),
      link(
        compareHref(lower, context.salary),
        `Compare ${formatCurrency(lower)} vs ${formatCurrency(context.salary)}`,
        "See whether the nearby lower salary band would feel materially weaker."
      ),
      link(
        `/guides/is-${context.salary}-a-good-salary-uk`,
        `Read the ${formatCurrency(context.salary)} salary guide`,
        "Move from city context into the editorial salary-judgment layer."
      ),
      link(
        `/benchmarks/regions`,
        "Browse benchmark regions",
        "Compare this city-based salary reading against broader regional benchmark routes."
      ),
      ...context.nearbyRegions.slice(0, 2).map((regionSlug) =>
        link(
          `/good-salary/${context.salary}/${regionSlug}`,
          `${formatCurrency(context.salary)} in ${regionSlug}`,
          "Switch city context and compare how the same salary may feel elsewhere."
        )
      ),
    ]);
  }

  const lower = lowerSalary(context.medianSalary);
  const higher = higherSalary(context.medianSalary);

  return finalizeLinks([
    link(
      `/${context.medianSalary}-after-tax-uk`,
      `See ${formatCurrency(context.medianSalary)} after tax`,
      "Move from benchmark context into a real salary route."
    ),
    link(
      `/good-salary/${context.medianSalary}/${context.region}`,
      `Judge ${formatCurrency(context.medianSalary)} in ${context.region}`,
      "Move into the city-intent judgment layer for this benchmark."
    ),
    link(
      compareHref(lower, context.medianSalary),
      `Compare ${formatCurrency(lower)} vs ${formatCurrency(
        context.medianSalary
      )}`,
      "See whether the benchmark midpoint is materially stronger than the nearby lower route."
    ),
    link(
      compareHref(context.medianSalary, higher),
      `Compare ${formatCurrency(context.medianSalary)} vs ${formatCurrency(
        higher
      )}`,
      "See how much stronger the next salary band looks after deductions."
    ),
    link(
      "/guides/what-is-a-good-salary-uk",
      "Read the salary-judgment guide",
      "Move into the editorial interpretation layer behind benchmark pages."
    ),
    link(
      "/benchmarks",
      "Browse the benchmark hub",
      "Explore more role and region benchmark routes across the cluster."
    ),
  ]);
}