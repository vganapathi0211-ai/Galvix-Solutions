import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div 
      className={`glass-card p-6 md:p-8 ${className}`}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
