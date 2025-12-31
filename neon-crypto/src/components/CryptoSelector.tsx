import React from 'react';
import { motion } from 'framer-motion';

interface CryptoSelectorProps {
  coins: Array<{ id: string; label: string; symbol: string }>;
  selected: string;
  onChange: (id: string) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  coins,
  selected,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {coins.map((coin) => {
        const isActive = selected === coin.id;
        return (
          <motion.button
            key={coin.id}
            onClick={() => onChange(coin.id)}
            className={`
              relative overflow-hidden rounded-2xl p-8 transition-all border-2 shadow-sm
              ${isActive 
                ? 'bg-gradient-to-br from-[#7000FF] to-[#5000CC] border-[#7000FF] shadow-xl shadow-[#7000FF]/30' 
                : 'bg-white border-gray-200 hover:border-[#7000FF]/40 hover:shadow-md'}
            `}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect */}
            {isActive && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <motion.span 
                className="text-5xl"
                animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {coin.symbol}
              </motion.span>
              <div className="text-center">
                <p className={`text-xl font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {coin.label}
                </p>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="h-1 bg-white/60 rounded-full mt-3"
                  />
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CryptoSelector;