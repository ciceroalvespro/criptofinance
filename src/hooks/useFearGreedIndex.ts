import { useState, useEffect } from 'react';

interface FearGreedData {
  value: number;
  change: number;
  classification: string;
}

const staticFearGreedData: FearGreedData = {
  value: 55,
  change: 2.5,
  classification: 'Neutro'
};

export const useFearGreedIndex = () => {
  const [fearGreedData, setFearGreedData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular um delay de carregamento
    const timer = setTimeout(() => {
      setFearGreedData(staticFearGreedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { fearGreedData, loading, error };
}; 