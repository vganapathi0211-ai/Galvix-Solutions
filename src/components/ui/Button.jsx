import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  href,
  type = 'button'
}) => {
  const baseStyle = "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:ring-offset-2 focus:ring-offset-slate-950";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.45)]",
    secondary: "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_14px_30px_rgba(251,191,36,0.25)] hover:shadow-[0_18px_40px_rgba(251,191,36,0.35)]",
    outline: "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/8",
    ghost: "text-gray-200 hover:text-white hover:bg-white/5"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href}
        className={combinedClasses}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
