export type ToolInsightTone = "neutral" | "positive" | "warning";

export type ToolInsight = {
  title: string;
  description: string;
  tone: ToolInsightTone;
};

export function getStudentLoanInsights(params: {
  salary: number;
  repayment: number;
  threshold: number;
  planLabel: string;
}): ToolInsight[] {
  const { salary, repayment, threshold, planLabel } = params;
  const monthly = repayment / 12;
  const overThreshold = Math.max(0, salary - threshold);

  const insights: ToolInsight[] = [];

  if (salary <= threshold) {
    insights.push({
      title: `No ${planLabel} repayment is due at this salary`,
      description:
        "Repayments only begin above the threshold, so this salary does not currently create a student loan deduction.",
      tone: "positive",
    });
  } else {
    insights.push({
      title: `${planLabel} is actively reducing monthly take-home`,
      description: `At this salary, repayments are about £${monthly.toLocaleString(
        "en-GB",
        { maximumFractionDigits: 0 }
      )} a month, which is meaningful in salary comparisons and affordability planning.`,
      tone: "neutral",
    });
  }

  if (overThreshold > 10000) {
    insights.push({
      title: "The repayment drag is becoming more visible",
      description:
        "As salary rises further above the repayment threshold, student loan deductions become increasingly relevant to how efficient a pay rise actually feels.",
      tone: "warning",
    });
  }

  return insights.slice(0, 3);
}

export function getSalarySacrificeInsights(params: {
  salary: number;
  sacrificePercent: number;
  taxSaved: number;
  monthlyNetChange: number;
}): ToolInsight[] {
  const { salary, sacrificePercent, taxSaved, monthlyNetChange } = params;

  const insights: ToolInsight[] = [];

  if (taxSaved > 0) {
    insights.push({
      title: "Salary sacrifice is improving tax efficiency",
      description: `This setup reduces tax drag and saves about £${taxSaved.toLocaleString(
        "en-GB",
        { maximumFractionDigits: 0 }
      )} a year in Income Tax alone.`,
      tone: "positive",
    });
  }

  if (monthlyNetChange < 0) {
    insights.push({
      title: "Take-home falls more slowly than the sacrificed amount",
      description:
        "That is the point of salary sacrifice. Monthly take-home usually drops, but not by the full amount redirected, because taxable income is lower.",
      tone: "neutral",
    });
  }

  if (salary >= 50000 || sacrificePercent >= 8) {
    insights.push({
      title: "This is now a more strategic pay-structure decision",
      description:
        "At higher salaries or stronger sacrifice levels, the trade-off becomes less about headline pay and more about long-term efficiency, pension growth, and threshold management.",
      tone: "warning",
    });
  }

  return insights.slice(0, 3);
}

export function getBonusInsights(params: {
  salary: number;
  bonus: number;
  bonusNet: number;
  bonusTaxDragPercent: number;
}): ToolInsight[] {
  const { salary, bonus, bonusNet, bonusTaxDragPercent } = params;
  const monthlyValue = bonusNet / 12;

  const insights: ToolInsight[] = [];

  if (bonusTaxDragPercent >= 35) {
    insights.push({
      title: "A meaningful share of the bonus is lost to deductions",
      description:
        "Bonuses often feel smaller than expected because tax and National Insurance absorb a noticeable part of the gross amount.",
      tone: "warning",
    });
  }

  insights.push({
    title: "Net bonus is the decision number that matters",
    description: `A £${bonus.toLocaleString(
      "en-GB"
    )} bonus becomes roughly £${bonusNet.toLocaleString(
      "en-GB",
      { maximumFractionDigits: 0 }
    )} after deductions, which is about £${monthlyValue.toLocaleString(
      "en-GB",
      { maximumFractionDigits: 0 }
    )} per month if you spread its value across a year.`,
    tone: "neutral",
  });

  if (salary >= 50000) {
    insights.push({
      title: "Bonus efficiency matters more at this salary level",
      description:
        "As salary rises, bonus money can feel less efficient than users expect, so it is worth comparing a bonus against permanent salary change or pension redirection.",
      tone: "warning",
    });
  }

  return insights.slice(0, 3);
}

export function getOvertimeInsights(params: {
  baseSalary: number;
  overtimeGross: number;
  overtimeNet: number;
  hourlyRate: number;
  overtimeHours: number;
}): ToolInsight[] {
  const {
    baseSalary,
    overtimeGross,
    overtimeNet,
    hourlyRate,
    overtimeHours,
  } = params;

  const effectiveNetHourly =
    overtimeHours > 0 ? overtimeNet / overtimeHours : 0;

  const insights: ToolInsight[] = [];

  insights.push({
    title: "Net overtime value matters more than gross overtime value",
    description: `At £${hourlyRate.toLocaleString(
      "en-GB",
      { maximumFractionDigits: 2 }
    )}/hour gross, the effective net value is about £${effectiveNetHourly.toLocaleString(
      "en-GB",
      { maximumFractionDigits: 2 }
    )}/hour after deductions.`,
    tone: "neutral",
  });

  if (overtimeGross > 0 && overtimeNet / overtimeGross < 0.7) {
    insights.push({
      title: "Overtime is being diluted noticeably by deductions",
      description:
        "Extra hours can still help, but the usable gain per hour may be lower than expected once tax and National Insurance are applied.",
      tone: "warning",
    });
  }

  if (baseSalary >= 50000) {
    insights.push({
      title: "Overtime should be judged against alternative pay improvements",
      description:
        "At higher salary levels, it becomes worth comparing overtime against structured salary progression, pension efficiency, or better baseline pay.",
      tone: "warning",
    });
  }

  return insights.slice(0, 3);
}