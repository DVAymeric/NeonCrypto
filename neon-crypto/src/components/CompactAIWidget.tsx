"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, TrendingUp, TrendingDown, Sparkles, Send } from 'lucide-react';
import Card from './Card';
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
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: any}>>([]);

  const fetchPrediction = async () => {
    setLoading(true);
    
    // Message utilisateur
    setMessages(prev => [...prev, {
      type: 'user',
      content: `Analyse ${selectedCoin}`
    }]);
    
    try {
      const res = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coin: selectedCoin }),
      });
      const result = await res.json();
      
      // Message AI
      setMessages(prev => [...prev, {
        type: 'ai',
        content: result
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: { error: true, message: "Serveur Python non lancé" }
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full">
      <Card className="relative p-6 bg-white h-full flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <motion.div 
            className="p-2.5 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-xl shadow-sm"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <BrainCircuit size={20} className="text-white" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-base font-black text-gray-900">Oracle AI</h3>
            <span className="text-xs text-gray-500 uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles size={10} className="text-[#7000FF]" />
              Neural Engine
            </span>
          </div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 max-h-[500px]">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 space-y-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
                className="text-5xl"
              >
                🤖
              </motion.div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">Assistant IA prêt</p>
                <p className="text-xs text-gray-500">
                  Demandez une analyse pour <span className="text-[#7000FF] font-bold capitalize">{selectedCoin}</span>
                </p>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'user' ? (
                  <div className="bg-gradient-to-r from-[#7000FF] to-[#5000CC] text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                    <span className="text-sm font-medium">{msg.content}</span>
                  </div>
                ) : msg.content.error ? (
                  <div className="bg-rose-50 border border-rose-200 text-rose-600 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                    <span className="text-xs font-medium">⚠️ {msg.content.message}</span>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 text-gray-900 px-5 py-4 rounded-2xl rounded-tl-sm max-w-[85%] space-y-3">
                    {/* Trend */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm ${
                      msg.content.ai_analysis.color === 'green' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {msg.content.ai_analysis.color === 'green' 
                        ? <TrendingUp size={16} /> 
                        : <TrendingDown size={16} />
                      }
                      {msg.content.ai_analysis.trend}
                    </div>

                    {/* Métriques */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Confiance:</span>
                        <span className="text-gray-900 font-bold ml-1 tabular-nums">{msg.content.ai_analysis.confidence}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cible:</span>
                        <span className="text-gray-900 font-bold ml-1 tabular-nums">${msg.content.ai_analysis.target_price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="text-[10px] text-gray-500 text-right">
                      {new Date(msg.content.timestamp * 1000).toLocaleTimeString('fr-FR')}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm">
                <span className="text-sm text-gray-600 inline-flex items-center gap-2">
                  Analyse en cours
                  <LoadingDots />
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="pt-4 border-t border-gray-200">
          <motion.button
            onClick={fetchPrediction}
            disabled={loading}
            className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7000FF] to-[#5000CC] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#7000FF]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={16} />
            {loading ? 'Analyse...' : 'Analyser maintenant'}
          </motion.button>
        </div>
      </Card>
    </div>
  );
};

export default CompactAIWidget;