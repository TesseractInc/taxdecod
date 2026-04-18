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
    return "At this level, users usually care most about whether basic expenses, travel, and rent can still be covered once deductions are applied.";
  }

  if (salary >= 20000 && salary < 30000) {
    return "This is a common salary range where take-home clarity matters more than the gross number because monthly affordability is usually the real question.";
  }

  if (salary >= 30000 && salary < 40000) {
    return "This is a common progression zone where gross salary starts to look meaningfully stronger, but the monthly improvement still needs to be judged properly.";
  }

  if (salary >= 40000 && salary < 50270) {
    return "This range is often where users start asking whether the next salary band is really worth it after deductions rather than assuming gross progression tells the full story.";
  }

  if (salary >= 50270 && salary < 70000) {
    return "This salary is above the higher-rate tax threshold, so each extra jump in gross pay usually converts less efficiently into monthly take-home than it did in the lower bands.";
  }

  if (salary >= 70000 && salary < 100000) {
    return "At this level, salary still looks strong, but the real question is usually how efficiently extra gross income is turning into take-home after higher-rate tax and other deductions.";
  }

  return "At this level, higher-rate tax pressure is already established and the salary should be judged through planning quality, retention efficiency, pension treatment, and deduction structure rather than gross pay alone.";
}

function getPracticalMeaning(salary: number, netMonthly: number) {
  if (salary <= 20000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is usually planning-sensitive. At this level, users often care less about the annual gross number and more about whether basic monthly costs, travel, and shared housing are still manageable.`;
  }

  if (salary <= 30000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} often feels workable, but comfort depends heavily on rent, transport, debt, and whether pension or student loan deductions are already reducing flexibility.`;
  }

  if (salary <= 40000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is often where salary decisions become more strategic. Users in this range usually compare role quality, commute, stress, savings rate, and what the next £5k actually changes.`;
  }

  if (salary <= 50000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is strong in many UK contexts, but users still need to judge how efficiently extra salary is converting after deductions before assuming the next salary band is automatically worth it.`;
  }

  if (salary < 70000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is clearly stronger than the mid-income bands, but the jump above the higher-rate threshold means users should judge retention efficiency rather than trusting the headline gross number alone.`;
  }

  if (salary < 100000) {
    return `A monthly take-home of ${formatCurrency(
      netMonthly
    )} is high in many UK contexts, but users in this band usually stop asking “is this a good salary?” and start asking “is the next jump still worth it after higher-rate tax and deduction drag?”`;
  }

  return `A monthly take-home of ${formatCurrency(
    netMonthly
  )} is high enough that salary interpretation becomes more about efficiency, planning, and structure than raw gross prestige. At this level, extra income still matters, but not every gross jump feels proportionally stronger in practice.`;
}

function getDecisionPrompt(salary: number, netMonthly: number) {
  if (salary <= 20000) {
    return "The next smart step is usually to compare this salary against a nearby raise or reverse-plan the monthly income needed for a stronger affordability position.";
  }

  if (salary <= 30000) {
    return `The key decision is whether ${formatCurrency(
      netMonthly
    )} per month is strong enough for your current monthly pressure, or whether the next salary band would create a noticeably better result.`;
  }

  if (salary <= 40000) {
    return `The key decision is whether ${formatCurrency(
      netMonthly
    )} per month already supports your lifestyle well enough, or whether the next salary jump creates a more meaningful change than the gross number suggests.`;
  }

  if (salary <= 50000) {
    return "At this point, users should usually compare this salary against a nearby jump rather than assuming that a higher gross number will feel proportionally better after tax.";
  }

  if (salary < 70000) {
    return "At this point, the smarter question is usually whether the next £5k or £10k still creates enough real monthly gain after higher-rate tax to justify the change.";
  }

  if (salary < 100000) {
    return "At this point, the smarter question is rarely just “is this salary high?” and more often “does the next jump still convert efficiently enough to matter in real life?”";
  }

  return "At this level, the best next move is usually comparison, reverse salary planning, or deduction-structure thinking rather than a raw salary lookup. The important question is how much more of the next jump you actually keep.";
}

function getHeadline(salary: number, netMonthly: number) {
  if (salary < 50000) {
    return `${formatCurrency(salary)} after tax is really about ${formatCurrency(
      netMonthly
    )} per month`;
  }

  if (salary < 70000) {
    return `${formatCurrency(
      salary
    )} after tax is strong, but the real question is how efficiently you keep it`;
  }

  if (salary < 100000) {
    return `${formatCurrency(
      salary
    )} after tax is high, but the next jump deserves careful comparison`;
  }

  return `${formatCurrency(
    salary
  )} after tax is less about prestige and more about retention efficiency`;
}

function getSummary(
  salary: number,
  netMonthly: number,
  netAnnual: number,
  keepPercent: number
) {
  if (salary < 50000) {
    return `A gross salary of ${formatCurrency(
      salary
    )} produces an estimated annual take-home of ${formatCurrency(
      netAnnual
    )}. That is the number that matters for real decisions like affordability, role comparison, and monthly planning.`;
  }

  if (salary < 70000) {
    return `A gross salary of ${formatCurrency(
      salary
    )} produces an estimated annual take-home of ${formatCurrency(
      netAnnual
    )}, or about ${formatCurrency(
      netMonthly
    )} per month. At this level, salary still feels strong, but users should pay closer attention to how much of the extra gross pay is actually being retained.`;
  }

  if (salary < 100000) {
    return `A gross salary of ${formatCurrency(
      salary
    )} produces an estimated annual take-home of ${formatCurrency(
      netAnnual
    )}, with an estimated keep rate of about ${keepPercent.toFixed(
      0
    )}%. This is where higher-rate tax changes how salary progression feels in practice.`;
  }

  return `A gross salary of ${formatCurrency(
    salary
  )} produces an estimated annual take-home of ${formatCurrency(
    netAnnual
  )}, or about ${formatCurrency(
    netMonthly
  )} per month. At this level, the salary should be judged less by the gross number and more by retention quality, tax pressure, and planning efficiency.`;
}

function getQualitySignals(salary: number, keepPercent: number) {
  const items = [
    `Income band: ${getBandLabel(salary)}`,
    `Estimated keep rate: ${keepPercent.toFixed(0)}%`,
    "Built for UK after-tax salary decisions",
  ];

  if (salary >= 50270 && salary < 100000) {
    items.push("Includes higher-rate tax context");
  }

  if (salary >= 70000) {
    items.push("Focused on salary efficiency");
  }

  if (salary >= 100000) {
    items.push("Higher-complexity income range");
  }

  return items.slice(0, 4);
}

function getGoodSalaryAnswer(salary: number, netMonthly: number) {
  if (salary < 50000) {
    return "That depends less on the gross number and more on the monthly take-home, your city, rent, debt, household setup, and whether the next salary band would materially improve monthly life.";
  }

  if (salary < 100000) {
    return `This is a strong salary in many UK contexts, but the more useful question is whether about ${formatCurrency(
      netMonthly
    )} per month feels efficient enough after deductions and whether the next jump would still create a meaningful improvement.`;
  }

  return `This is a high salary in many UK contexts, but the better question is no longer just whether it is “good.” The more useful question is how efficiently the income converts after deductions and whether the next jump still meaningfully changes real life.`;
}

export function getProgrammaticSalaryContent(args: {
  salary: number;
  netMonthly: number;
  netAnnual: number;
  keepPercent: number;
}): SalaryInsightPack {
  const { salary, netMonthly, netAnnual, keepPercent } = args;

  return {
    headline: getHeadline(salary, netMonthly),
    summary: getSummary(salary, netMonthly, netAnnual, keepPercent),
    practicalMeaning: getPracticalMeaning(salary, netMonthly),
    thresholdNote: getThresholdNote(salary),
    decisionPrompt: getDecisionPrompt(salary, netMonthly),
    qualitySignals: getQualitySignals(salary, keepPercent),
    faqItems: [
      {
        question: `Is ${formatCurrency(salary)} a good salary after tax in the UK?`,
        answer: getGoodSalaryAnswer(salary, netMonthly),
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
          "Because Income Tax, National Insurance, pension contributions, and student loan deductions reduce what actually reaches you. At higher salaries, this difference often feels more important because each extra gross jump may convert less efficiently into take-home pay.",
      },
    ],
  };
}