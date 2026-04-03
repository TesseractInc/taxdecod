import Link from "next/link";
import { Mail, Globe, BriefcaseBusiness, Send } from "lucide-react";
import SiteHeader from "../../components/layout/site-header";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";

const contactCards = [
  {
    title: "Email",
    value: "hello@taxdecod.com",
    href: "mailto:hello@taxdecod.com",
    icon: Mail,
  },
  {
    title: "Website",
    value: "taxdecod.com",
    href: "https://taxdecod.com",
    icon: Globe,
  },
  {
    title: "Services",
    value: "Explore other platforms",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "General enquiries",
    value: "Product, partnerships, media",
    href: "mailto:hello@taxdecod.com?subject=Enquiry",
    icon: Send,
  },
];

export default function ContactPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-10 sm:py-14">
        <Container>
          <PageHero
            eyebrow="Contact"
            title="Get in touch"
            description="Use this page for enquiries, partnerships, product questions, and broader service discussions."
            ctaLabel="View services"
            ctaHref="/services"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {contactCards.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="app-card p-6 hover-lift"
                >
                  <div className="inline-flex rounded-2xl p-3 app-soft">
                    <Icon className="h-6 w-6 app-accent" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold app-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 app-copy">{item.value}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/services", label: "Services and platforms" }}
              next={{ href: "/calculator", label: "Back to calculator" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}