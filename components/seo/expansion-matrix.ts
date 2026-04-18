import {
  getBenchmarkRoleSlugs,
  getExpandedMonthlyTakeHomeValues,
  getExpandedSalaryValues,
  getRegionSlugs,
} from "./programmatic-expansion-config";

export function getExpansionCounts() {
  const salaries = getExpandedSalaryValues();
  const monthlyTargets = getExpandedMonthlyTakeHomeValues();
  const regions = getRegionSlugs();
  const roles = getBenchmarkRoleSlugs();

  return {
    salaryPages: salaries.length,
    monthlyTakeHomePages: monthlyTargets.length,
    goodSalaryPages: salaries.length * regions.length,
    benchmarkPages: roles.length * regions.length,
    totalProgrammaticPages:
      salaries.length +
      monthlyTargets.length +
      salaries.length * regions.length +
      roles.length * regions.length,
  };
}

export function getExpansionPreview() {
  const salaries = getExpandedSalaryValues();
  const monthlyTargets = getExpandedMonthlyTakeHomeValues();
  const regions = getRegionSlugs();
  const roles = getBenchmarkRoleSlugs();

  return {
    salaryExamples: [
      `/${salaries[0]}-after-tax-uk`,
      `/${salaries[10]}-after-tax-uk`,
      `/${salaries[25]}-after-tax-uk`,
      `/${salaries[salaries.length - 1]}-after-tax-uk`,
    ],
    monthlyExamples: [
      `/monthly-take-home/${monthlyTargets[0]}`,
      `/monthly-take-home/${monthlyTargets[5]}`,
      `/monthly-take-home/${monthlyTargets[10]}`,
      `/monthly-take-home/${monthlyTargets[monthlyTargets.length - 1]}`,
    ],
    goodSalaryExamples: [
      `/good-salary/${salaries[10]}/${regions[0]}`,
      `/good-salary/${salaries[20]}/${regions[1]}`,
      `/good-salary/${salaries[30]}/${regions[2]}`,
    ],
    benchmarkExamples: [
      `/benchmarks/${roles[0]}/${regions[0]}`,
      `/benchmarks/${roles[1]}/${regions[1]}`,
      `/benchmarks/${roles[2]}/${regions[2]}`,
    ],
  };
}