import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  image: string;
}

const staticCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 45000,
    market_cap: 850000000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.5,
    total_volume: 25000000000,
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 2500,
    market_cap: 300000000000,
    market_cap_rank: 2,
    price_change_percentage_24h: -1.2,
    total_volume: 15000000000,
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    current_price: 320,
    market_cap: 50000000000,
    market_cap_rank: 3,
    price_change_percentage_24h: 0.8,
    total_volume: 8000000000,
    image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png'
  }
];

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular um delay de carregamento
    const timer = setTimeout(() => {
      setCryptoData(staticCryptoData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { cryptoData, loading, error };
}; 