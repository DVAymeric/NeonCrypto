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
    bg-[#1A1A2E] border border-[#252540] rounded-2xl
    ${className}
  `;

  if (!hoverable) {
    return <div className={baseClasses}>{children}</div>;
  }

  return (
    <motion.div
      className={baseClasses}
      whileHover={{ 
        y: -4,
        borderColor: "rgba(112, 0, 255, 0.5)",
        boxShadow: "0 8px 24px rgba(112, 0, 255, 0.2)",
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;