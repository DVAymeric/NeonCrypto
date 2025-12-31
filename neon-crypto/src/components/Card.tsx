import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
}) => {
  
  const baseClasses = `
    bg-[#121212] border border-white/6 rounded-xl
    ${className}
  `;

  if (!hoverable) {
    return <div className={baseClasses}>{children}</div>;
  }

  return (
    <motion.div
      className={baseClasses}
      whileHover={{ 
        y: -2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;