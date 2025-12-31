"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import LoadingDots from './LoadingDots';

interface PredictionResult {
  coin: string;
  ai_analysis: {
    trend: string;
    confidence: string;
    volatility_index: number;
    target_price: number;
    color: string;
  };
  timestamp: number;
}

const CompactAIWidget = ({ selectedCoin = "bitcoin" }: { selectedCoin: string }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PredictionResult | null>(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setData(null);
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coin: selectedCoin }),
      });
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("⚠️ Serveur Python non lancé\nCommande: python app.py");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7000FF]/30 to-[#00C2FF]/30 rounded-3xl blur-xl opacity-50" />
      
      <Card className="relative p-8 space-y-8 bg-[#121212]">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-2xl"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <BrainCircuit size={24} className="text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-black text-white">Oracle AI</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#7000FF]" />
                Neural Engine
              </p>
            </div>
          </div>
          
          {data && (
            <Badge variant="success" size="sm" animated>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Active
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* Initial State */}
            {!data && !loading && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6 py-12"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl"
                >
                  🔮
                </motion.div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white">Prêt à analyser</p>
                  <p className="text-sm text-zinc-500">
                    Analyse IA pour <span className="text-white font-bold capitalize">{selectedCoin}</span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-[#7000FF]/30 border-t-[#7000FF] rounded-full mx-auto"
                />
                <div className="space-y-2">
                  <p className="text-sm text-zinc-400 flex items-center justify-center gap-2">
                    Analyse en cours
                    <LoadingDots />
                  </p>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {data && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
                {/* Trend Card */}
                <motion.div
                  className={`
                    p-8 rounded-2xl border-2 text-center
                    ${data.ai_analysis.color === 'green' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20' 
                      : 'bg-rose-500/10 border-rose-500/30 shadow-lg shadow-rose-500/20'}
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="flex items-center justify-center gap-3 mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {data.ai_analysis.color === 'green' 
                      ? <TrendingUp size={32} className="text-emerald-400" strokeWidth={3} /> 
                      : <TrendingDown size={32} className="text-rose-400" strokeWidth={3} />
                    }
                  </motion.div>
                  <p className={`text-3xl font-black ${data.ai_analysis.color === 'green' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {data.ai_analysis.trend}
                  </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Confiance</p>
                    <p className="text-2xl font-black text-white tabular-nums">{data.ai_analysis.confidence}</p>
                  </motion.div>
                  <motion.div
                    className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Prix Cible</p>
                    <p className="text-xl font-black text-white tabular-nums">${data.ai_analysis.target_price.toLocaleString()}</p>
                  </motion.div>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-center text-zinc-600 pt-2">
                  Analysé à {new Date(data.timestamp * 1000).toLocaleTimeString('fr-FR')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={fetchPrediction}
        >
          {data ? 'Relancer l\'Analyse' : 'Lancer la Prédiction'}
        </Button>
      </Card>
    </div>
  );
};

export default CompactAIWidget;