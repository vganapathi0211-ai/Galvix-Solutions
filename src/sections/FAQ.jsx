import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { faqs } from '../data/siteContent';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 relative bg-slate-950/60">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">

        <SectionHeading
          title="Frequently asked questions"
          subtitle="A clear overview of how we work and where we can add value."
        />

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-white/5 bg-black/40 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left"
                >
                  <span className="font-semibold text-lg text-white pr-8">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-blue-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-400 border-t border-white/5 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
