import { benchmarkData, roles, regions } from "./benchmark-data";

export function getRoleTitle(roleSlug: string) {
  return roles.find((role) => role.slug === roleSlug)?.title || roleSlug;
}

export function getRegionName(regionSlug: string) {
  return regions.find((region) => region.slug === regionSlug)?.name || regionSlug;
}

export function getBenchmarkEntry(roleSlug: string, regionSlug: string) {
  return benchmarkData.find(
    (entry) => entry.role === roleSlug && entry.region === regionSlug
  );
}

export function getRelatedRoleBenchmarks(roleSlug: string, regionSlug: string) {
  return benchmarkData.filter(
    (entry) => entry.role === roleSlug && entry.region !== regionSlug
  );
}

export function getRelatedRegionBenchmarks(roleSlug: string, regionSlug: string) {
  return benchmarkData.filter(
    (entry) => entry.region === regionSlug && entry.role !== roleSlug
  );
}