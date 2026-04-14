import type { MetadataRoute } from "next";
import { getSeoSalaryNumbers } from "../components/seo/salary-pages";
import { getVariantSalaryNumbers } from "../components/seo/salary-variants";
import { getMonthlyTakeHomeAmounts } from "../components/seo/monthly-target-pages";
import { getHourlyRates } from "../components/seo/hourly-pages";
import { getComparisonSeoPairs } from "../components/seo/comparison-pages";
import { getBenchmarkParams } from "../components/seo/role-region-benchmarks";
import { getCityIntentParams } from "../components/seo/city-salary-intent";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taxdecod.com";
  const now = new Date();

  const salaries = getSeoSalaryNumbers();
  const variantSalaries = getVariantSalaryNumbers();
  const monthlyTargets = getMonthlyTakeHomeAmounts();
  const hourlyRates = getHourlyRates();
  const comparisonPairs = getComparisonSeoPairs();
  const benchmarkPages = getBenchmarkParams();
  const cityIntentPages = getCityIntentParams();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/calculator",
    "/reverse-tax",
    "/compare-salary",
    "/salary-hub",
    "/salary-tools",
    "/payslip-checker",
    "/payslip-explained",
    "/benchmarks",
    "/leaderboard",
    "/services",
    "/contact",
    "/methodology",
    "/assumptions",
    "/disclaimer",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/calculator" ? 0.95 : 0.8,
  }));

  const mainSalaryPages = salaries.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-uk`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const variantPages = variantSalaries.flatMap((salary) => [
    {
      url: `${baseUrl}/${salary}-after-tax-monthly`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/${salary}-after-tax-scotland`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    },
    {
      url: `${baseUrl}/${salary}-after-tax-with-student-loan`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    },
  ]);

  const monthlyTakeHomePages = monthlyTargets.map((amount) => ({
    url: `${baseUrl}/monthly-take-home/${amount}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.78,
  }));

  const hourlyPages = hourlyRates.map((rate) => ({
    url: `${baseUrl}/hourly/${rate}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.76,
  }));

  const comparisonPages = comparisonPairs.map(([a, b]) => ({
    url: `${baseUrl}/compare/${a}-vs-${b}-after-tax`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.74,
  }));

  const benchmarkUrls = benchmarkPages.map(({ role, city }) => ({
    url: `${baseUrl}/benchmarks/${role}/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const cityIntentUrls = cityIntentPages.map(({ salary, region }) => ({
    url: `${baseUrl}/good-salary/${salary}/${region}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.73,
  }));

  return [
    ...staticPages,
    ...mainSalaryPages,
    ...variantPages,
    ...monthlyTakeHomePages,
    ...hourlyPages,
    ...comparisonPages,
    ...benchmarkUrls,
    ...cityIntentUrls,
  ];
}