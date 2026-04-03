import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/ui/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://taxdecod.com"),
  title: {
    default: "TaxDecod | Decode your salary",
    template: "%s | TaxDecod",
  },
  description:
    "TaxDecod helps you understand salary, tax, deductions, and real take-home pay in the UK.",
  openGraph: {
    title: "TaxDecod | Decode your salary",
    description:
      "Understand salary, tax, deductions, and real take-home pay in the UK.",
    url: "https://taxdecod.com",
    siteName: "TaxDecod",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxDecod | Decode your salary",
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
    <html lang="en-GB" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}