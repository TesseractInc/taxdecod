import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PagerLink = {
  href: string;
  label: string;
};

type ExperiencePagerProps = {
  previous?: PagerLink;
  next?: PagerLink;
};

export default function ExperiencePager({
  previous,
  next,
}: ExperiencePagerProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {previous ? (
        <Link href={previous.href} className="app-card p-5 hover-lift">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl p-3 app-soft">
              <ArrowLeft className="h-5 w-5 app-accent" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] app-subtle">
                Previous
              </p>
              <p className="mt-1 text-lg font-semibold app-title">
                {previous.label}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={next.href} className="app-card p-5 hover-lift">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] app-subtle">
                Next
              </p>
              <p className="mt-1 text-lg font-semibold app-title">
                {next.label}
              </p>
            </div>
            <div className="rounded-2xl p-3 app-soft">
              <ArrowRight className="h-5 w-5 app-accent" />
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
}