import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, LayoutTemplate, Sparkles, Cloud, Blocks, Workflow, X, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { services } from '../data/siteContent';

const icons = [Zap, LayoutTemplate, Sparkles, Cloud, Blocks, Workflow];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleHireUs = () => {
    setSelectedService(null);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <SectionHeading
          title="Services for growth-minded teams"
          subtitle="We help businesses clarify strategy, modernize delivery, and build the technology that supports momentum."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col group border border-white/10 bg-slate-950/50 hover:border-blue-400/30 hover:bg-slate-950/80 transition-all duration-300">
                  <div className={`mb-6 rounded-2xl border border-white/10 bg-gradient-to-br ${service.accent} p-4 inline-flex w-fit text-blue-200 shadow-[0_14px_30px_rgba(59,130,246,0.15)]`}>
                    <Icon size={28} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{service.description}</p>

                  <ul className="mt-6 space-y-3 text-sm text-gray-300">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-green-400 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className="w-full mt-6 border border-white/10 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all"
                    onClick={() => setSelectedService(service)}
                  >
                    View Service
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-950 rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-10 z-10"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Zap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedService.title}</h2>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Problem</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedService.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Capabilities</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle2 size={18} className="text-green-400 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                  <Button variant="primary" className="flex-1 justify-center group" onClick={handleHireUs}>
                    Start Project
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="flex-1 justify-center" onClick={() => setSelectedService(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
