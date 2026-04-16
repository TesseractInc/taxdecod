import Link from "next/link";

type EmailCapturePanelProps = {
  title: string;
  description: string;
  buttonLabel?: string;
};

export default function EmailCapturePanel({
  title,
  description,
  buttonLabel = "Email delivery",
}: EmailCapturePanelProps) {
  return (
    <section
      className="overflow-hidden rounded-[30px] border"
      style={{
        borderColor: "var(--line)",
        background: "var(--card-strong)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="border-b px-6 py-6 sm:px-7"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="text-sm font-medium app-accent">Follow-up and saving</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight app-title sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-8 app-copy sm:text-[15px]">
          {description}
        </p>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-[1.15fr_0.85fr] sm:p-7">
        <div
          className="rounded-[24px] border px-5 py-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-2)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface-1)",
                color: "var(--muted)",
              }}
            >
              {buttonLabel}
            </span>
            <span className="text-sm font-medium app-title">
              Keep the result without relying on email delivery
            </span>
          </div>

          <p className="mt-4 text-sm leading-8 app-copy">
            For now, the most reliable way to keep this result is to save the
            route where available, bookmark the page, or return through the same
            salary path later. This keeps the experience calm and avoids promising
            a delivery step that is not central to the product.
          </p>
        </div>

        <div
          className="rounded-[24px] border px-5 py-5"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface-2)",
          }}
        >
          <p className="text-sm font-semibold app-title">
            Better next steps
          </p>

          <div className="mt-4 grid gap-3">
            <Link href="/calculator" className="app-button-primary justify-center sm:justify-start">
              Open salary calculator
            </Link>
            <Link href="/compare-salary" className="app-button-secondary justify-center sm:justify-start">
              Compare salary outcomes
            </Link>
            <Link href="/contact" className="app-button-secondary justify-center sm:justify-start">
              Contact TaxDecod
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}