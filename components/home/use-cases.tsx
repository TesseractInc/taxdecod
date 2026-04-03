import Reveal from "../ui/reveal";

export default function UseCases() {
  const cases = [
    {
      title: "Compare job offers",
      desc: "See the real after-tax difference between two salaries before making a decision.",
    },
    {
      title: "Understand your payslip",
      desc: "Break down PAYE, NI, pension, student loan, and tax code in plain English.",
    },
    {
      title: "Budget with confidence",
      desc: "Focus on your real monthly take-home pay rather than just gross salary.",
    },
    {
      title: "Check raises and bonuses",
      desc: "See how much of extra pay you actually keep after deductions.",
    },
  ];

  return (
    <section className="py-16" id="use-cases">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Use cases
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Built for real salary questions
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              TaxDecod is not just for quick calculations. It is designed to help
              users understand salary decisions, payslips, and real monthly income
              more clearly.
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