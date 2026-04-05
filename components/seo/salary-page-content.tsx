"use client";

import { formatCurrency } from "../../lib/tax/utils/currency";
import type { CalculatorInput, TakeHomeResult } from "../../types/tax";
import InternalLinkBlock from "./internal-link-block";
import {
  getRelatedSalaryLinks,
  getVariantLinks,
} from "../../components/seo/internal-links";

type Props = {
  salary: number;
  input: CalculatorInput;
  result: TakeHomeResult;
  monthlyGross: number;
  weeklyGross: number;
  weeklyNet: number;
};

export default function SalaryPageContent({
  salary,
  input,
  result,
  monthlyGross,
  weeklyGross,
  weeklyNet,
}: Props) {
  const totalDeductions =
    result.incomeTaxAnnual +
    result.nationalInsuranceAnnual +
    result.pensionAnnual +
    result.studentLoanAnnual;

  const keepPercent =
    result.grossAnnual > 0
      ? (result.netAnnual / result.grossAnnual) * 100
      : 0;

  const relatedSalaryLinks = getRelatedSalaryLinks(salary);
  const variantLinks = getVariantLinks(salary);

  return (
    <div className="space-y-10">

      {/* 🔥 REALITY FIRST */}
      <section className="rounded-[30px] app-card-strong p-7">
        <p className="text-sm app-accent">Salary reality</p>

        <h2 className="mt-2 text-2xl font-bold app-title">
          What £{salary.toLocaleString("en-GB")} actually feels like
        </h2>

        <p className="mt-4 text-base leading-8 app-copy">
          A £{salary.toLocaleString("en-GB")} salary sounds high on paper.
          But after deductions, you actually live on{" "}
          <strong>{formatCurrency(result.netMonthly)}</strong> per month.
        </p>

        <p className="mt-4 text-sm app-subtle">
          That means you lose around{" "}
          <strong>{formatCurrency(totalDeductions)}</strong> per year to tax,
          NI, pension, and deductions.
        </p>
      </section>

      {/* 🔥 CORE NUMBERS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Net monthly", formatCurrency(result.netMonthly)],
          ["Net yearly", formatCurrency(result.netAnnual)],
          ["You keep", `${keepPercent.toFixed(0)}%`],
          ["Weekly take-home", formatCurrency(weeklyNet)],
        ].map(([label, value]) => (
          <div key={label} className="app-card p-5">
            <p className="text-sm app-subtle">{label}</p>
            <p className="mt-2 text-xl font-semibold app-title">{value}</p>
          </div>
        ))}
      </section>

      {/* 🔥 DECISION INSIGHT */}
      <section className="rounded-[30px] app-soft p-6">
        <p className="text-sm app-subtle">Important insight</p>

        <p className="mt-3 text-base leading-8 app-copy">
          Most people focus on salary increases.
          But what actually matters is how much of that increase you keep.
        </p>

        <p className="mt-3 text-base leading-8 app-copy">
          At this level, even a £5,000 raise may only increase your monthly income
          by a small amount after tax.
        </p>
      </section>

      {/* 🔥 INTERNAL FLOW (EARLY NOW) */}
      <section className="grid gap-4 md:grid-cols-3">
        <a href="/compare-salary" className="app-card p-5 hover-lift">
          <p className="font-semibold">Compare salaries →</p>
          <p className="text-sm app-copy mt-2">
            See if a higher salary actually improves your life.
          </p>
        </a>

        <a href="/reverse-tax" className="app-card p-5 hover-lift">
          <p className="font-semibold">Reverse salary →</p>
          <p className="text-sm app-copy mt-2">
            Find what you need to earn to reach your target.
          </p>
        </a>

        <a href="/salary-hub" className="app-card p-5 hover-lift">
          <p className="font-semibold">Explore salaries →</p>
          <p className="text-sm app-copy mt-2">
            Browse similar salary levels and insights.
          </p>
        </a>
      </section>

      {/* 🔥 EXPLANATION */}
      <section className="rounded-[30px] app-card p-6">
        <h2 className="text-xl font-semibold app-title">
          Is £{salary.toLocaleString("en-GB")} a good salary?
        </h2>

        <p className="mt-4 text-sm leading-8 app-copy">
          It depends on your lifestyle, rent, and spending.
          What matters most is your real monthly take-home pay.
        </p>

        <p className="mt-4 text-sm leading-8 app-copy">
          Based on this estimate, your usable income is around{" "}
          <strong>{formatCurrency(result.netMonthly)}</strong> per month.
        </p>
      </section>

      {/* 🔁 INTERNAL LINKS (STRONGER) */}
      <InternalLinkBlock
        title="Compare nearby salaries"
        description="See how small salary changes impact your real take-home."
        links={relatedSalaryLinks}
      />

      <InternalLinkBlock
        title="Explore more scenarios"
        description="Monthly, Scotland, student loan and more."
        links={variantLinks}
      />
    </div>
  );
}