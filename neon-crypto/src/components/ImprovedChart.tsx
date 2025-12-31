"use client";

import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import Badge from "./Badge";
import { Skeleton } from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import Button from "./Button";

interface ImprovedChartProps {
  coinId: string;
  days: string;
}

const fetchMarketChart = async (coinId: string, days: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
  );
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('RATE_LIMIT');
    }
    throw new Error('FETCH_ERROR');
  }
  
  return response.json();
};

const calculateSMA = (data: any[], period: number) => {
  if (data.length < period) return data;
  return data.map((item, index) => {
    if (index < period - 1) return item;
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.value, 0);
    return { ...item, value: sum / period };
  });
};

export default function ImprovedChart({ coinId, days }: ImprovedChartProps) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["marketChart", coinId, days],
    queryFn: () => fetchMarketChart(coinId, days),
    staleTime: 120000, // 2 minutes
    retry: 2,
    retryDelay: 1000,
  });

  const formattedData = data?.prices?.map(([timestamp, price]: [number, number]) => ({
    date: timestamp,
    value: price,
  })) || [];

  const chartData = formattedData.length > 20 
    ? calculateSMA(formattedData, 14) 
    : formattedData;

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[500px] w-full space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 bg-gray-200" />
          <Skeleton className="h-10 w-48 bg-gray-200" />
        </div>
        <Skeleton className="h-[400px] w-full bg-gray-200" />
      </div>
    );
  }

  // Error state
  if (isError) {
    const isRateLimit = error instanceof Error && error.message === 'RATE_LIMIT';
    
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <EmptyState
          title={isRateLimit ? "Limite d'API atteinte" : "Erreur de chargement"}
          description={
            isRateLimit 
              ? "Trop de requêtes à CoinGecko. Attendez 1 minute avant de réessayer." 
              : "Impossible de récupérer les données. Vérifiez votre connexion."
          }
          action={
            <Button
              variant="secondary"
              size="md"
              onClick={() => refetch()}
              icon={<RefreshCw size={18} />}
            >
              Réessayer
            </Button>
          }
        />
      </div>
    );
  }

  // No data
  if (chartData.length === 0) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <EmptyState
          title="Aucune donnée disponible"
          description="Les données pour cette période ne sont pas disponibles."
        />
      </div>
    );
  }

  const currentPrice = chartData[chartData.length - 1]?.value || 0;
  const firstPrice = chartData[0]?.value || 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = ((priceChange / firstPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <motion.div 
      className="h-[500px] w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-6">
        <h3 className="text-2xl font-black text-gray-900 capitalize">
          {coinId}
        </h3>
        <Badge 
          variant={isPositive ? 'success' : 'danger'}
          size="sm"
        >
          {isPositive ? '+' : ''}{priceChangePercent}%
        </Badge>
        <span className="text-3xl font-black text-gray-900 font-mono ml-auto tabular-nums">
          ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      
      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />

            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => {
                const date = new Date(tick);
                if (days === "1") return format(date, "HH:mm");
                return format(date, "dd/MM");
              }}
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              dy={8}
            />
            
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-8}
              width={70}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: isPositive ? "#10b981" : "#ef4444",
                borderWidth: 2,
                borderRadius: "12px",
                fontSize: "12px",
                padding: "8px 12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
              labelStyle={{ color: '#6b7280', fontWeight: '600', fontSize: '11px' }}
              labelFormatter={(label) => format(new Date(label), "dd MMM, HH:mm")}
              formatter={(value: number) => [
                `$${value.toLocaleString(undefined, {minimumFractionDigits: 2})}`, 
                "Prix"
              ]}
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}