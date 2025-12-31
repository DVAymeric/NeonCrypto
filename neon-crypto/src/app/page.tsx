"use client";

import { useState } from "react";
import NeonChart from "../components/NeonChart";
import StatCard from "../components/StatCard";
import CryptoAI from "../components/CryptoAI";
import { Bitcoin, Activity, Wallet, LayoutTemplate, Search, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [timeframe, setTimeframe] = useState("30");

  const coins = ['bitcoin', 'ethereum', 'solana'];
  const timeframes = ['1H', '24H', '7D', '30D', '1Y'];

  return (
    <main className="min-h-screen text-white selection:bg-[#7000FF]/50 pb-20 bg-[#050505]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#7000FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(112,0,255,0.4)]">
                <LayoutTemplate className="text-white" size={24} />
             </div>
             <h1 className="text-3xl font-black tracking-tighter">NEON<span className="text-[#7000FF]">CRYPTO</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-4 rounded-2xl bg-[#1a1a1a] hover:bg-[#252525] transition-colors border border-white/5">
                <Search size={24} className="text-gray-300"/>
            </button>
            <button className="p-4 rounded-2xl bg-[#1a1a1a] hover:bg-[#252525] transition-colors border border-white/5">
                <Bell size={24} className="text-gray-300"/>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-white/10"></div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-8 py-12 space-y-10">
        
        {/* SECTION STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <StatCard label="Prix Actuel" value={selectedCoin === 'bitcoin' ? "$98,432" : selectedCoin === 'ethereum' ? "$3,400" : "$145"} icon={<Bitcoin size={28}/>} trend="+5.2%" />
           <StatCard label="Volume Global" value="$42.5B" icon={<Activity size={28}/>} trend="-1.2%" />
           <StatCard label="Portefeuille" value="$12,450" icon={<Wallet size={28}/>} trend="+0.8%" />
        </div>

        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           {/* Chart Section */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* --- BARRE DE CONTRÔLE MASSIVE --- */}
              <div className="bg-[#0f0f0f] border border-white/10 p-4 rounded-[30px]">
                 
                 <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-8">
                    
                    {/* 1. ONGLETS CRYPTO (GÉANTS) */}
                    <div className="flex flex-1 bg-[#161616] p-2 rounded-[24px] border border-white/5">
                       {coins.map(coin => {
                          const isActive = selectedCoin === coin;
                          return (
                            <button 
                              key={coin} 
                              onClick={() => setSelectedCoin(coin)}
                              className={`
                                relative z-10 flex-1 py-6 px-4 text-lg font-black uppercase tracking-widest text-center transition-colors duration-200 rounded-[20px]
                                ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-200'}
                              `}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-pill-crypto"
                                  className="absolute inset-0 bg-[#7000FF] shadow-[0_0_30px_rgba(112,0,255,0.4)] rounded-[20px] -z-10"
                                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                              )}
                              {coin}
                            </button>
                          );
                       })}
                    </div>

                    {/* 2. BOUTONS TIMEFRAME (BLOCS) */}
                    <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0 justify-center xl:justify-end">
                       {timeframes.map(t => {
                          const isActive = timeframe === t;
                          return (
                            <button 
                              key={t}
                              onClick={() => setTimeframe(t)}
                              className={`
                                relative px-8 py-5 rounded-2xl text-base font-bold transition-all border-2
                                ${isActive 
                                  ? 'bg-[#1a1a1a] text-[#7000FF] border-[#7000FF] shadow-[0_0_15px_rgba(112,0,255,0.15)] scale-105' 
                                  : 'bg-[#161616] text-gray-400 border-[#222] hover:bg-[#202020] hover:border-gray-600 hover:text-white'}
                              `}
                            >
                              {t}
                            </button>
                          );
                       })}
                    </div>
                 </div>
              </div>

              {/* Le Graphique */}
              <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[30px] h-[600px] relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Activity size={300} className="text-white transform -rotate-12"/>
                 </div>
                 <NeonChart coinId={selectedCoin} days={timeframe} />
              </div>
           </div>

           {/* AI Section (Widget) */}
           <div className="lg:col-span-4 h-[750px] sticky top-32">
              <CryptoAI selectedCoin={selectedCoin} />
           </div>

        </div>
      </div>
    </main>
  );
}