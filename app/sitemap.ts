import type { MetadataRoute } from "next";

const salaryPages = [
  12000, 15000, 18000, 20000, 22000, 25000, 27000, 30000, 32000, 35000,
  38000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 80000, 100000,
];

const variantPages = [20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taxdecod.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const coreSalaryUrls: MetadataRoute.Sitemap = salaryPages.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-uk`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const monthlyUrls: MetadataRoute.Sitemap = variantPages.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-monthly`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const studentLoanUrls: MetadataRoute.Sitemap = variantPages.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-with-student-loan`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const scotlandUrls: MetadataRoute.Sitemap = variantPages.map((salary) => ({
    url: `${baseUrl}/${salary}-after-tax-scotland`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...coreSalaryUrls,
    ...monthlyUrls,
    ...studentLoanUrls,
    ...scotlandUrls,
  ];
}