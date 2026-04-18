import { GUIDE_EXPANSION_SET } from "./guide-expansion-config";
import {
  getBenchmarkStaticParamsForRollout,
  getComparisonStaticParamsForRollout,
  getGoodSalaryStaticParamsForRollout,
  getMonthlyTakeHomeStaticParamsForRollout,
  getSalaryStaticParamsForRollout,
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
    "/insights",
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

export function getProgrammaticGuideRoutes() {
  return GUIDE_EXPANSION_SET.map((guide) => `/guides/${guide.slug}`);
}

export function getGuideRoutes() {
  return [...new Set([...getEditorialGuideRoutes(), ...getProgrammaticGuideRoutes()])];
}

export function getSalaryRoutes() {
  return getSalaryStaticParamsForRollout().map((item) => `/${item.salary}`);
}

export function getMonthlyTakeHomeRoutes() {
  return getMonthlyTakeHomeStaticParamsForRollout().map(
    (item) => `/monthly-take-home/${item.amount}`
  );
}

export function getGoodSalaryRoutes() {
  return getGoodSalaryStaticParamsForRollout().map(
    (item) => `/good-salary/${item.salary}/${item.region}`
  );
}

export function getBenchmarkRoutes() {
  return getBenchmarkStaticParamsForRollout().map(
    (item) => `/benchmarks/${item.role}/${item.region}`
  );
}

export function getComparisonRoutes() {
  return getComparisonStaticParamsForRollout().map(
    (item) => `/compare/${item.comparison}`
  );
}

export function getAllSitemapRoutes() {
  return [
    ...getStaticCoreRoutes(),
    ...getGuideRoutes(),
    ...getSalaryRoutes(),
    ...getMonthlyTakeHomeRoutes(),
    ...getGoodSalaryRoutes(),
    ...getBenchmarkRoutes(),
    ...getComparisonRoutes(),
  ];
}