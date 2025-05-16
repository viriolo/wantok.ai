
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";

const Index = () => {
  const heroProps = {
    title: "viinno.com",
    subtitle: "Professional services simplified for Papua New Guinea",
    ctaText: "Get Started",
    ctaLink: "/signup",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "#services",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero {...heroProps} />
        <ServiceCards />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
