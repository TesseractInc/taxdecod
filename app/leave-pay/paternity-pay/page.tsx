import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import PageHero from "../../../components/ui/page-hero";
import ExperiencePager from "../../../components/ui/experience-pager";
import PaternityPayCalculator from "../../../components/leave-pay/paternity-pay-calculator";

export default function PaternityPayPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Leave pay"
            title="Statutory paternity pay calculator"
            description="Estimate SPP clearly using average weekly earnings and a clean statutory-weekly-rate view."
          />

          <div className="mt-8">
            <PaternityPayCalculator />
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/leave-pay/maternity-pay", label: "Maternity pay" }}
              next={{ href: "/leave-pay/sick-pay", label: "Sick pay" }}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}