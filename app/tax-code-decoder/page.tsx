import SiteHeader from "../../components/layout/site-header";
import SiteFooter from "../../components/layout/site-footer";
import Container from "../../components/ui/container";
import TaxCodeDecoder from "../../components/tools/tax-code-decoder";

export default function TaxCodePage() {
  return (
    <main className="app-shell">
      <SiteHeader />

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">
              Tax Code Decoder (UK)
            </h1>
            <p className="mt-4 text-slate-600">
              Understand what your tax code actually means and how it affects your salary.
            </p>
          </div>

          <div className="mt-10">
            <TaxCodeDecoder />
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  );
}