export type GuideType =
  | "isGoodSalary"
  | "taxOnSalary"
  | "decision";

export type GuideConfig = {
  slug: string;
  salary: number;
  type: GuideType;
};

export const GUIDE_EXPANSION_SET: GuideConfig[] = [
  { slug: "is-25000-a-good-salary-uk", salary: 25000, type: "isGoodSalary" },
  { slug: "is-30000-a-good-salary-uk", salary: 30000, type: "isGoodSalary" },
  { slug: "is-35000-a-good-salary-uk", salary: 35000, type: "isGoodSalary" },
  { slug: "is-40000-a-good-salary-uk", salary: 40000, type: "isGoodSalary" },
  { slug: "is-45000-a-good-salary-uk", salary: 45000, type: "isGoodSalary" },
  { slug: "is-50000-a-good-salary-uk", salary: 50000, type: "isGoodSalary" },
  { slug: "is-60000-a-good-salary-uk", salary: 60000, type: "isGoodSalary" },
  { slug: "is-70000-a-good-salary-uk", salary: 70000, type: "isGoodSalary" },
  { slug: "is-80000-a-good-salary-uk", salary: 80000, type: "isGoodSalary" },
  { slug: "is-90000-a-good-salary-uk", salary: 90000, type: "isGoodSalary" },

  { slug: "how-much-tax-on-30000", salary: 30000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-35000", salary: 35000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-40000", salary: 40000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-45000", salary: 45000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-50000", salary: 50000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-60000", salary: 60000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-70000", salary: 70000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-80000", salary: 80000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-90000", salary: 90000, type: "taxOnSalary" },
  { slug: "how-much-tax-on-100000", salary: 100000, type: "taxOnSalary" },

  { slug: "is-5000-salary-increase-worth-it", salary: 5000, type: "decision" },
  { slug: "is-10000-salary-increase-worth-it", salary: 10000, type: "decision" },
  { slug: "is-15000-salary-increase-worth-it", salary: 15000, type: "decision" },
  { slug: "40000-vs-50000-salary-uk", salary: 50000, type: "decision" },
  { slug: "45000-vs-55000-salary-uk", salary: 55000, type: "decision" },
  { slug: "50000-vs-60000-salary-uk", salary: 60000, type: "decision" },
  { slug: "60000-vs-80000-salary-uk", salary: 80000, type: "decision" },
  { slug: "should-i-change-job-for-5k-more", salary: 5000, type: "decision" },
  { slug: "should-i-change-job-for-10k-more", salary: 10000, type: "decision" },
  { slug: "should-i-change-job-for-15k-more", salary: 15000, type: "decision" },
];