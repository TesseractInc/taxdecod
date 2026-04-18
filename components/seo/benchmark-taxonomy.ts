import {
  EXPANSION_BENCHMARK_ROLES,
  EXPANSION_REGIONS,
  getBenchmarkStaticParamsForRollout,
  type BenchmarkRoleConfig,
  type RegionConfig,
} from "./programmatic-expansion-config";

export function getBenchmarkRoles(): BenchmarkRoleConfig[] {
  return [...EXPANSION_BENCHMARK_ROLES];
}

export function getBenchmarkRegions(): RegionConfig[] {
  return [...EXPANSION_REGIONS];
}

export function getBenchmarkRoleBySlug(slug: string): BenchmarkRoleConfig | null {
  return EXPANSION_BENCHMARK_ROLES.find((role) => role.slug === slug) ?? null;
}

export function getBenchmarkRegionBySlug(slug: string): RegionConfig | null {
  return EXPANSION_REGIONS.find((region) => region.slug === slug) ?? null;
}

export function getBenchmarkStaticParams() {
  return getBenchmarkStaticParamsForRollout();
}