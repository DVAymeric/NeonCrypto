"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, Send, Sparkles, TrendingUp, TrendingDown, MessageSquare } from 'lucide-react';
import ModernButton from './ModernButton';
import LoadingDots from './LoadingDots';

interface PredictionResult {
  coin: string;
  ai_analysis: {
    trend: string;
    confidence: string;
    target_price: number;
    color: string;
  };
  timestamp: number;
}

interface FloatingChatbotProps {
  selectedCoin: string;
}

const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ selectedCoin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: any}>>([]);

  const fetchPrediction = async () => {
    setLoading(true);
    
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
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: result
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: { error: true, message: "Serveur Python non lancé" }
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-2xl shadow-2xl shadow-[#7000FF]/40 flex items-center justify-center text-white hover:shadow-[#7000FF]/60 transition-shadow"
          >
            <MessageSquare size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pop-up Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[650px] bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#7000FF]/5 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-xl">
                  <BrainCircuit size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Oracle AI</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wider inline-flex items-center gap-1">
                    <Sparkles size={10} className="text-[#7000FF]" />
                    Neural Engine
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl">🤖</div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-gray-900">Assistant prêt</p>
                    <p className="text-sm text-gray-600">
                      Demandez une analyse pour <span className="text-[#7000FF] font-bold capitalize">{selectedCoin}</span>
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'user' ? (
                    <div className="bg-gradient-to-br from-[#7000FF] to-[#5000CC] text-white px-5 py-3 rounded-2xl rounded-tr-md max-w-[75%] shadow-sm">
                      <span className="text-sm font-medium">{msg.content}</span>
                    </div>
                  ) : msg.content.error ? (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 px-5 py-3 rounded-2xl rounded-tl-md max-w-[75%]">
                      <span className="text-xs font-medium">⚠️ {msg.content.message}</span>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 px-5 py-4 rounded-2xl rounded-tl-md max-w-[80%] space-y-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${
                        msg.content.ai_analysis.color === 'green' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {msg.content.ai_analysis.color === 'green' 
                          ? <TrendingUp size={18} /> 
                          : <TrendingDown size={18} />
                        }
                        {msg.content.ai_analysis.trend}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500 text-xs">Confiance</span>
                          <div className="text-gray-900 font-bold tabular-nums">{msg.content.ai_analysis.confidence}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Cible</span>
                          <div className="text-gray-900 font-bold tabular-nums">${msg.content.ai_analysis.target_price.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="text-[10px] text-gray-500 text-right">
                        {new Date(msg.content.timestamp * 1000).toLocaleTimeString('fr-FR')}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-md">
                    <span className="text-sm text-gray-600 inline-flex items-center gap-2">
                      Analyse en cours
                      <LoadingDots />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <ModernButton
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={fetchPrediction}
                icon={<Send size={18} />}
              >
                {loading ? 'Analyse...' : 'Analyser maintenant'}
              </ModernButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;