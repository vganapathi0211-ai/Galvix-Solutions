import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 
  'Tailwind CSS', 'Bootstrap', 'Node.js', 'Express.js', 
  'MongoDB', 'GitHub', 'Canva', 'Figma', 'AI Website Tools'
];

const Skills = () => {
  return (
    <section className="py-16 md:py-24 border-y border-white/5 bg-surface relative overflow-hidden">
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technologies We Master
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass px-6 py-3 rounded-full text-gray-300 font-medium border border-white/10 hover:border-blue-500/50 hover:text-white transition-colors cursor-default shadow-lg flex items-center justify-center bg-black/40"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse" />
              {skill}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
