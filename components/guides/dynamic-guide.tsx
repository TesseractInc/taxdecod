import Link from "next/link";
import SnippetAnswerBlock from "../seo/snippet-answer-block";
import { getSalaryPageData } from "../seo/salary-pages";
import { formatCurrency } from "../../lib/tax/utils/currency";

type DynamicGuideProps = {
  slug: string;
  salary: number;
  type: "isGoodSalary" | "taxOnSalary" | "decision";
};

function clampMonthlyTarget(value: number) {
  return Math.max(1500, Math.min(5000, Math.round(value / 100) * 100));
}

function getDecisionAnchorLinks(slug: string) {
  if (slug.includes("40000-vs-50000")) {
    return {
      compareHref: "/compare/40000-vs-50000-after-tax",
      compareLabel: "Compare £40k vs £50k after tax",
    };
  }

  if (slug.includes("45000-vs-55000")) {
    return {
      compareHref: "/compare/45000-vs-55000-after-tax",
      compareLabel: "Compare £45k vs £55k after tax",
    };
  }

  if (slug.includes("50000-vs-60000")) {
    return {
      compareHref: "/compare/50000-vs-60000-after-tax",
      compareLabel: "Compare £50k vs £60k after tax",
    };
  }

  if (slug.includes("60000-vs-80000")) {
    return {
      compareHref: "/compare/60000-vs-80000-after-tax",
      compareLabel: "Compare £60k vs £80k after tax",
    };
  }

  return {
    compareHref: "/compare/40000-vs-50000-after-tax",
    compareLabel: "Compare £40k vs £50k after tax",
  };
}

