import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_change_24h: number;
  total_volume_change_24h: number;
  circulating_supply: number;
}

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&locale=pt',
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error('Formato de dados inválido');
        }

        const formattedData = result.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          market_cap_rank: coin.market_cap_rank,
          total_volume: coin.total_volume,
          price_change_percentage_24h: coin.price_change_percentage_24h || 0,
          image: coin.image,
          market_cap_change_24h: coin.market_cap_change_24h || 0,
          total_volume_change_24h: coin.total_volume_change_24h || 0,
          circulating_supply: coin.circulating_supply || 0
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Erro ao buscar dados de criptomoedas:', err);
        setError('Erro ao carregar dados do mercado');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}; 