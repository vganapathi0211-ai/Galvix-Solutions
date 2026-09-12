import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, centered = true, index = null }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      {index !== null && (
        <motion.div
          className="mb-4 text-[4rem] md:text-[6rem] lg:text-[7rem] font-black leading-none tracking-[-0.08em] text-white/5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {String(index).padStart(2, '0')}
        </motion.div>
      )}

      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.04em] mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.06 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-gray-400 max-w-2xl text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{ margin: centered ? '0 auto' : '0' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
