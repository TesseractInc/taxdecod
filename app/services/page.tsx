import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";
import ServicesShowcase from "../../components/home/services-showcase";

export default function ServicesPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Services"
            title="Other products, services, and platforms"
            description="Use this page to guide visitors from TaxDecod into your broader digital ecosystem in a polished, trust-first way."
            ctaLabel="Open calculator"
            ctaHref="/calculator"
          />

          <ServicesShowcase />

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/salary-pages", label: "Salary pages hub" }}
              next={{ href: "/contact", label: "Contact and enquiries" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}