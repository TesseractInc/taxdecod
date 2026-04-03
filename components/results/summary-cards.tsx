"use client";

import { Wallet, PiggyBank, Landmark, TrendingUp } from "lucide-react";
import { TakeHomeResult } from "../../types/tax";
import { formatCurrency } from "../../lib/tax/utils/currency";

type SummaryCardsProps = {
  result: TakeHomeResult;
};

const cards = [
  {
    key: "grossAnnual",
    label: "Gross annual pay",
    icon: Wallet,
    tone: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "totalDeductionsAnnual",
    label: "Total deductions",
    icon: Landmark,
    tone: "text-rose-600 dark:text-rose-400",
  },
  {
    key: "netAnnual",
    label: "Net annual pay",
    icon: TrendingUp,
    tone: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "netMonthly",
    label: "Net monthly pay",
    icon: PiggyBank,
    tone: "text-cyan-600 dark:text-cyan-400",
  },
] as const;

export default function SummaryCards({ result }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.key} className="app-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm app-subtle">{card.label}</p>
              <Icon className={`h-5 w-5 ${card.tone}`} />
            </div>

            <p className="mt-4 text-2xl font-semibold app-title">
              {formatCurrency(result[card.key])}
            </p>
          </div>
        );
      })}
    </div>
  );
}