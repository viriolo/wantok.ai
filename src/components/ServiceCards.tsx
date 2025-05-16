
import React from 'react';
import { Link } from 'react-router-dom';
import { BlurCard } from '@/components/ui/blur-card';
import { FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/lib/animations';

const ServiceCards = () => {
  const cardsAnimation = useScrollAnimation({
    initialClass: 'opacity-0 translate-y-4',
    animateClass: 'opacity-100 translate-y-0 transition-all duration-700 ease-out',
    delay: 300,
  });

  const services = [
    {
      title: 'PNG Tax Services',
      description: 'Simplify your tax management with our comprehensive tax calculation and compliance system for Papua New Guinea.',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      link: '/tax-calculator',
      buttonText: 'Calculate Taxes'
    },
    {
      title: 'Legal Advisory Services',
      description: 'Get expert legal advice and guidance by chatting with our specialists or uploading your documents for review.',
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      link: '/legal-services',
      buttonText: 'Seek Legal Advice'
    }
  ];

  return (
    <section id="services" className="py-16 bg-secondary/10">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional services tailored for Papua New Guinea businesses and individuals.
          </p>
        </div>
        
        <div 
          ref={cardsAnimation.ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${cardsAnimation.className}`}
        >
          {services.map((service, index) => (
            <BlurCard 
              key={index} 
              className="p-6 flex flex-col items-center text-center"
              variant="bordered"
              hoverable
            >
              <div className="mb-4 p-3 rounded-full bg-secondary/50">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link to={service.link} className="mt-auto">
                <Button>{service.buttonText}</Button>
              </Link>
            </BlurCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
