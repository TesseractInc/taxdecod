"use client";

import HeroSection from "./hero-section";
import SalarySignalStrip from "./salary-signal-strip";
import MoneyExplainer from "./money-explainer";

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      <SalarySignalStrip />
      <MoneyExplainer />
    </>
  );
}