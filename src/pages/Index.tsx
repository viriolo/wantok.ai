
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  const heroProps = {
    title: "Papua New Guinea Tax System",
    subtitle: "Simplify your tax management with our comprehensive tax calculation and compliance system",
    ctaText: "Get Started",
    ctaLink: "/signup",
    secondaryCtaText: "Try Tax Calculator",
    secondaryCtaLink: "/tax-calculator",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero {...heroProps} />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
