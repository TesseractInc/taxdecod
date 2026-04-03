import Container from "../ui/container";

const features = [
  {
    title: "Full deduction clarity",
    description:
      "See exactly where your money goes across tax, National Insurance, pension, and student loan.",
  },
  {
    title: "Built for real UK users",
    description:
      "Useful for employees, students, graduates, and professionals comparing salary offers.",
  },
  {
    title: "Plain-English explanation",
    description:
      "Turn confusing payroll deductions into clear explanations people can actually understand.",
  },
  {
    title: "Premium modern experience",
    description:
      "A faster, cleaner, more trustworthy alternative to outdated salary calculator websites.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 sm:py-20" id="features">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
            Why TaxDecod
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built to explain salary, not just calculate it
          </h2>
          <p className="mt-4 text-slate-400">
            Your edge is not only calculation accuracy. It is clarity, confidence,
            and a much better user experience.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}