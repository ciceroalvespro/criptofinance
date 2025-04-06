import { useState, useEffect } from 'react';

interface MarketStats {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  btc_dominance: number;
}

export const useMarketStats = () => {
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/global'
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar estatísticas');
        }

        const result = await response.json();
        setStats({
          total_market_cap: result.data.total_market_cap.usd,
          total_volume: result.data.total_volume.usd,
          market_cap_change_percentage_24h: result.data.market_cap_change_percentage_24h_usd,
          btc_dominance: result.data.market_cap_percentage.btc
        });
      } catch (err) {
        setError('Erro ao carregar estatísticas do mercado');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
}; 