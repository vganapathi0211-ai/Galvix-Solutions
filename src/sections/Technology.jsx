import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import { technologyStack } from '../data/siteContent';

const Technology = () => {
  return (
    <section id="technology" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="Technology that supports business momentum"
          subtitle="We select tools and architectures based on clarity, reliability, flexibility, and the real requirements of the product or workflow."
          index={5}
        />

        <div className="relative mt-16">
          <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-slate-950/70 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-blue-300">Operating model</p>
                  <h3 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.06em] text-white">Systems built to help teams move faster.</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Technology should remove friction, not add complexity. We choose the right platform decisions based on the actual workflow, scale, and experience the business needs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologyStack.map((group, index) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <h4 className="text-xl font-bold text-white mb-5">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
