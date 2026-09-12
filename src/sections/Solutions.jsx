import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, Sparkles, Layers3, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { solutions } from '../data/siteContent';

const icons = [Workflow, Sparkles, Layers3, ShieldCheck];

const Solutions = () => {
  return (
    <section id="solutions" className="py-24 relative bg-slate-950/60">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="Solutions built around real business needs"
          subtitle="We focus on practical digital outcomes: cleaner operations, smarter systems, and stronger customer experiences."
          index={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {solutions.map((solution, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.09 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={index % 2 === 0 ? 'md:translate-y-8' : ''}
              >
                <div className="group h-full flex flex-col rounded-[28px] border border-white/10 bg-slate-950/60 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-blue-400/30 hover:bg-slate-950/80">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300 shadow-[0_14px_28px_rgba(59,130,246,0.2)]">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">0{index + 1}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8 flex-grow">{solution.text}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-slate-300">Outcome driven</span>
                    <Button variant="ghost" className="justify-start gap-2 px-0 text-blue-300 hover:text-white">
                      See the approach <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
