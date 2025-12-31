"use client";

import React, { useState } from 'react';
import { BrainCircuit, Loader2, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface PredictionResult {
  coin: string;
  ai_analysis: {
    trend: string;
    confidence: string;
    volatility_index: number;
    sentiment_score: number;
    target_price: number;
    color: string;
  };
  timestamp: number;
}

const CryptoAI = ({ selectedCoin = "BTC" }: { selectedCoin: string }) => {
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
      alert("Erreur: Vérifie que ton terminal Python est lancé !");
    } finally {
      setLoading(false);
    }
  };

  // Couleurs dynamiques selon le résultat
  const statusColor = data?.ai_analysis.color === 'green' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5' 
                    : data?.ai_analysis.color === 'red' ? 'text-rose-500 border-rose-500/30 bg-rose-500/5' 
                    : 'text-gray-400 border-gray-500/30';

  const glowEffect = data?.ai_analysis.color === 'green' ? 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]' 
                   : data?.ai_analysis.color === 'red' ? 'shadow-[0_0_40px_-10px_rgba(244,63,94,0.3)]' 
                   : 'shadow-none';

  return (
    <div className={`relative h-full flex flex-col justify-between glass-panel rounded-3xl overflow-hidden transition-all duration-500 ${glowEffect}`}>
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#7000FF] to-[#00C2FF] rounded-lg text-white shadow-lg shadow-purple-500/20">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-none">Oracle AI</h2>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Python Engine v2.0</span>
          </div>
        </div>
        {data && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>}
      </div>

      {/* Contenu */}
      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center relative">
        
        {!data && !loading && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 rounded-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex items-center justify-center mx-auto relative group">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Zap size={36} className="text-white fill-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-2">Prêt à Analyser</h3>
                <p className="text-sm text-gray-400 max-w-[260px] mx-auto leading-relaxed">
                  Lancez le réseau neuronal pour scanner le sentiment social du <span className="text-white font-bold underline decoration-purple-500 underline-offset-4 capitalize">{selectedCoin}</span>.
                </p>
             </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-5">
             <div className="relative">
               <div className="absolute inset-0 bg-[#7000FF] blur-2xl opacity-40 animate-pulse rounded-full"></div>
               <Loader2 className="w-14 h-14 text-[#7000FF] animate-spin relative z-10" />
             </div>
             <p className="text-xs text-purple-200 font-bold tracking-[0.2em] uppercase animate-pulse">Traitement des données...</p>
          </div>
        )}

        {data && (
          <div className="w-full space-y-5 animate-in slide-in-from-bottom-4 duration-500">
            {/* Résultat Principal */}
            <div className={`py-5 px-4 rounded-2xl border ${statusColor} relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 block mb-1">Tendance</span>
              <div className="text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                 {data.ai_analysis.color === 'green' ? <TrendingUp size={28}/> : <TrendingDown size={28}/>}
                 {data.ai_analysis.trend}
              </div>
            </div>

            {/* Grid Infos */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                 <span className="text-[10px] text-gray-400 uppercase font-bold">Confiance</span>
                 <div className="text-xl font-bold text-white mt-1">{data.ai_analysis.confidence}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                 <span className="text-[10px] text-gray-400 uppercase font-bold">Target</span>
                 <div className="text-xl font-mono text-white mt-1">${data.ai_analysis.target_price.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Bouton */}
      <div className="p-6 pt-0">
        <button
          onClick={fetchPrediction}
          disabled={loading}
          className={`
            w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 transform
            active:scale-[0.98] relative overflow-hidden group
            ${loading 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
              : 'bg-gradient-to-r from-[#7000FF] to-[#00C2FF] text-white shadow-[0_0_20px_rgba(112,0,255,0.3)] hover:shadow-[0_0_30px_rgba(112,0,255,0.5)] hover:scale-[1.01] border border-white/10'
            }
          `}
        >
          {/* Effet de brillance qui traverse le bouton */}
          {!loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>}
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? 'Calcul...' : data ? 'Relancer l\'analyse' : 'Lancer la Prédiction'}
            {!loading && <Zap size={16} className="fill-white" />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CryptoAI;