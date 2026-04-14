import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";

export default function TaxTrapPage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">
              £100k Tax Trap Explained (UK)
            </h1>

            <p className="mt-4 text-slate-600">
              Between £100,000 and £125,140, your personal allowance is reduced.
              This creates an effective tax rate of over 60%.
            </p>

            <div className="mt-10 space-y-6">
              <div className="p-6 border rounded-xl">
                <h2 className="text-xl font-semibold">Why it happens</h2>
                <p className="mt-3 text-slate-600">
                  For every £2 above £100k, you lose £1 of your tax-free allowance.
                </p>
              </div>

              <div className="p-6 border rounded-xl">
                <h2 className="text-xl font-semibold">What it means</h2>
                <p className="mt-3 text-slate-600">
                  You pay higher tax AND lose tax-free income → effective 60%+ rate.
                </p>
              </div>

              <div className="p-6 border rounded-xl">
                <h2 className="text-xl font-semibold">How to reduce it</h2>
                <ul className="mt-3 list-disc pl-5 text-slate-600">
                  <li>Pension contributions</li>
                  <li>Salary sacrifice</li>
                  <li>Charitable donations</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}