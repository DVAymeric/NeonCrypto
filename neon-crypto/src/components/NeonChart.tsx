"use client";

import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Badge from "../components/Badge";

interface NeonChartProps {
  coinId: string;
  days: string;
}

const fetchMarketChart = async (coinId: string, days: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch market data');
  }
  
  return response.json();
};

const calculateSMA = (data: any[], period: number) => {
  if (data.length < period) return data;
  
  return data.map((item, index) => {
    if (index < period - 1) return item;
    
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.value, 0);
    const sma = sum / period;
    
    return {
      ...item,
      value: sma
    };
  });
};

export default function NeonChart({ coinId, days }: NeonChartProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketChart", coinId, days],
    queryFn: () => fetchMarketChart(coinId, days),
    staleTime: 60000,
    refetchInterval: 120000,
  });

  const formattedData = data?.prices.map(([timestamp, price]: [number, number]) => ({
    date: timestamp,
    value: price,
  })) || [];

  const chartData = formattedData.length > 20 
    ? calculateSMA(formattedData, 14) 
    : formattedData;

  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-[#7000FF]" strokeWidth={2.5} />
        </motion.div>
        <p className="text-sm text-gray-500">Chargement des données...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center space-y-2 p-8 bg-rose-500/10 border border-rose-500/30 rounded-xl">
          <p className="text-rose-400 text-sm font-semibold">Erreur de chargement</p>
          <p className="text-gray-500 text-xs">Impossible de récupérer les données</p>
        </div>
      </div>
    );
  }

  const currentPrice = chartData[chartData.length - 1]?.value || 0;
  const firstPrice = chartData[0]?.value || 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="h-full w-full flex flex-col">
      
      {/* Header avec Animation */}
      <motion.div 
        className="flex justify-between items-start mb-8 pb-6 border-b border-white/10"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-white font-black text-2xl capitalize tracking-tight">
              {coinId}
            </h3>
            <Badge 
              variant={isPositive ? 'success' : 'danger'}
              size="md"
              animated
            >
              <span className="font-mono tabular-nums">
                {isPositive ? '+' : ''}{priceChangePercent}%
              </span>
            </Badge>
          </div>
          
          <motion.p 
            className="text-3xl font-black text-white font-mono tabular-nums"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-sm text-gray-500 font-normal ml-3">USD</span>
          </motion.p>
        </div>
      </motion.div>
      
      {/* Graphique */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.4} />
                <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} opacity={0.5} />

            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => {
                const date = new Date(tick);
                if (days === "1") return format(date, "HH:mm");
                if (days === "24") return format(date, "HH:mm");
                return format(date, "dd/MM");
              }}
              stroke="#3a3a3a"
              tick={{ fill: '#6a6a6a', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#1a1a1a' }}
              minTickGap={50}
              dy={10}
            />
            
            <YAxis 
              stroke="#3a3a3a"
              tick={{ fill: '#6a6a6a', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#1a1a1a' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
              domain={['auto', 'auto']}
              width={80}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                borderColor: isPositive ? "#10b981" : "#ef4444",
                borderWidth: 2,
                color: "#ffffff",
                borderRadius: "12px",
                fontSize: "13px",
                padding: "12px 16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ 
                color: '#9a9a9a', 
                fontWeight: '700', 
                marginBottom: '6px',
                fontSize: '12px' 
              }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return format(date, "dd MMM yyyy, HH:mm");
              }}
              formatter={(value: number) => [
                `$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 
                "Prix"
              ]}
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}