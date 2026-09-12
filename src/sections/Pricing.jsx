import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const plans = [
  {
    name: 'Starter Plan',
    price: '₹5,000',
    description: 'Perfect for small local businesses getting started online.',
    features: [
      '1-Page Website',
      'Mobile Responsive',
      'Simple Modern Design',
      'Basic SEO Setup',
      'Delivery in 3 Days'
    ],
    highlight: false,
    delay: 0.1
  },
  {
    name: 'Business Plan',
    price: '₹10,000',
    description: 'Ideal for growing businesses needing multiple pages.',
    features: [
      '3 to 5 Pages',
      'Premium UI/UX Design',
      'Mobile Responsive',
      'Contact Form Integration',
      'Delivery in 5 Days'
    ],
    highlight: true,
    delay: 0.2
  },
  {
    name: 'Premium Plan',
    price: '₹15,000',
    description: 'Complete full-scale business website with backend support.',
    features: [
      'Up to 10 Pages',
      'Advanced Custom Design',
      'Basic Backend & API Support',
      'E-commerce / Authentication',
      'Delivery in 7 to 10 Days'
    ],
    highlight: false,
    delay: 0.3
  }
];

const Pricing = () => {
  const handleChoosePlan = (planName) => {
    const phoneNumber = "918489968612";
    const text = encodeURIComponent(`Hi GL Solutions! I am very interested in your ${planName}. Can we discuss the details to get started?`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <SectionHeading 
          title="Transparent Pricing" 
          subtitle="Choose the perfect package for your business. No hidden fees, just stunning results."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: plan.delay }}
              className={`relative flex ${plan.highlight ? 'lg:-translate-y-4 lg:scale-105 z-10' : 'z-0'}`}
            >
              <Card className={`h-full flex flex-col w-full ${plan.highlight ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-blue-950/10' : ''}`}>
                
                {plan.highlight && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge variant="primary" className="shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-500"> / project</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check size={20} className="text-blue-400 mr-3 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.highlight ? 'primary' : 'outline'} 
                    className="w-full mt-auto"
                    onClick={() => handleChoosePlan(plan.name)}
                  >
                    Choose {plan.name.split(' ')[0]} Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
