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

const CryptoAI = ({ selectedCoin = "bitcoin" }: { selectedCoin: string }) => {
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
      alert("⚠️ Erreur: Vérifie que ton serveur Python est lancé !\n\nCommande: python app.py");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/8 rounded-2xl overflow-hidden">
      
      {/* Header - Plus d'espace */}
      <div className="p-7 border-b border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-br from-[#7000FF] to-[#5000CC] rounded-xl shadow-lg">
            <BrainCircuit size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Oracle AI</h2>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider font-mono mt-1">
              Neural Engine v2.0
            </p>
          </div>
        </div>
        {data && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/25 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wide">Active</span>
          </div>
        )}
      </div>

      {/* Contenu Principal - Espacement généreux */}
      <div className="p-8 min-h-[560px] flex flex-col justify-center">
        
        {/* État Initial */}
        {!data && !loading && (
          <div className="text-center space-y-8 py-10">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-[#7000FF]/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-b from-white/10 to-white/5 border-2 border-white/10 flex items-center justify-center">
                <Zap size={36} className="text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">Prêt à Analyser</h3>
              <p className="text-base text-gray-400 max-w-[300px] mx-auto leading-relaxed">
                Lancez l'analyse IA pour obtenir des prédictions sur{' '}
                <span className="text-white font-semibold capitalize">{selectedCoin}</span>
              </p>
            </div>
          </div>
        )}

        {/* Chargement */}
        {loading && (
          <div className="text-center space-y-8 py-10">
            <div className="relative w-20 h-20 mx-auto">
              <Loader2 className="w-full h-full text-[#7000FF] animate-spin" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-[#7000FF]/30 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <p className="text-base text-purple-300 font-semibold animate-pulse">Analyse en cours</p>
              <div className="flex gap-2 justify-center">
                <div className="w-2.5 h-2.5 bg-[#7000FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-[#7000FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-[#7000FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Résultats - Espacement PRO */}
        {data && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Titre Section */}
            <div className="text-center pb-5 border-b border-white/8">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                Tendance Prédite
              </p>
            </div>

            {/* Carte Tendance - Plus grande */}
            <div className={`
              p-8 rounded-xl border-2 text-center
              ${data.ai_analysis.color === 'green' 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-rose-500/10 border-rose-500/30'}
            `}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`
                  p-4 rounded-xl
                  ${data.ai_analysis.color === 'green' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}
                `}>
                  {data.ai_analysis.color === 'green' 
                    ? <TrendingUp size={32} className="text-emerald-400" strokeWidth={2.5} /> 
                    : <TrendingDown size={32} className="text-rose-400" strokeWidth={2.5} />
                  }
                </div>
              </div>
              <h3 className={`
                text-4xl font-black tracking-tight
                ${data.ai_analysis.color === 'green' ? 'text-emerald-400' : 'text-rose-400'}
              `}>
                {data.ai_analysis.trend}
              </h3>
            </div>

            {/* Métriques - Espacement augmenté */}
            <div className="space-y-4">
              
              {/* Confiance */}
              <div className="p-5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/8 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400 font-bold tracking-wide">
                    Confiance AI
                  </span>
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    {data.ai_analysis.confidence}
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7000FF] to-[#00C2FF] rounded-full transition-all duration-1000" 
                    style={{ width: data.ai_analysis.confidence }}
                  ></div>
                </div>
              </div>

              {/* Prix Cible */}
              <div className="p-5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/8 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 font-bold tracking-wide">
                    Prix Cible
                  </span>
                  <span className="text-2xl font-black text-white font-mono tabular-nums">
                    ${data.ai_analysis.target_price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className={`
                    w-2 h-2 rounded-full animate-pulse
                    ${data.ai_analysis.color === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}
                  `}></div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    24h Estimation
                  </span>
                </div>
              </div>

              {/* Volatilité */}
              <div className="p-5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/8 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-bold tracking-wide">
                    Volatilité
                  </span>
                  <span className="text-2xl font-black text-white tabular-nums">
                    {data.ai_analysis.volatility_index.toFixed(2)}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-center pt-4 border-t border-white/8">
              <p className="text-xs text-gray-600 uppercase tracking-wide">
                Dernière analyse: {new Date(data.timestamp * 1000).toLocaleTimeString('fr-FR')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bouton CTA - AMÉLIORATION MAJEURE */}
      <div className="p-8 pt-0">
        <button
          onClick={fetchPrediction}
          disabled={loading}
          aria-label={loading ? "Analyse en cours" : data ? "Relancer l'analyse" : "Lancer la prédiction"}
          className={`
            w-full py-5 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-300
            min-h-[56px] flex items-center justify-center gap-3
            ${loading 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
              : 'bg-gradient-to-r from-[#7000FF] to-[#5000CC] text-white hover:shadow-xl hover:shadow-[#7000FF]/30 active:scale-[0.98] border-2 border-[#7000FF]/50 hover:border-[#7000FF]'
            }
          `}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Calcul en cours...
            </>
          ) : data ? (
            <>
              Relancer l'Analyse
              <Zap size={20} />
            </>
          ) : (
            <>
              Lancer la Prédiction
              <Zap size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CryptoAI;