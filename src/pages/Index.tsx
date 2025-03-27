
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/lib/animations";
import { Shield, FileText, Lock, MessageSquare } from "lucide-react";

const Index = () => {
  const testimonialsAnimation = useScrollAnimation({
    initialClass: "opacity-0 translate-y-8",
    animateClass: "opacity-100 translate-y-0 transition-all duration-700 ease-out",
  });

  const pricingAnimation = useScrollAnimation({
    initialClass: "opacity-0 translate-y-8",
    animateClass: "opacity-100 translate-y-0 transition-all duration-700 ease-out",
  });

  const aboutAnimation = useScrollAnimation({
    initialClass: "opacity-0 translate-y-8",
    animateClass: "opacity-100 translate-y-0 transition-all duration-700 ease-out",
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Testimonials Section */}
      <section className="py-20 relative bg-secondary/50">
        <div 
          ref={testimonialsAnimation.ref}
          className={`container mx-auto px-4 max-w-6xl ${testimonialsAnimation.className}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by PNG Businesses
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              See what companies across Papua New Guinea are saying about Wantok.ai
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlurCard className="p-6" variant="bordered">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-png-yellow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="flex-1 text-foreground/90 mb-4">
                  "Wantok.ai has transformed how we manage our tax obligations. Their AI assistant saved us countless hours and prevented costly filing mistakes."
                </blockquote>
                <footer className="mt-auto">
                  <p className="font-medium">John Taboro</p>
                  <p className="text-sm text-foreground/70">CFO, Pacific Ventures Ltd</p>
                </footer>
              </div>
            </BlurCard>
            
            <BlurCard className="p-6" variant="bordered">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-png-yellow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="flex-1 text-foreground/90 mb-4">
                  "As a small business in Port Moresby, staying compliant with tax regulations was always challenging. Wantok.ai made it simple and stress-free."
                </blockquote>
                <footer className="mt-auto">
                  <p className="font-medium">Maria Lautao</p>
                  <p className="text-sm text-foreground/70">Owner, Moresby Retail Solutions</p>
                </footer>
              </div>
            </BlurCard>
            
            <BlurCard className="p-6" variant="bordered">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-png-yellow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="flex-1 text-foreground/90 mb-4">
                  "The multilingual support in both English and Tok Pisin was crucial for our diverse team. The AI assistant understands our local tax context perfectly."
                </blockquote>
                <footer className="mt-auto">
                  <p className="font-medium">Peter Kaupa</p>
                  <p className="text-sm text-foreground/70">Director, Highland Resource Group</p>
                </footer>
              </div>
            </BlurCard>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div 
          ref={pricingAnimation.ref}
          className={`container mx-auto px-4 max-w-6xl ${pricingAnimation.className}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Affordable plans designed for businesses of all sizes in Papua New Guinea
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlurCard className="p-6 border border-gray-200 dark:border-gray-700" variant="bordered">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Starter</h3>
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl font-bold">K299</span>
                  <span className="text-foreground/70 ml-1">/month</span>
                </div>
                <p className="text-sm text-foreground/70 mt-2">For small businesses</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Basic tax filing for small businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Up to 100 document uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Standard AI assistant access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Basic data security</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </BlurCard>
            
            <BlurCard 
              className="p-6 border border-png-red relative" 
              variant="bordered"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-png-red text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Professional</h3>
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl font-bold">K599</span>
                  <span className="text-foreground/70 ml-1">/month</span>
                </div>
                <p className="text-sm text-foreground/70 mt-2">For growing businesses</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Complete tax filing for medium businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Unlimited document uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Priority AI assistant access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Advanced data encryption</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full bg-png-red hover:bg-png-red/90">Get Started</Button>
              </Link>
            </BlurCard>
            
            <BlurCard className="p-6 border border-gray-200 dark:border-gray-700" variant="bordered">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl font-bold">K1299</span>
                  <span className="text-foreground/70 ml-1">/month</span>
                </div>
                <p className="text-sm text-foreground/70 mt-2">For large corporations</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Complete tax solutions for large enterprises</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Unlimited document processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Dedicated AI tax consultant</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-png-red flex-shrink-0" />
                  <span className="text-sm">Enterprise-grade security</span>
                </li>
              </ul>
              
              <Link to="/signup" className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </BlurCard>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/50">
        <div 
          ref={aboutAnimation.ref}
          className={`container mx-auto px-4 max-w-6xl ${aboutAnimation.className}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Wantok.ai
              </h2>
              <p className="text-foreground/80 mb-4">
                Wantok.ai was founded with a clear mission: to simplify tax compliance for businesses across Papua New Guinea through innovative AI technology.
              </p>
              <p className="text-foreground/80 mb-4">
                Our team combines deep expertise in PNG's tax regulations with cutting-edge artificial intelligence to provide a service that is accurate, efficient, and accessible to all businesses regardless of size.
              </p>
              <p className="text-foreground/80">
                As a proudly Papua New Guinean company, we understand the unique challenges faced by local businesses and are committed to providing solutions that address their specific needs.
              </p>
            </div>
            
            <BlurCard className="p-8" variant="bordered">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Our Vision</h3>
                  <p className="text-sm text-foreground/80">
                    To revolutionize tax compliance in Papua New Guinea by making it accessible, efficient, and stress-free for all businesses.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Our Values</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-png-red flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">1</div>
                      <div>
                        <p className="font-medium">Trust & Security</p>
                        <p className="text-sm text-foreground/80">Your data security is our highest priority</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-png-red flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">2</div>
                      <div>
                        <p className="font-medium">Innovation</p>
                        <p className="text-sm text-foreground/80">Constantly improving our AI for better results</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-png-red flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">3</div>
                      <div>
                        <p className="font-medium">Local Expertise</p>
                        <p className="text-sm text-foreground/80">Deep understanding of PNG tax regulations</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </BlurCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <BlurCard className="p-8 text-center" variant="bordered">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to simplify your tax filings?
            </h2>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Join hundreds of Papua New Guinea businesses already using Wantok.ai to streamline their tax compliance process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-png-red hover:bg-png-red/90">
                  Get Started Free
                </Button>
              </Link>
              <Link to="#">
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </BlurCard>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
