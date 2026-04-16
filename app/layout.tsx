import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ThemeProvider from "../components/ui/theme-provider";
import SupabaseAuthProvider from "../components/auth/supabase-auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taxdecod.com"),
  title: {
    default: "TaxDecod | UK Salary Calculator, Payslip Checker and Take-Home Pay Tools",
    template: "%s | TaxDecod",
  },
  description:
    "TaxDecod helps users in the UK understand salary, deductions, payslips, take-home pay, and salary decisions with clearer estimation and interpretation tools.",
  applicationName: "TaxDecod",
  alternates: {
    canonical: "/",
  },
  category: "finance",
  keywords: [
    "uk salary calculator",
    "salary after tax uk",
    "take home pay uk",
    "payslip checker uk",
    "reverse salary calculator uk",
    "student loan calculator uk",
    "tax refund calculator uk",
  ],
  openGraph: {
    title: "TaxDecod | UK Salary Calculator, Payslip Checker and Take-Home Pay Tools",
    description:
      "Understand UK salary, tax, deductions, payslips, and take-home pay with clearer decision-support tools.",
    url: "https://taxdecod.com",
    siteName: "TaxDecod",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxDecod | UK Salary Calculator, Payslip Checker and Take-Home Pay Tools",
    description:
      "Understand UK salary, tax, deductions, payslips, and take-home pay with clearer decision-support tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TaxDecod",
  url: "https://taxdecod.com",
  logo: "https://taxdecod.com/favicon.ico",
  email: "contact@taxdecod.com",
  description:
    "TaxDecod is a UK salary and deduction interpretation platform designed to help users understand take-home pay, payslips, and salary decisions more clearly.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TaxDecod",
  url: "https://taxdecod.com",
  inLanguage: "en-GB",
  description:
    "UK salary calculator, payslip checker, take-home pay, and salary decision platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>
        <ThemeProvider>
          <SupabaseAuthProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationJsonLd),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteJsonLd),
              }}
            />
            {children}
            <Analytics />
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}