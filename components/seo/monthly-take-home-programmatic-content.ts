import { formatCurrency } from "../../lib/tax/utils/currency";

type MonthlyTakeHomeInsightPack = {
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

function getThresholdNote(targetMonthly: number, requiredSalary: number) {
  if (targetMonthly <= 2000) {
    return "At this level, a relatively small salary change can matter a lot because the monthly result is often tied closely to rent, bills, and transport pressure.";
  }

  if (targetMonthly <= 2500) {
    return "This is a common target where users stop caring about salary labels and start caring about whether monthly life actually feels workable.";
  }

  if (targetMonthly <= 3000) {
    return "This is one of the most practical monthly targets because it often sits close to real planning decisions around savings, housing, and salary progression.";
  }

  if (targetMonthly <= 3500) {
    return "At this level, the target usually becomes less about basic affordability and more about whether the extra gross salary required is still worth the monthly improvement.";
  }

  return `To take home around ${formatCurrency(
    targetMonthly
  )} per month, the salary route often deserves comparison and reverse-planning rather than a simple salary lookup alone.`;
}

function getPracticalMeaning(targetMonthly: number, requiredSalary: number) {
  if (targetMonthly <= 2000) {
    return `A monthly take-home target of ${formatCurrency(
      targetMonthly
    )} is usually a basic affordability threshold. The estimated salary needed, around ${formatCurrency(
      requiredSalary
    )}, matters because many users at this level are judging breathing room, not salary prestige.`;
  }

  if (targetMonthly <= 2500) {
    return `A monthly take-home target of ${formatCurrency(
      targetMonthly
    )} is often where salary starts to feel more workable, but comfort still depends heavily on rent, transport, debt, and existing deductions.`;
  }

  if (targetMonthly <= 3000) {
    return `A monthly take-home target of ${formatCurrency(
      targetMonthly
    )} is often a real lifestyle benchmark. Users in this range usually think in terms of budget, savings, housing flexibility, and whether a salary jump is actually meaningful.`;
  }

  if (targetMonthly <= 3500) {
    return `A monthly take-home target of ${formatCurrency(
      targetMonthly
    )} is usually strong enough that the next question becomes whether the gross salary needed to reach it still feels efficient after deductions.`;
  }

  return `A monthly take-home target of ${formatCurrency(
    targetMonthly
  )} is usually a planning target, not just a number. At this level, the required salary should be judged against comparison routes and the efficiency of the next salary jump.`;
}

function getDecisionPrompt(targetMonthly: number, requiredSalary: number) {
  if (targetMonthly <= 2000) {
    return "The best next step is usually to compare this against the next £500 monthly target or inspect whether a nearby salary jump creates noticeably more room.";
  }

  if (targetMonthly <= 2500) {
    return "The best next step is usually to compare this target against a slightly higher monthly target or inspect the required salary in the full calculator.";
  }

  if (targetMonthly <= 3000) {
    return "The best next step is usually to compare this target against a nearby salary band and test whether the next monthly step is really worth the extra gross salary required.";
  }

  if (targetMonthly <= 3500) {
    return "The best next step is usually to compare this route against a nearby higher salary and decide whether the extra monthly gain still justifies the gross increase needed.";
  }

  return "The best next step is usually full reverse salary planning or salary comparison, because the monthly target alone no longer gives enough decision detail.";
}

function getQualitySignals(targetMonthly: number, requiredSalary: number) {
  const items = [
    `Monthly target: ${formatCurrency(targetMonthly)}`,
    `Estimated required salary: ${formatCurrency(requiredSalary)}`,
    "Built for reverse-intent salary planning",
  ];

  if (targetMonthly >= 3000) {
    items.push("Useful for raise-worth-it decisions");
  }

  return items.slice(0, 4);
}

export function getMonthlyTakeHomeContent(args: {
  targetMonthly: number;
  requiredSalary: number;
  annualNet: number;
}): MonthlyTakeHomeInsightPack {
  const { targetMonthly, requiredSalary, annualNet } = args;

  return {
    summary: `To take home about ${formatCurrency(
      targetMonthly
    )} per month, the estimated gross salary needed is around ${formatCurrency(
      requiredSalary
    )} per year. That is the number that matters when the real goal is monthly affordability or lifestyle planning rather than a gross salary headline.`,
    practicalMeaning: getPracticalMeaning(targetMonthly, requiredSalary),
    thresholdNote: getThresholdNote(targetMonthly, requiredSalary),
    decisionPrompt: getDecisionPrompt(targetMonthly, requiredSalary),
    qualitySignals: getQualitySignals(targetMonthly, requiredSalary),
    faqItems: [
      {
        question: `How much salary do I need to take home ${formatCurrency(
          targetMonthly
        )} a month?`,
        answer: `Under this setup, the estimated gross salary needed is around ${formatCurrency(
          requiredSalary
        )} per year.`,
      },
      {
        question: `Is ${formatCurrency(
          targetMonthly
        )} a month a good take-home amount in the UK?`,
        answer:
          "That depends on rent, city, transport costs, debt, household setup, and what lifestyle the monthly target is meant to support. The useful question is usually whether the salary needed to reach it still feels worth it after deductions.",
      },
      {
        question: `Why use a monthly take-home page instead of starting with salary?`,
        answer:
          "Because many real-life salary decisions start with the monthly amount a user wants to keep, not the gross number they want to earn.",
      },
    ],
  };
}