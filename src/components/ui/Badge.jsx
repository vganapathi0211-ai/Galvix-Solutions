import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-surface text-gray-300 border border-white/10",
    primary: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    secondary: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
