import Reveal from "../ui/reveal";

export default function UseCases() {
  const cases = [
    {
      title: "Compare job offers",
      desc: "See the real after-tax difference between two salaries before making a career decision.",
    },
    {
      title: "Understand your payslip",
      desc: "Break down PAYE, NI, pension, student loan, and tax code in a way that actually makes sense.",
    },
    {
      title: "Budget with confidence",
      desc: "Focus on real monthly take-home pay instead of relying on gross salary assumptions.",
    },
    {
      title: "Check raises and bonuses",
      desc: "Understand how much of extra pay you actually keep after the deductions kick in.",
    },
  ];

  return (
    <section className="py-16" id="use-cases">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Real use cases
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Built for the salary questions people really have
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              TaxDecod works best when it helps users make a decision, not just
              generate a number.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}