export function DynamicGuide({
  slug,
  salary,
  type,
}: DynamicGuideProps) {
  const normalizedSalary = Math.max(10000, salary);
  const data = getSalaryPageData(normalizedSalary);
  const monthly = data.result.netMonthly;
  const monthlyTarget = clampMonthlyTarget(monthly);
  const lowerSalary = Math.max(10000, normalizedSalary - 10000);
  const higherSalary = normalizedSalary + 10000;

  if (type === "decision") {
    const anchor = getDecisionAnchorLinks(slug);

    return (
      <>
        <SnippetAnswerBlock
          question="Is this salary increase actually worth it?"
          answer="A salary increase is only worth it if the real monthly gain after tax is meaningful. In the UK, a chunk of the headline raise is often absorbed by tax and deductions, so the practical improvement can feel much smaller than expected."
          bullets={[
            "Gross increases are not the same as usable monthly improvement",
            "The real decision is about net monthly gain after deductions",
            "Nearby comparison routes are the best way to test a raise properly",
            "Monthly affordability matters more than headline salary excitement",
          ]}
        />

        <h2 className="mt-10 text-2xl font-semibold app-title">
          Why raise decisions are easy to misread
        </h2>

        <p className="mt-4 app-copy">
          A salary increase can look strong when seen as a headline number, but
          what actually changes day to day is the money left after deductions.
          That is why many raise decisions feel less dramatic in real life than
          they look on paper.
        </p>

        <p className="mt-4 app-copy">
          The smartest way to judge a raise is to compare the two salary routes
          directly, check the net monthly difference, and then decide whether
          that difference changes rent, savings, commuting, or lifestyle in a
          meaningful way.
        </p>

        <h2 className="mt-10 text-2xl font-semibold app-title">
          What to check before accepting a higher salary
        </h2>

        <ul className="mt-4 space-y-3 app-copy">
          <li>Check the monthly net difference, not just the annual gross jump.</li>
          <li>Compare both salaries after tax using a fixed comparison page.</li>
          <li>Judge the stronger salary in a city-based context if costs differ.</li>
          <li>Use reverse salary planning if you already know your target monthly income.</li>
        </ul>

        <div className="mt-10 space-y-3">
          <Link href={anchor.compareHref} className="app-link">
            → {anchor.compareLabel}
          </Link>

          <Link href="/compare-salary" className="app-link">
            → Use the live comparison tool
          </Link>

          <Link href="/reverse-tax" className="app-link">
            → Reverse plan your target income
          </Link>
        </div>
      </>
    );
  }

  if (type === "isGoodSalary") {
    return (
      <>
        <SnippetAnswerBlock
          question={`Is ${formatCurrency(salary)} a good salary in the UK?`}
          answer={`${formatCurrency(
            salary
          )} can be considered good depending on location, housing costs, and lifestyle. The stronger way to judge it is by the after-tax monthly result, which is around ${formatCurrency(
            monthly
          )}.`}
          bullets={[
            "Monthly take-home matters more than headline gross pay",
            "City and rent context change what feels comfortable",
            "Nearby salary bands are useful for judging trade-offs",
            "Regional good-salary pages make the judgment more practical",
          ]}
        />

        <h2 className="mt-10 text-2xl font-semibold app-title">
          How to judge this salary properly
        </h2>

        <p className="mt-4 app-copy">
          A salary of {formatCurrency(salary)} should not be judged as “good” or
          “bad” in isolation. The practical reading depends on the monthly net
          amount, the cost of housing, debt, transport, and whether you are
          comparing it against weaker or stronger nearby salary bands.
        </p>

        <p className="mt-4 app-copy">
          That is why the best next step is usually to open the full salary page,
          compare it with a nearby salary route, and then look at the same
          salary in a city-based context.
        </p>

        <div className="mt-10 space-y-3">
          <Link href={`/${salary}-after-tax-uk`} className="app-link">
            → Full salary breakdown
          </Link>

          <Link
            href={`/compare/${lowerSalary}-vs-${salary}-after-tax`}
            className="app-link"
          >
            → Compare with the nearby lower salary
          </Link>

          <Link href={`/good-salary/${salary}/london`} className="app-link">
            → View this salary in London context
          </Link>
        </div>
      </>
    );
  }

  if (type === "taxOnSalary") {
    return (
      <>
        <SnippetAnswerBlock
          question={`How much tax do you pay on ${formatCurrency(salary)}?`}
          answer={`On ${formatCurrency(
            salary
          )}, you typically pay Income Tax and National Insurance before arriving at around ${formatCurrency(
            data.result.netAnnual
          )} per year after deductions under standard UK-style assumptions.`}
          bullets={[
            "Income Tax and National Insurance both affect take-home pay",
            `Monthly net is around ${formatCurrency(data.result.netMonthly)}`,
            "The real question is what you keep, not only what is taken",
            "Comparison pages help show whether a higher salary is truly better",
          ]}
        />

        <h2 className="mt-10 text-2xl font-semibold app-title">
          Why tax on salary matters for real decisions
        </h2>

        <p className="mt-4 app-copy">
          Tax matters because it changes how a salary feels in practice. A gross
          increase can appear attractive, but the usable monthly improvement
          after deductions is what actually affects everyday life.
        </p>

        <p className="mt-4 app-copy">
          This is why tax guides work best when connected to salary breakdown
          pages, nearby comparison routes, and monthly planning pages.
        </p>

        <div className="mt-10 space-y-3">
          <Link href={`/${salary}-after-tax-uk`} className="app-link">
            → Full salary breakdown
          </Link>

          <Link
            href={`/compare/${lowerSalary}-vs-${salary}-after-tax`}
            className="app-link"
          >
            → Compare this salary with a nearby lower band
          </Link>

          <Link href={`/monthly-take-home/${monthlyTarget}`} className="app-link">
            → Reverse from the monthly take-home level
          </Link>

          <Link href={`/guides/is-${salary}-a-good-salary-uk`} className="app-link">
            → Is this salary actually good?
          </Link>
        </div>

        <h2 className="mt-10 text-2xl font-semibold app-title">
          What to do next after reading the tax view
        </h2>

        <p className="mt-4 app-copy">
          Once you understand the deduction side, the next step is normally to
          judge whether the salary is good in practical terms, whether a nearby
          higher salary is materially stronger, or what monthly target you
          should actually aim for.
        </p>

        <div className="mt-10 space-y-3">
          <Link
            href={`/compare/${salary}-vs-${higherSalary}-after-tax`}
            className="app-link"
          >
            → Compare against a nearby higher salary
          </Link>

          <Link href={`/good-salary/${salary}/london`} className="app-link">
            → Judge this salary in a city context
          </Link>
        </div>
      </>
    );
  }

  return null;
}