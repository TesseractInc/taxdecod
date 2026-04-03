"use client";

import HeroSection from "./hero-section";
import SalarySignalStrip from "./salary-signal-strip";
import MoneyExplainer from "./money-explainer";
import JourneyCards from "./journey-cards";
import FeaturedInsights from "./featured-insights";

export default function HomeClient() {
  return (
    <>
      <HeroSection />
      <SalarySignalStrip />
      <MoneyExplainer />
      <JourneyCards />
      <FeaturedInsights />
    </>
  );
}