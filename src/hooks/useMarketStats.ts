import { useState, useEffect } from 'react';

interface MarketStats {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  btc_dominance: number;
  active_cryptocurrencies: number;
}

const staticMarketStats: MarketStats = {
  total_market_cap: 1200000000000,
  total_volume: 50000000000,
  market_cap_change_percentage_24h: 1.5,
  btc_dominance: 48.5,
  active_cryptocurrencies: 2500
};

export const useMarketStats = () => {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular um delay de carregamento
    const timer = setTimeout(() => {
      setMarketStats(staticMarketStats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { marketStats, loading, error };
}; 