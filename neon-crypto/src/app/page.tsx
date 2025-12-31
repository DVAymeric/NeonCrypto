"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bitcoin, Activity, Wallet, LayoutTemplate, Search, Bell } from "lucide-react";

import CompactStatCard from "../components/CompactStatCard";
import CryptoSelector from "../components/CryptoSelector";
import PeriodToggle from "../components/PeriodToggle";
import ModernChart from "../components/ModernChart";
import CompactAIWidget from "../components/CompactAIWidget";
import Card from "../components/Card";

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

  const stats = {
    bitcoin: { price: "$88,489.24", trend: "+3.55%" },
    ethereum: { price: "$3,234.56", trend: "+1.23%" },
    solana: { price: "$145.23", trend: "-0.79%" }
  };

  const currentStats = stats[selectedCoin as keyof typeof stats];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Header Premium */}
      <motion.header 
        className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[1920px] mx-auto px-12 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <LayoutTemplate size={22} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tight">
              NEON<span className="text-[#7000FF]">CRYPTO</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} className="text-zinc-400"/>
            </motion.button>
            <motion.button
              className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} className="text-zinc-400"/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#7000FF] rounded-full animate-pulse" />
            </motion.button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-800 border border-white/20 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </motion.header>

      {/* Container avec padding généreux */}
      <div className="max-w-[1920px] mx-auto px-12 py-12 space-y-12">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-5xl font-black text-white tracking-tight">
            Dashboard Crypto
          </h2>
          <p className="text-xl text-zinc-500">
            Analyse en temps réel des marchés
          </p>
        </motion.div>

        {/* Stats Grid - ESPACÉ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CompactStatCard 
            label="Prix Actuel" 
            value={currentStats.price} 
            icon={<Bitcoin size={28}/>} 
            trend={currentStats.trend}
            delay={0.2}
          />
          <CompactStatCard 
            label="Volume 24h" 
            value="$42.5B" 
            icon={<Activity size={28}/>} 
            trend="-1.2%" 
            delay={0.3}
          />
          <CompactStatCard 
            label="Portefeuille" 
            value="$12,450" 
            icon={<Wallet size={28}/>} 
            trend="+0.8%" 
            delay={0.4}
          />
        </div>

        {/* Main Grid avec VRAIES marges */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Chart Section - 2/3 */}
          <div className="xl:col-span-2 space-y-10">
            
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Analyse de Marché
              </h3>
              
              {/* Crypto Selector - GRAND */}
              <CryptoSelector 
                coins={coins}
                selected={selectedCoin}
                onChange={setSelectedCoin}
              />
            </motion.div>

            {/* Period Toggle - ESPACÉ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                Période d'analyse
              </span>
              <PeriodToggle 
                periods={periods}
                selected={timeframe}
                onChange={setTimeframe}
              />
            </motion.div>

            {/* Chart Card - GRAND */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Card className="p-10">
                <ModernChart coinId={selectedCoin} days={timeframe} />
              </Card>
            </motion.div>
          </div>

          {/* AI Widget - 1/3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="xl:col-span-1"
          >
            <div className="sticky top-28">
              <CompactAIWidget selectedCoin={selectedCoin} />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}