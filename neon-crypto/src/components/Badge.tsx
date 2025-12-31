import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  animated = false,
  className = '',
}) => {
  
  const variants = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    neutral: 'bg-white/10 text-white border-white/20',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  };

  const baseClasses = `
    inline-flex items-center gap-1.5
    rounded-lg font-bold border
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (animated) {
    return (
      <motion.span 
        className={baseClasses}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {icon && icon}
        {children}
      </motion.span>
    );
  }

  return (
    <span className={baseClasses}>
      {icon && icon}
      {children}
    </span>
  );
};

export default Badge;