
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BlurCard } from '@/components/ui/blur-card';
import { useScrollAnimation } from '@/lib/animations';
import { Shield, FileText, CheckCircle } from 'lucide-react';

const Hero = () => {
  const titleAnimation = useScrollAnimation({
    initialClass: 'opacity-0 translate-y-4',
    animateClass: 'opacity-100 translate-y-0 transition-all duration-700 ease-out',
  });

  const subtitleAnimation = useScrollAnimation({
    initialClass: 'opacity-0',
    animateClass: 'opacity-100 transition-all duration-700 delay-300 ease-out',
    delay: 300,
  });

  const cardAnimation = useScrollAnimation({
    initialClass: 'opacity-0 scale-95',
    animateClass: 'opacity-100 scale-100 transition-all duration-700 delay-500 ease-out',
    delay: 500,
  });

  return (
    <section className="relative pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
      
      {/* Red and yellow blurred circles for Papua New Guinea flag colors */}
      <div className="absolute top-20 right-[20%] w-[500px] h-[500px] bg-png-red/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-[10%] w-[400px] h-[400px] bg-png-yellow/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 mx-auto max-w-6xl z-10 relative pt-12 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 
            ref={titleAnimation.ref}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance ${titleAnimation.className}`}
          >
            Simplified Tax Filing for <span className="text-png-red">Papua New Guinea</span> Businesses
          </h1>
          <p
            ref={subtitleAnimation.ref} 
            className={`text-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 ${subtitleAnimation.className}`}
          >
            Wantok.ai leverages advanced AI to streamline your tax preparation process, 
            ensuring compliance with PNG tax regulations while saving you time and resources.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-12 ${subtitleAnimation.className}`}>
            <Link to="/signup">
              <Button size="lg" className="bg-png-red hover:bg-png-red/90 text-white shadow-md">
                Get Started Free
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline" className="shadow-sm">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
        
        <div 
          ref={cardAnimation.ref}
          className={`${cardAnimation.className}`}
        >
          <BlurCard className="p-6 sm:p-8 max-w-4xl mx-auto" variant="bordered" hoverable>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureHighlight 
                icon={<Shield className="h-8 w-8 text-png-red" />} 
                title="Compliance Guaranteed" 
                description="Our AI ensures your tax filings comply with the latest PNG regulations" 
              />
              <FeatureHighlight 
                icon={<FileText className="h-8 w-8 text-png-red" />} 
                title="Smart Document Handling" 
                description="Automatic scanning and data extraction from your financial documents" 
              />
              <FeatureHighlight 
                icon={<CheckCircle className="h-8 w-8 text-png-red" />} 
                title="Time-Saving Automation" 
                description="Reduce your tax preparation time by up to 80% with our AI assistant" 
              />
            </div>
          </BlurCard>
        </div>
      </div>
    </section>
  );
};

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureHighlight = ({ icon, title, description }: FeatureHighlightProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-3 rounded-full bg-secondary/50">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground/80">{description}</p>
    </div>
  );
};

export default Hero;
