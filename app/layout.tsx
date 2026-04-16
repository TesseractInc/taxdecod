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
    default: "TaxDecod | UK salary intelligence platform",
    template: "%s | TaxDecod",
  },
  description:
    "TaxDecod helps people in the UK understand salary, deductions, and take-home pay with a more visual, modern, decision-focused experience.",
  openGraph: {
    title: "TaxDecod | UK salary intelligence platform",
    description:
      "Understand salary, tax, deductions, and real take-home pay in the UK.",
    url: "https://taxdecod.com",
    siteName: "TaxDecod",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxDecod | UK salary intelligence platform",
    description:
      "Understand salary, tax, deductions, and real take-home pay in the UK.",
  },
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
            {children}
            <Analytics />
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}