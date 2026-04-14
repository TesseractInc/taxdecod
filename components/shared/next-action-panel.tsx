import Link from "next/link";

type NextAction = {
  title: string;
  description: string;
  href: string;
};

type Props = {
  primary: NextAction;
  secondary?: NextAction[];
};

export default function NextActionPanel({ primary, secondary = [] }: Props) {
  return (
    <section className="space-y-6">

      {/* PRIMARY ACTION */}
      <Link
        href={primary.href}
        className="block rounded-[28px] border-2 border-sky-500 bg-sky-50 p-6 transition hover:bg-sky-100 dark:bg-sky-950/30 dark:hover:bg-sky-950/50"
      >
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {primary.title}
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {primary.description}
        </p>
      </Link>

      {/* SECONDARY ACTIONS */}
      <div className="grid gap-4 md:grid-cols-2">
        {secondary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[24px] border p-5 hover:border-sky-300 dark:hover:border-sky-700"
          >
            <p className="font-semibold">{item.title}</p>
            <p className="mt-2 text-sm text-slate-500">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}