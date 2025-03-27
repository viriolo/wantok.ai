
import { useScrollAnimation, staggerChildren } from '@/lib/animations';
import { BlurCard } from '@/components/ui/blur-card';
import { Database, FileText, Calculator, Check, Shield, Globe, Users, FileUp, MessageSquare } from 'lucide-react';

const Features = () => {
  const titleAnimation = useScrollAnimation({
    initialClass: 'opacity-0 translate-y-6',
    animateClass: 'opacity-100 translate-y-0 transition-all duration-700 ease-out',
  });

  const featuresAnimation = useScrollAnimation({
    initialClass: 'opacity-0',
    animateClass: 'opacity-100 transition-all duration-1000 ease-out',
    delay: 300,
  });

  const applyStagger = staggerChildren(100);

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Management",
      description: "Securely upload and store financial documents with automatic data extraction",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance Monitoring",
      description: "Stay compliant with Papua New Guinea's evolving tax regulations",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Tax Calculation",
      description: "Precise calculations tailored to your business type and industry",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Security",
      description: "Enterprise-grade encryption and security for your sensitive information",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "AI Tax Assistant",
      description: "Get real-time guidance and answers to your tax questions",
    },
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "One-Click Filing",
      description: "Submit your tax returns directly to PNG Revenue Services",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multilingual Support",
      description: "Available in English and Tok Pisin for all Papua New Guineans",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work together with your accountants and financial team",
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleAnimation.ref}
            className={`text-3xl md:text-4xl font-bold mb-6 ${titleAnimation.className}`}
          >
            Advanced Features for <span className="text-png-red">PNG Businesses</span>
          </h2>
          <p 
            className={`text-foreground/80 max-w-2xl mx-auto ${titleAnimation.className}`}
          >
            Wantok.ai combines powerful AI technology with deep knowledge of Papua New Guinea's 
            tax system to provide a comprehensive tax solution.
          </p>
        </div>

        <div 
          ref={featuresAnimation.ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${featuresAnimation.className}`}
        >
          {features.map((feature, index) => (
            <BlurCard 
              key={index}
              className="p-6 h-full"
              variant="bordered"
              hoverable
              style={applyStagger(index)}
            >
              <div className="h-12 w-12 rounded-lg bg-secondary/70 flex items-center justify-center mb-4 text-png-red">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/80">{feature.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center text-xs text-foreground/70">
                    <Check className="h-3 w-3 mr-1 text-png-red" />
                    <span>Benefit {i+1}</span>
                  </div>
                ))}
              </div>
            </BlurCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
