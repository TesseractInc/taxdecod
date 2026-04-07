import SiteHeader from "../../../components/layout/site-header";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";
import ExperiencePager from "../../../components/ui/experience-pager";
import MaternityPayCalculator from "../../../components/leave-pay/maternity-pay-calculator";

export default function MaternityPayPage() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Leave pay"
            title="Statutory maternity pay calculator"
            description="Estimate SMP clearly with weekly and total values, then use it as a planning baseline before enhanced employer pay is considered."
          />

          <div className="mt-8">
            <MaternityPayCalculator />
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/leave-pay", label: "Leave pay hub" }}
              next={{ href: "/leave-pay/paternity-pay", label: "Paternity pay" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}