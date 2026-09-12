import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import { industries } from '../data/siteContent';

const Industries = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="Technology solutions for growing businesses"
          subtitle="We help teams move faster with digital systems that fit their goals, constraints, and growth stage."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-lg font-bold text-blue-300">
                {industry.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-white">{industry}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
