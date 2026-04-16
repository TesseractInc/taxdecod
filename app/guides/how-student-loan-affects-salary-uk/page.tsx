import type { Metadata } from "next";
import SiteHeader from "../../../components/layout/site-header";
import SiteFooter from "../../../components/layout/site-footer";
import Container from "../../../components/ui/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Student Loan Affects Your Salary in the UK",
  description:
    "Understand how student loan repayments reduce your take-home salary in the UK.",
};

export default function Page() {
  return (
    <main className="app-shell">
      <SiteHeader />
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold app-title">
            How Student Loan Affects Your Salary in the UK
          </h1>

          <p className="mt-4 app-copy">
            Student loan repayments can significantly reduce your take-home pay,
            especially once your salary crosses repayment thresholds.
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            How it works
          </h2>

          <p className="mt-3 app-copy">
            You repay a percentage of your income above a certain threshold,
            depending on your loan plan (Plan 1, Plan 2, or Plan 5).
          </p>

          <h2 className="mt-10 text-xl font-semibold app-title">
            Real impact
          </h2>

          <p className="mt-3 app-copy">
            Even small increases in salary can result in noticeable extra
            deductions, reducing the real benefit of pay rises.
          </p>

          <div className="mt-12">
            <Link href="/calculator" className="app-button-primary">
              Calculate your salary with student loan
            </Link>
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  );
}