import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import SalarySacrificeCalculator from "../../components/tools/salary-sacrifice/salary-sacrifice-calculator";

export default function SalarySacrificePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">
              Salary Sacrifice Calculator (UK)
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              See how pension or salary sacrifice reduces tax and increases your real take-home efficiency.
            </p>
          </div>

          <div className="mt-10">
            <SalarySacrificeCalculator />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}