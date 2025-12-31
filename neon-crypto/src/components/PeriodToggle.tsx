import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Clock size={16} />
        <span className="text-sm font-bold uppercase tracking-wider">
          Période d'analyse
        </span>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {periods.map((period) => {
          const isActive = selected === period.value;
          return (
            <motion.button
              key={period.value}
              onClick={() => onChange(period.value)}
              className={`
                relative px-5 py-4 rounded-xl text-base font-bold transition-all border-2 shadow-sm
                ${isActive 
                  ? 'bg-gradient-to-br from-[#7000FF] to-[#5000CC] border-[#7000FF] text-white shadow-lg shadow-[#7000FF]/30' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#7000FF]/40 hover:text-gray-900 hover:shadow-md'}
              `}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PeriodToggle;