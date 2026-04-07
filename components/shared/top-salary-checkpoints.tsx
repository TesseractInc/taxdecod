import Link from "next/link";

type TopSalaryCheckpointsProps = {
  currentSalary: number;
};

const checkpoints = [25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000];

export default function TopSalaryCheckpoints({
  currentSalary,
}: TopSalaryCheckpointsProps) {
  const nearest = checkpoints.reduce((prev, current) =>
    Math.abs(current - currentSalary) < Math.abs(prev - currentSalary)
      ? current
      : prev
  );

  return (
    <section className="app-card rounded-[30px] p-6 sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent">
            Top salary checkpoints
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight app-title sm:text-3xl">
            Explore the most searched salary ranges
          </h2>
          <p className="mt-3 text-sm leading-8 app-copy">
            Jump between common UK salary checkpoints to understand whether the
            next salary level actually changes your monthly reality.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {checkpoints.map((salary, index) => {
          const active = salary === nearest;

          return (
            <Link
              key={salary}
              href={`/${salary}-after-tax-uk`}
              className="rounded-[20px] border px-4 py-4 transition hover-lift"
              style={{
                borderColor: active
                  ? "color-mix(in srgb, var(--primary) 30%, var(--line))"
                  : "var(--line)",
                background: active
                  ? "color-mix(in srgb, var(--primary) 10%, var(--card))"
                  : "var(--card)",
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.14em] app-subtle">
                Rank {index + 1}
              </p>
              <p className="mt-2 text-base font-semibold app-title">
                £{salary.toLocaleString("en-GB")}
              </p>
              <p className="mt-2 text-xs app-copy">
                {active ? "Closest to this page" : "Open salary breakdown"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}