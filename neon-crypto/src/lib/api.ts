import axios from "axios";

// --- TYPES ---
export interface MarketData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CoinInfo {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
  image: string;
}

// --- API CLIENT ---
const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 5000, // On abandonne après 5 secondes
});

// --- DONNÉES DE SECOURS (MOCK) ---
// Utilisées si l'API nous bloque (Rate Limit)
const getMockMarketChart = (days: string): MarketData => {
  const points = days === "1" ? 24 : 30; // 24h ou 30 jours
  const now = Date.now();
  const prices: [number, number][] = [];
  
  let price = 50000;
  for (let i = points; i >= 0; i--) {
    // Simule une variation de prix aléatoire
    price = price * (1 + (Math.random() * 0.1 - 0.05));
    prices.push([now - i * 3600 * 1000 * 24, price]);
  }

  return {
    prices,
    market_caps: [],
    total_volumes: []
  };
};

const getMockCoinData = (coinId: string): CoinInfo => {
  return {
    id: coinId,
    name: coinId.toUpperCase(),
    current_price: 42000 + Math.random() * 1000,
    price_change_percentage_24h: Math.random() * 10 - 5, // Entre -5% et +5%
    total_volume: 35000000000,
    market_cap: 850000000000,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" // Logo BTC par défaut
  };
};

// --- FONCTIONS D'APPEL ---

// Récupérer l'historique (Graphique)
export const fetchMarketChart = async (coinId: string, days: string): Promise<MarketData> => {
  try {
    const { data } = await api.get(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: days,
        interval: days === "1" ? "hourly" : "daily" 
      },
    });
    return data;
  } catch (error) {
    console.warn("API Error (Market Chart) - Using Mock Data", error);
    return getMockMarketChart(days);
  }
};

// Récupérer les infos temps réel (Prix, Volume...)
export const fetchCoinData = async (coinId: string): Promise<CoinInfo> => {
  try {
    const { data } = await api.get(`/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids: coinId,
      },
    });
    if (!data || data.length === 0) throw new Error("No data found");
    return {
      id: data[0].id,
      name: data[0].name,
      current_price: data[0].current_price,
      price_change_percentage_24h: data[0].price_change_percentage_24h,
      total_volume: data[0].total_volume,
      market_cap: data[0].market_cap,
      image: data[0].image,
    };
  } catch (error) {
    console.warn("API Error (Coin Data) - Using Mock Data", error);
    return getMockCoinData(coinId);
  }
};