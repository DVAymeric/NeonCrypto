import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  sparklineData?: number[];
  delay?: number;
}

const KPICard: React.FC<KPICardProps> = ({ 
  label, 
  value, 
  trend = "0%", 
  icon,
  sparklineData = [],
  delay = 0 
}) => {
  const isPositive = !trend.includes("-");

  // Normaliser les données pour le sparkline
  const normalizeData = (data: number[]) => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    return data.map(val => ((val - min) / range) * 100);
  };

  const normalized = normalizeData(sparklineData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(112, 0, 255, 0.15)" }}
      className="relative bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-gradient-to-br from-[#7000FF]/10 to-[#5000CC]/10 rounded-xl border border-[#7000FF]/20">
          <div className="text-[#7000FF] w-6 h-6">
            {icon}
          </div>
        </div>
        
        <span className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold border
          ${isPositive 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
            : 'bg-rose-50 text-rose-600 border-rose-200'}
        `}>
          {isPositive 
            ? <ArrowUpRight size={16} strokeWidth={3} /> 
            : <ArrowDownRight size={16} strokeWidth={3} />
          }
          <span className="tabular-nums">{trend}</span>
        </span>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">
          {label}
        </p>
        <p className="text-4xl font-black text-gray-900 tabular-nums tracking-tight">
          {value}
        </p>
      </div>

      {/* Sparkline */}
      {normalized.length > 0 && (
        <div className="h-12 flex items-end gap-0.5">
          {normalized.map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.3, delay: delay + (idx * 0.02) }}
              className={`flex-1 rounded-t ${
                isPositive ? 'bg-emerald-500/30' : 'bg-rose-500/30'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;