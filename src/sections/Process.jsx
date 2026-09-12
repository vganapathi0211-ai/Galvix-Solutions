import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../data/siteContent';

const Process = () => {
  return (
    <section className="py-24 relative bg-slate-950/50">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">A focused, transparent delivery model</h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent xl:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_16px_40px_rgba(2,6,23,0.28)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-300 ring-1 ring-blue-400/20">
                    0{index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden h-px w-8 bg-gradient-to-r from-blue-400/80 to-transparent xl:block" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
