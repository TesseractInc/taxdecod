import { formatCurrency } from "../../lib/tax/utils/currency";

type SalaryInsightPack = {
  headline: string;
  summary: string;
  practicalMeaning: string;
  thresholdNote: string;
  decisionPrompt: string;
  qualitySignals: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
};

function getBandLabel(salary: number) {
  if (salary < 25000) return "entry-to-lower income";
  if (salary < 35000) return "lower-to-mid income";
  if (salary < 50000) return "mid-income";
  if (salary < 70000) return "upper-mid income";
  if (salary < 100000) return "high income";
  return "higher-complexity income";
}

function getThresholdNote(salary: number) {
  if (salary < 12570) {
    return "This salary sits below the standard personal allowance zone, so tax behaviour can differ from the more common full-PAYE employee scenarios.";
  }

  if (salary >= 12570 && salary < 20000) {
    return "At this level, users usually care most about whether basic expenses, travel, and rent can be covered once deductions are applied.";
  }

  if (salary >= 20000 && salary < 35000) {
    return "This is a common salary range where take-home clarity matters more than the gross number because users often budget monthly rather than yearly.";
  }

  if (salary >= 35000 && salary < 50270) {
    return "This range is often where salary progression starts to feel meaningful, but monthly gains still need to be checked properly rather than assumed from gross pay.";
  }

  if (salary >= 50270 && salary < 100000) {
    return "This salary is at or above the higher-rate tax threshold, so extra gross income often converts less efficiently into take-home pay than users expect.";
  }

  return "At this level, tax efficiency, pension treatment, salary sacrifice, and planning choices can matter much more than the headline salary alone.";
}

function getPracticalMeaning(salary: number, netMonthly: number) {
  if (netMonthly < 1800) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is usually planning-sensitive. Users at this level often need to think about affordability, shared housing, transport cost, and whether a nearby salary jump would materially improve monthly life.`;
  }

  if (netMonthly < 2600) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} usually feels workable for many users, but real comfort depends heavily on city, rent level, debt, and whether pension or student loan deductions are already reducing flexibility.`;
  }

  if (netMonthly < 3500) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is often where salary decisions become more strategic. Users in this range usually compare role quality, commute, stress, savings rate, and raise efficiency rather than looking at gross salary alone.`;
  }

  if (netMonthly < 5000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is strong in many UK contexts, but users still need to judge how efficiently extra salary is converting after deductions, especially once tax pressure increases.`;
  }

  return `A monthly take-home of ${formatCurrency(
    netMonthly
  )} is high enough that salary planning becomes more complex. The real question is often not just “how much do I earn?” but “how much do I keep, and how efficiently am I structured?”`;
}

function getDecisionPrompt(salary: number, netMonthly: number) {
  if (salary < 30000) {
    return "The next smart step is usually to compare this salary against a nearby raise or reverse-plan the monthly income needed for a stronger affordability position.";
  }

  if (salary < 50000) {
    return `The key decision is whether ${formatCurrency(
      netMonthly
    )} per month is strong enough for your lifestyle, or whether the next salary band creates a noticeably better monthly outcome.`;
  }

  if (salary < 70000) {
    return "At this point, users should usually compare this salary against a nearby jump rather than assuming that a higher gross number will feel proportionally better after tax.";
  }

  return "At this level, the next decision should usually involve comparison, reverse salary planning, or a deeper look at deduction pressure rather than a raw salary lookup alone.";
}

function getQualitySignals(salary: number, keepPercent: number) {
  const items = [
    `Income band: ${getBandLabel(salary)}`,
    `Estimated keep rate: ${keepPercent.toFixed(0)}%`,
    "Built for UK after-tax salary decisions",
  ];

  if (salary >= 50270) {
    items.push("Includes higher-rate tax context");
  }

  if (salary >= 100000) {
    items.push("Higher-complexity income range");
  }

  return items.slice(0, 4);
}

export function getProgrammaticSalaryContent(args: {
  salary: number;
  netMonthly: number;
  netAnnual: number;
  keepPercent: number;
}): SalaryInsightPack {
  const { salary, netMonthly, netAnnual, keepPercent } = args;

  return {
    headline: `${formatCurrency(salary)} after tax is really about ${formatCurrency(
      netMonthly
    )} per month`,
    summary: `A gross salary of ${formatCurrency(
      salary
    )} produces an estimated annual take-home of ${formatCurrency(
      netAnnual
    )}. That is the number that matters for real decisions like affordability, role comparison, and monthly planning.`,
    practicalMeaning: getPracticalMeaning(salary, netMonthly),
    thresholdNote: getThresholdNote(salary),
    decisionPrompt: getDecisionPrompt(salary, netMonthly),
    qualitySignals: getQualitySignals(salary, keepPercent),
    faqItems: [
      {
        question: `Is ${formatCurrency(salary)} a good salary after tax in the UK?`,
        answer:
          "That depends less on the gross number and more on the monthly take-home, your city, rent, debt, household setup, and whether the next salary band would materially improve monthly life.",
      },
      {
        question: `How much is ${formatCurrency(salary)} per month after tax?`,
        answer: `Estimated take-home pay is about ${formatCurrency(
          netMonthly
        )} per month under this setup.`,
      },
      {
        question: `Why does ${formatCurrency(
          salary
        )} after tax feel different from the gross salary?`,
        answer:
          "Because income tax, National Insurance, pension contributions, and student loan deductions reduce what actually reaches you. That is why monthly net pay is usually the more important number.",
      },
    ],
  };
}