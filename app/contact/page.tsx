import Link from "next/link";
import type { Metadata } from "next";
import {
  Mail,
  Globe,
  BriefcaseBusiness,
  Send,
  ShieldCheck,
} from "lucide-react";
import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import PageHero from "../../components/ui/page-hero";
import ExperiencePager from "../../components/ui/experience-pager";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TaxDecod for support, partnerships, editorial, product, or commercial enquiries.",
};

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
    value: "Explore wider business-facing routes",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "General enquiries",
    value: "Product, editorial, partnerships, media",
    href: "mailto:hello@taxdecod.com?subject=General%20Enquiry",
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
            title="Get in touch with TaxDecod"
            description="Use this page for support, partnerships, editorial questions, product feedback, or broader commercial discussions."
            ctaLabel="Open calculator"
            ctaHref="/calculator"
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
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

                    <h2 className="mt-5 text-xl font-semibold app-title">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 app-copy">
                      {item.value}
                    </p>
                  </Link>
                );
              })}
            </div>

            <aside className="space-y-6">
              <div className="app-card p-6">
                <div className="inline-flex rounded-2xl p-3 app-soft">
                  <ShieldCheck className="h-6 w-6 app-accent" />
                </div>
                <h2 className="mt-5 text-xl font-semibold app-title">
                  Trust and legitimacy
                </h2>
                <p className="mt-3 text-sm leading-7 app-copy">
                  This page exists to make TaxDecod feel contactable, visible,
                  and accountable. Users should never feel they are using a
                  faceless salary tool with no way to reach the team behind it.
                </p>
              </div>

              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Best reasons to contact
                </h2>
                <div className="mt-4 space-y-3">
                  {[
                    "Product feedback or accuracy questions",
                    "Commercial or partnership opportunities",
                    "Editorial or media enquiries",
                    "Support with platform usage",
                  ].map((item) => (
                    <div key={item} className="app-soft rounded-2xl px-4 py-3">
                      <p className="text-sm leading-7 app-copy">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="app-card p-6">
                <h2 className="text-xl font-semibold app-title">
                  Related trust pages
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <Link href="/methodology" className="block app-copy hover:underline">
                    Methodology
                  </Link>
                  <Link href="/assumptions" className="block app-copy hover:underline">
                    Assumptions
                  </Link>
                  <Link href="/disclaimer" className="block app-copy hover:underline">
                    Disclaimer
                  </Link>
                  <Link href="/privacy-policy" className="block app-copy hover:underline">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block app-copy hover:underline">
                    Terms
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10">
            <ExperiencePager
              previous={{ href: "/methodology", label: "Methodology" }}
              next={{ href: "/calculator", label: "Back to calculator" }}
            />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}