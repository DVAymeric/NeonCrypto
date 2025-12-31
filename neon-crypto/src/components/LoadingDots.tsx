import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-white/40 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;