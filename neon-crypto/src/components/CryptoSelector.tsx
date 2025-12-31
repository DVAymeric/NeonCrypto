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
    <div className="grid grid-cols-3 gap-4 w-full">
      {coins.map((coin) => {
        const isActive = selected === coin.id;
        return (
          <motion.button
            key={coin.id}
            onClick={() => onChange(coin.id)}
            className={`
              relative overflow-hidden rounded-2xl p-6 transition-all
              ${isActive 
                ? 'bg-gradient-to-br from-[#7000FF] to-[#5000CC] shadow-2xl shadow-[#7000FF]/40' 
                : 'bg-[#1A1A1A] hover:bg-[#222] border border-white/10 hover:border-white/20'}
            `}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect pour l'actif */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            )}
            
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="text-4xl">{coin.symbol}</span>
              <div className="text-center">
                <p className={`text-lg font-bold tracking-wide ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {coin.label}
                </p>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="h-1 bg-white/50 rounded-full mt-2"
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