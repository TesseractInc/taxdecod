import type { MetadataRoute } from "next";
import {
  buildAbsoluteUrl,
  getAllSitemapRoutes,
} from "../components/seo/sitemap-helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllSitemapRoutes().map((path) => {
    const isHomepage = path === "/";
    const isCoreTool =
      path === "/calculator" ||
      path === "/compare-salary" ||
      path === "/reverse-tax" ||
      path === "/payslip-checker" ||
      path === "/student-loan-calculator" ||
      path === "/bonus-tax-calculator" ||
      path === "/overtime-calculator" ||
      path === "/salary-sacrifice-calculator" ||
      path === "/tax-refund-calculator" ||
      path === "/tax-code-decoder";
    const isGuide = path.startsWith("/guides/");
    const isTrustPage =
      path === "/about" ||
      path === "/methodology" ||
      path === "/assumptions" ||
      path === "/disclaimer" ||
      path === "/privacy-policy" ||
      path === "/terms" ||
      path === "/contact";
    const isHub =
      path === "/salary-hub" ||
      path === "/salary-pages" ||
      path === "/salary-tools" ||
      path === "/benchmarks" ||
      path === "/benchmarks/roles" ||
      path === "/benchmarks/regions" ||
      path === "/guides";
    const isCompare = path.startsWith("/compare/");
    const isMonthly = path.startsWith("/monthly-take-home/");
    const isGoodSalary = path.startsWith("/good-salary/");
    const isBenchmark = path.startsWith("/benchmarks/");
    const isSalary = path.endsWith("-after-tax-uk");

    let priority = 0.7;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      "weekly";

    if (isHomepage) {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (isCoreTool) {
      priority = 0.95;
      changeFrequency = "daily";
    } else if (isHub) {
      priority = 0.92;
      changeFrequency = "weekly";
    } else if (isCompare) {
      priority = 0.88;
      changeFrequency = "weekly";
    } else if (isGuide) {
      priority = 0.85;
      changeFrequency = "weekly";
    } else if (isMonthly || isGoodSalary || isBenchmark) {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (isSalary) {
      priority = 0.82;
      changeFrequency = "weekly";
    } else if (isTrustPage) {
      priority = 0.68;
      changeFrequency = "monthly";
    }

    return {
      url: buildAbsoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}