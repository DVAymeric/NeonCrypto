import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface CompactStatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  delay?: number;
}

const CompactStatCard: React.FC<CompactStatCardProps> = ({ 
  label, 
  value, 
  trend = "0%", 
  icon,
  delay = 0 
}) => {
  const isPositive = !trend.includes("-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      {/* Glow background */}
      <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 ${
        isPositive 
          ? 'bg-gradient-to-r from-emerald-500/30 to-[#7000FF]/30' 
          : 'bg-gradient-to-r from-rose-500/30 to-[#7000FF]/30'
      }`} />
      
      {/* Card */}
      <div className="relative bg-[#1A1A2E] border border-[#252540] rounded-2xl p-8 group-hover:border-[#7000FF]/50 transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <motion.div 
            className="p-4 bg-gradient-to-br from-[#7000FF]/20 to-[#5000CC]/20 rounded-2xl border border-[#7000FF]/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-white w-7 h-7">
              {icon}
            </div>
          </motion.div>
          
          <motion.span 
            className={`
              inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold border
              ${isPositive 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40'}
            `}
            whileHover={{ scale: 1.1 }}
          >
            {isPositive 
              ? <ArrowUpRight size={18} strokeWidth={3} /> 
              : <ArrowDownRight size={18} strokeWidth={3} />
            }
            <span className="tabular-nums">{trend}</span>
          </motion.span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">
            {label}
          </p>
          <p className="text-5xl font-black text-white tabular-nums tracking-tight">
            {value}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div 
          className={`mt-6 h-1 rounded-full ${isPositive ? 'bg-gradient-to-r from-emerald-500 to-[#7000FF]' : 'bg-gradient-to-r from-rose-500 to-[#7000FF]'}`}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default CompactStatCard;