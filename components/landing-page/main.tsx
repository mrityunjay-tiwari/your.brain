"use client"

import FAQsSection from "./faqs";
import FooterSection from "./footer";
import {FeaturesPage} from "./features";
import {ScrollPage} from "./scrollPage";
import HeroSection from "./hero";
import {BackgroundRippleEffect} from "../acceternity/background-ripple-effect";

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      {/* <ScrollPage /> */}
      <FAQsSection />
      {/* <FeaturesPage /> */}
    </div>
  );
}
