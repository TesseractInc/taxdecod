import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ui/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taxdecod.com"),
  title: {
    default: "TaxDecod | UK salary clarity engine",
    template: "%s | TaxDecod",
  },
  description:
    "TaxDecod helps you understand salary, tax, deductions, and real take-home pay in the UK with clear, visual, decision-focused tools.",
  openGraph: {
    title: "TaxDecod | UK salary clarity engine",
    description:
      "Understand salary, tax, deductions, and real take-home pay in the UK.",
    url: "https://taxdecod.com",
    siteName: "TaxDecod",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxDecod | UK salary clarity engine",
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
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}