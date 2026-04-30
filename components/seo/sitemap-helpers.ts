import {
  getBenchmarkRolesByRollout,
  getComparisonPairsByRollout,
  getMonthlyTakeHomeValuesByRollout,
  getRegionsByRollout,
  getSalaryValuesByRollout,
} from "./programmatic-expansion-config";

export function getBaseSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.taxdecod.com";

  return envUrl.replace(/\/+$/, "");
}

export function buildAbsoluteUrl(path: string) {
  const base = getBaseSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function uniqueRoutes(routes: string[]) {
  return [...new Set(routes)].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });
}

export function getStaticCoreRoutes() {
  return [
    "/",
    "/calculator",
    "/compare-salary",
    "/reverse-tax",
    "/payslip-checker",
    "/student-loan-calculator",
    "/tax-refund-calculator",
    "/tax-code-decoder",
    "/overtime-calculator",
    "/bonus-tax-calculator",
    "/salary-sacrifice-calculator",
    "/maternity-pay-calculator",
    "/paternity-pay-calculator",
    "/holiday-pay-calculator",
    "/salary-hub",
    "/salary-pages",
    "/salary-tools",
    "/benchmarks",
    "/benchmarks/roles",
    "/benchmarks/regions",
    "/guides",
    "/about",
    "/contact",
    "/methodology",
    "/assumptions",
    "/disclaimer",
    "/privacy-policy",
    "/terms",
  ];
}

export function getEditorialGuideRoutes() {
  return [
    "/guides/how-income-tax-works-uk",
    "/guides/how-much-tax-do-i-pay-uk",
    "/guides/net-vs-gross-salary-explained",
    "/guides/how-to-read-a-payslip-uk",
    "/guides/how-student-loan-affects-salary-uk",
    "/guides/how-much-salary-increase-is-worth-it",
    "/guides/take-home-pay-explained",
    "/guides/what-is-a-good-salary-uk",
    "/guides/is-40k-a-good-salary-uk",
    "/guides/is-50k-a-good-salary-uk",
    "/guides/monthly-budget-by-salary-uk",
    "/guides/how-much-salary-to-take-home-3000",
    "/guides/how-much-tax-do-i-pay-per-month",
  ];
}

export function getSitemapSalaryRoutes() {
  return getSalaryValuesByRollout("flagship").map(
    (salary) => `/${salary}-after-tax-uk`
  );
}

export function getSitemapMonthlyTakeHomeRoutes() {
  return getMonthlyTakeHomeValuesByRollout("flagship").map(
    (amount) => `/monthly-take-home/${amount}`
  );
}

export function getSitemapGoodSalaryRoutes() {
  const salaries = getSalaryValuesByRollout("flagship");
  const regions = getRegionsByRollout("flagship");

  return salaries.flatMap((salary) =>
    regions.map((region) => `/good-salary/${salary}/${region.slug}`)
  );
}

export function getSitemapBenchmarkRoutes() {
  const roles = getBenchmarkRolesByRollout("flagship");
  const regions = getRegionsByRollout("flagship");

  return roles.flatMap((role) =>
    regions.map((region) => `/benchmarks/${role.slug}/${region.slug}`)
  );
}

export function getSitemapComparisonRoutes() {
  return getComparisonPairsByRollout("flagship").map(
    (pair) => `/compare/${pair.salaryA}-vs-${pair.salaryB}-after-tax`
  );
}

export function getAllSitemapRoutes() {
  return uniqueRoutes([
    ...getStaticCoreRoutes(),
    ...getEditorialGuideRoutes(),
    ...getSitemapSalaryRoutes(),
    ...getSitemapMonthlyTakeHomeRoutes(),
    ...getSitemapGoodSalaryRoutes(),
    ...getSitemapBenchmarkRoutes(),
    ...getSitemapComparisonRoutes(),
  ]);
}