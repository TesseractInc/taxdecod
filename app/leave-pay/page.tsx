import Link from "next/link";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";

const leaveTools = [
  {
    title: "Maternity pay calculator",
    description:
      "Estimate Statutory Maternity Pay with the first 6 weeks and remaining 33 weeks shown clearly.",
    href: "/leave-pay/maternity-pay",
    badge: "SMP",
  },
  {
    title: "Paternity pay calculator",
    description:
      "Estimate Statutory Paternity Pay based on average weekly earnings and current weekly cap rules.",
    href: "/leave-pay/paternity-pay",
    badge: "SPP",
  },
  {
    title: "Sick pay calculator",
    description:
      "Estimate Statutory Sick Pay and see the weekly and total amount over the selected sickness period.",
    href: "/leave-pay/sick-pay",
    badge: "SSP",
  },
];

export default function LeavePayHubPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Leave pay"
            title="Estimate maternity, paternity, and sick pay"
            description="This part of TaxDecod extends beyond salary take-home and helps users estimate common statutory pay scenarios with clearer explanations."
          />

          <div className="mt-8 app-card rounded-[30px] p-6 sm:p-7">
            <p className="text-sm font-medium app-accent">Trust framing</p>
            <h2 className="mt-2 text-2xl font-semibold app-title">
              Built around current statutory pay rules
            </h2>
            <p className="mt-3 text-sm leading-8 app-copy">
              These calculators are designed around the current statutory
              structure published on GOV.UK. They are useful for planning and
              expectation-setting, but employers may offer enhanced packages on
              top of the statutory minimum.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {leaveTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="app-card-strong rounded-[28px] p-6 transition hover-lift"
              >
                <div className="inline-flex rounded-full app-chip px-3 py-2 text-xs font-semibold">
                  {tool.badge}
                </div>
                <h3 className="mt-4 text-2xl font-semibold app-title">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-8 app-copy">
                  {tool.description}
                </p>
                <p className="mt-5 text-sm font-semibold app-accent">
                  Open calculator →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/salary-tools", label: "Salary tools" }}
              next={{ href: "/benchmarks", label: "Benchmarks" }}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}