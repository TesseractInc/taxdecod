import Link from "next/link";
import SiteHeader from "../components/layout/site-header";
import Container from "../components/ui/container";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="py-20">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm font-medium text-sky-300">Page not found</p>
            <h1 className="mt-3 text-4xl font-bold text-white">
              We could not find that page
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              The page may not exist yet, or the URL may be incorrect. Try going
              back to the homepage and using one of the salary pages from there.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex rounded-2xl border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400/20"
              >
                Go back home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}