"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Bitcoin, Activity, TrendingUp, LayoutTemplate, Search, Bell } from "lucide-react";

import KPICard from "../components/KPICard";
import CryptoSelector from "../components/CryptoSelector";
import PeriodToggle from "../components/PeriodToggle";
import ImprovedChart from "../components/ImprovedChart";
import FloatingChatbot from "../components/FloatingChatbot.tsx ";
import Card from "../components/Card";

// Fetch crypto data avec tous les détailsæ
const fetchCryptoData = async (coinId: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`
  );
  if (!response.ok) throw new Error('Failed');
  return response.json();
};

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeframe, setTimeframe] = useState("30");

  const coins = [
    { id: 'bitcoin', label: 'Bitcoin', symbol: '₿' },
    { id: 'ethereum', label: 'Ethereum', symbol: 'Ξ' },
    { id: 'solana', label: 'Solana', symbol: 'SOL' }
  ];
  
  const periods = [
    { value: '1', label: '1H' },
    { value: '24', label: '24H' },
    { value: '7', label: '7D' },
    { value: '30', label: '30D' },
    { value: '365', label: '1Y' }
  ];

  // Récupérer toutes les données de la crypto
  const { data: cryptoData } = useQuery({
    queryKey: ['cryptoData', selectedCoin],
    queryFn: () => fetchCryptoData(selectedCoin),
    staleTime: 60000,
  });

  const currentPrice = cryptoData?.market_data?.current_price?.usd || 0;
  const priceChange24h = cryptoData?.market_data?.price_change_percentage_24h || 0;
  const volume24h = cryptoData?.market_data?.total_volume?.usd || 0;
  const marketCap = cryptoData?.market_data?.market_cap?.usd || 0;
  const sparkline = cryptoData?.market_data?.sparkline_7d?.price || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[1920px] mx-auto px-16 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-xl flex items-center justify-center shadow-lg shadow-[#7000FF]/30"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <LayoutTemplate size={22} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              NEON<span className="text-[#7000FF]">CRYPTO</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} className="text-gray-600"/>
            </motion.button>
            <motion.button
              className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} className="text-gray-600"/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#7000FF] rounded-full animate-pulse" />
            </motion.button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7000FF]/20 to-[#5000CC]/20 border-2 border-[#7000FF]/30" />
          </div>
        </div>
      </motion.header>

      {/* Container */}
      <div className="max-w-[1920px] mx-auto px-16 py-12 space-y-12">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-3">
            Crypto Intelligence
          </h2>
          <p className="text-xl text-gray-600">
            Analyse en temps réel et prédictions IA
          </p>
        </motion.div>

        {/* Crypto Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CryptoSelector 
            coins={coins}
            selected={selectedCoin}
            onChange={setSelectedCoin}
          />
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <KPICard 
            label="Prix Actuel" 
            value={`$${currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
            icon={<Bitcoin size={24}/>} 
            trend={`${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}%`}
            sparklineData={sparkline.slice(-20)}
            delay={0.3}
          />
          <KPICard 
            label="Volume 24h" 
            value={`$${(volume24h / 1e9).toFixed(2)}B`}
            icon={<Activity size={24}/>} 
            trend="+5.2%" 
            delay={0.35}
          />
          <KPICard 
            label="Market Cap" 
            value={`$${(marketCap / 1e9).toFixed(2)}B`}
            icon={<TrendingUp size={24}/>} 
            trend="+3.1%" 
            delay={0.4}
          />
        </div>

        {/* Chart Section - Full Width */}
        <div className="space-y-8">
          
          {/* Period Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <PeriodToggle 
              periods={periods}
              selected={timeframe}
              onChange={setTimeframe}
            />
          </motion.div>

          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className="p-10">
              <ImprovedChart coinId={selectedCoin} days={timeframe} />
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Floating AI Chatbot - Bottom Right */}
      <FloatingChatbot selectedCoin={selectedCoin} />
    </main>
  );
}