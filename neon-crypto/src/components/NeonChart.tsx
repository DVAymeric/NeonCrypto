"use client";

import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { fetchMarketChart } from "../lib/api";
import { calculateSMA } from "../lib/indicators";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface NeonChartProps {
  coinId: string;
  days: string;
}

export default function NeonChart({ coinId, days }: NeonChartProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketChart", coinId, days],
    queryFn: () => fetchMarketChart(coinId, days),
  });

  const formattedData = data?.prices.map(([timestamp, price]) => ({
    date: timestamp,
    value: price,
  })) || [];

  const chartData = formattedData.length > 20 
    ? calculateSMA(formattedData, 14) 
    : formattedData;

  if (isLoading) return (
    <div className="h-[400px] w-full bg-surface rounded-2xl border border-slate-700/50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );

  if (isError) return (
    <div className="h-[400px] w-full bg-surface rounded-2xl border border-red-900/20 flex items-center justify-center text-red-400 text-sm">
      Unable to load market data.
    </div>
  );

  return (
    <div className="h-[400px] w-full bg-surface rounded-2xl border border-slate-700/50 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                {coinId.charAt(0).toUpperCase() + coinId.slice(1)} Performance
            </h3>
            <p className="text-slate-400 text-xs mt-1">
                Prices in USD • Last {days} days
            </p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData}>
          <defs>
            {/* Dégradé Bleu Business */}
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.4} />

          <XAxis 
            dataKey="date" 
            tickFormatter={(tick) => format(new Date(tick), days === "1" ? "HH:mm" : "dd MMM")}
            stroke="#475569"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            minTickGap={40}
            dy={10}
          />
          <YAxis 
            hide={false}
            stroke="#475569"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            dx={-10}
            domain={['auto', 'auto']}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              color: "#f1f5f9",
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelFormatter={(label) => format(new Date(label), "PPP HH:mm")}
            formatter={(value: number) => [`$${value.toLocaleString(undefined, {minimumFractionDigits: 2})}`, "Price"]}
          />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6" /* Bleu primaire */
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}