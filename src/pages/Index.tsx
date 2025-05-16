
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ServiceCards from "@/components/ServiceCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlurCard } from "@/components/ui/blur-card";
import { useScrollAnimation } from "@/lib/animations";
import { CheckCircle, Star, Users } from "lucide-react";

const Index = () => {
  const heroProps = {
    title: "wantok.ai",
    subtitle: "Professional services simplified for Papua New Guinea",
    ctaText: "Get Started",
    ctaLink: "/signup",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "#services",
  };
  
  const testimonialAnimation = useScrollAnimation({
    initialClass: 'opacity-0 translate-y-4',
    animateClass: 'opacity-100 translate-y-0 transition-all duration-700 ease-out',
    delay: 300,
  });
  
  const testimonials = [
    {
      name: "James Kobol",
      role: "Business Owner",
      company: "PNGTech Solutions",
      quote: "viinno.com has made tax compliance so much easier for my business. The calculations are accurate and the interface is intuitive.",
      rating: 5
    },
    {
      name: "Sarah Waka",
      role: "HR Manager",
      company: "Highland Enterprises",
      quote: "The legal document review service saved us time and money. We received expert advice quickly when we needed it most.",
      rating: 5
    },
    {
      name: "Michael Temu",
      role: "Financial Controller",
      company: "Port Moresby Trading",
      quote: "As a financial professional, I appreciate the accuracy and detail in the tax calculations. This service has become essential for our operations.",
      rating: 4
    }
  ];

  return (
    <div className="flex flex-col">
      <main>
        <Hero {...heroProps} />
        <ServiceCards />
        
        <section className="py-16">
          <div className="container max-w-6xl px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose viinno.com</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers distinct advantages for businesses and individuals in Papua New Guinea.
              </p>
            </div>
            
            <Tabs defaultValue="businesses" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="businesses">For Businesses</TabsTrigger>
                <TabsTrigger value="individuals">For Individuals</TabsTrigger>
              </TabsList>
              <TabsContent value="businesses">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tax Compliance</h3>
                    <p className="text-muted-foreground">
                      Stay compliant with PNG tax regulations with our up-to-date calculators and advisories.
                    </p>
                  </BlurCard>
                  
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Team Management</h3>
                    <p className="text-muted-foreground">
                      Manage employee tax declarations and payroll calculations efficiently through one platform.
                    </p>
                  </BlurCard>
                  
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
                    <p className="text-muted-foreground">
                      Access professional legal advice for business contracts, disputes, and compliance issues.
                    </p>
                  </BlurCard>
                </div>
              </TabsContent>
              
              <TabsContent value="individuals">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Personal Taxes</h3>
                    <p className="text-muted-foreground">
                      Calculate your income tax accurately with our easy-to-use PNG tax calculator.
                    </p>
                  </BlurCard>
                  
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Family Planning</h3>
                    <p className="text-muted-foreground">
                      Get advice on dependant declarations and optimize your family's tax situation legally.
                    </p>
                  </BlurCard>
                  
                  <BlurCard className="p-6">
                    <div className="mb-4 p-3 rounded-full bg-secondary/50 inline-flex">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Personal Legal</h3>
                    <p className="text-muted-foreground">
                      Receive guidance on personal legal matters including property, employment, and contracts.
                    </p>
                  </BlurCard>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section id="testimonials" className="py-16 bg-secondary/10 dark:bg-secondary/5">
          <div className="container max-w-6xl px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by businesses and individuals across Papua New Guinea.
              </p>
            </div>
            
            <div 
              ref={testimonialAnimation.ref}
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${testimonialAnimation.className}`}
            >
              {testimonials.map((testimonial, index) => (
                <BlurCard key={index} className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn(
                        "h-4 w-4", 
                        i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                      )} />
                    ))}
                  </div>
                  <blockquote className="mb-4 text-muted-foreground">"{testimonial.quote}"</blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </BlurCard>
              ))}
            </div>
          </div>
        </section>
        
        <Features />
        
        <section id="cta" className="py-16">
          <div className="container max-w-6xl px-4 mx-auto">
            <BlurCard className="p-8 text-center" variant="bordered">
              <h2 className="text-3xl font-bold mb-4">Ready to simplify your professional services?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join viinno.com today and access our full range of tax and legal services tailored for Papua New Guinea.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className={cn(buttonVariants({ size: "lg" }))}>
                  Create Free Account
                </Link>
                <Link to="/help" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Learn More
                </Link>
              </div>
            </BlurCard>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
