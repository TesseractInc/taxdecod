import { TakeHomeResult } from "../../../types/tax";

export type SalaryLeaderboardResult = {
  band: string;
  percentileLabel: string;
  summary: string;
  badge: "low" | "mid" | "good" | "high";
};

export function getSalaryLeaderboard(result: TakeHomeResult): SalaryLeaderboardResult {
  const gross = result.grossAnnual;

  if (gross < 20000) {
    return {
      band: "Entry / lower income band",
      percentileLabel: "Below mid-range",
      summary:
        "This salary sits in a lower UK earnings range and usually leaves less room after deductions.",
      badge: "low",
    };
  }

  if (gross < 30000) {
    return {
      band: "Early career band",
      percentileLabel: "Lower-middle range",
      summary:
        "This is a common salary range for early-career roles, but take-home can still feel tight depending on deductions and rent.",
      badge: "mid",
    };
  }

  if (gross < 45000) {
    return {
      band: "Solid mid-range band",
      percentileLabel: "Middle range",
      summary:
        "This is a stronger working salary range and often feels more stable, though deductions still make a noticeable difference.",
      badge: "good",
    };
  }

  if (gross < 70000) {
    return {
      band: "Strong salary band",
      percentileLabel: "Upper-middle range",
      summary:
        "This salary is strong on paper, but users often underestimate how much tax and pension reduce the real result.",
      badge: "high",
    };
  }

  return {
    band: "High income band",
    percentileLabel: "Higher earning range",
    summary:
      "This is a high salary range, but marginal deductions become much more visible as income rises.",
    badge: "high",
  };
}