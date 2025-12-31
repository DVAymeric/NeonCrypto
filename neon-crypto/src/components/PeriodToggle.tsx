import React from 'react';
import { motion } from 'framer-motion';

interface PeriodToggleProps {
  periods: Array<{ value: string; label: string }>;
  selected: string;
  onChange: (value: string) => void;
}

const PeriodToggle: React.FC<PeriodToggleProps> = ({
  periods,
  selected,
  onChange,
}) => {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-2 inline-flex gap-2">
      {periods.map((period) => {
        const isActive = selected === period.value;
        return (
          <motion.button
            key={period.value}
            onClick={() => onChange(period.value)}
            className={`
              relative px-8 py-3.5 rounded-xl text-base font-bold transition-all
              ${isActive 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-300'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="period-active"
                className="absolute inset-0 bg-[#7000FF] rounded-xl shadow-lg shadow-[#7000FF]/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{period.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PeriodToggle;