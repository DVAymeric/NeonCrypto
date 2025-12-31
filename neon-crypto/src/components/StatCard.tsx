import React from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
}

export default function StatCard({ label, value, trend = "0%", icon }: StatCardProps) {
  const isPositive = !trend.includes("-");

  return (
    <div className="relative group overflow-hidden bg-[#13131a] border border-white/5 p-5 rounded-2xl hover:border-purple-500/30 transition-all duration-300 shadow-lg">
      
      {/* Glow effect au survol */}
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="p-2.5 bg-white/5 rounded-xl text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border ${
          isPositive 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        }`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1">{label}</h3>
        <p className="text-xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}