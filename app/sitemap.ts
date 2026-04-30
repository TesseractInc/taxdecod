import type { MetadataRoute } from "next";
import {
  buildAbsoluteUrl,
  getAllSitemapRoutes,
} from "../components/seo/sitemap-helpers";

function getSitemapPriority(path: string) {
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
  const isHub =
    path === "/salary-hub" ||
    path === "/salary-pages" ||
    path === "/salary-tools" ||
    path === "/benchmarks" ||
    path === "/benchmarks/roles" ||
    path === "/benchmarks/regions" ||
    path === "/guides";
  const isGuide = path.startsWith("/guides/");
  const isSalary = path.endsWith("-after-tax-uk");
  const isCompare = path.startsWith("/compare/");
  const isMonthly = path.startsWith("/monthly-take-home/");
  const isGoodSalary = path.startsWith("/good-salary/");
  const isBenchmark =
    path.startsWith("/benchmarks/") &&
    path !== "/benchmarks/roles" &&
    path !== "/benchmarks/regions";
  const isTrustPage =
    path === "/about" ||
    path === "/methodology" ||
    path === "/assumptions" ||
    path === "/disclaimer" ||
    path === "/privacy-policy" ||
    path === "/terms" ||
    path === "/contact";

  if (isHomepage) return 1.0;
  if (isCoreTool) return 0.95;
  if (isHub) return 0.9;
  if (isSalary) return 0.84;
  if (isGuide) return 0.82;
  if (isCompare) return 0.78;
  if (isMonthly || isGoodSalary || isBenchmark) return 0.74;
  if (isTrustPage) return 0.62;

  return 0.5;
}

function getSitemapChangeFrequency(
  path: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
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
  const isTrustPage =
    path === "/about" ||
    path === "/methodology" ||
    path === "/assumptions" ||
    path === "/disclaimer" ||
    path === "/privacy-policy" ||
    path === "/terms" ||
    path === "/contact";

  if (isHomepage || isCoreTool) return "daily";
  if (isTrustPage) return "monthly";

  return "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllSitemapRoutes().map((path) => ({
    url: buildAbsoluteUrl(path),
    lastModified: now,
    changeFrequency: getSitemapChangeFrequency(path),
    priority: getSitemapPriority(path),
  }));
}