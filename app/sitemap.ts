import type { MetadataRoute } from "next";
import { getSeoSalaryNumbers } from "../components/seo/salary-pages";
import { getReverseSeoAmounts } from "../components/seo/reverse-pages";
import { getComparisonSeoPairs } from "../components/seo/comparison-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taxdecod.com";
  const salaries = getSeoSalaryNumbers();
  const reverseAmounts = getReverseSeoAmounts();
  const comparisonPairs = getComparisonSeoPairs();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/calculator",
    "/reverse-tax",
    "/compare-salary",
    "/payslip-checker",
    "/salary-hub",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const mainSalaryPages: MetadataRoute.Sitemap = salaries.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-uk`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const variantSalaryPages: MetadataRoute.Sitemap = salaries
    .filter((salary) => salary <= 100000 || salary % 10000 === 0)
    .flatMap((salary) => [
      {
        url: `${baseUrl}/${salary}-after-tax-monthly`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${salary}-after-tax-scotland`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${salary}-after-tax-with-student-loan`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ]);

  const reverseSeoPages: MetadataRoute.Sitemap = reverseAmounts.map((amount) => ({
    url: `${baseUrl}/take-home-${amount}-month-uk`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const comparisonSeoPages: MetadataRoute.Sitemap = comparisonPairs.map(
    ([salaryA, salaryB]) => ({
      url: `${baseUrl}/compare/${salaryA}-vs-${salaryB}-after-tax`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.72,
    })
  );

  return [
    ...staticPages,
    ...mainSalaryPages,
    ...variantSalaryPages,
    ...reverseSeoPages,
    ...comparisonSeoPages,
  ];
}