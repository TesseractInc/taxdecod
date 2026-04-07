import SiteHeader from "../../../components/layout/site-header";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";
import ExperiencePager from "../../../components/ui/experience-pager";
import SickPayCalculator from "../../../components/leave-pay/sick-pay-calculator";

export default function SickPayPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Leave pay"
            title="Statutory sick pay calculator"
            description="Estimate SSP clearly using average weekly earnings and selected sick weeks, with the statutory minimum framed as the baseline."
          />

          <div className="mt-8">
            <SickPayCalculator />
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/leave-pay/paternity-pay", label: "Paternity pay" }}
              next={{ href: "/benchmarks", label: "Benchmarks" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}