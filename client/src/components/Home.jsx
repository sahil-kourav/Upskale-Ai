import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import PlatformOverview from "./PlatformOverview";
import HowItWorks from "./HowItWorks";
import MockInterviewShowcase from "./MockInterviewShowcase";
import ReportsSection from "./ReportsSection";
import WhyChooseUs from "./WhyChooseUs";
import CTA from "./CTA";

const Home = () => {
  return (
    <div className="bg-[#0a0a12] scroll-smooth">
      <Hero />
      <PlatformOverview />
      <MockInterviewShowcase />
      <HowItWorks />
      <Features />
      <ReportsSection />
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default Home;