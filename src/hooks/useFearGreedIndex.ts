import { useState, useEffect } from 'react';

interface FearGreedData {
  value: number;
  classification: string;
  change: number;
}

export const useFearGreedIndex = () => {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.alternative.me/fng/');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar índice');
        }

        const result = await response.json();
        
        if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
          throw new Error('Formato de dados inválido');
        }

        const currentValue = parseInt(result.data[0].value);
        const previousValue = result.data[1] ? parseInt(result.data[1].value) : currentValue;

        if (isNaN(currentValue)) {
          throw new Error('Valor inválido');
        }

        const change = currentValue - previousValue;

        setData({
          value: currentValue,
          classification: result.data[0].value_classification || getClassification(currentValue),
          change
        });
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar índice de medo e ganância:', err);
        setError('Erro ao carregar índice de medo e ganância');
        // Mantém os dados anteriores em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Atualiza a cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  const getClassification = (value: number): string => {
    if (value >= 0 && value <= 20) return 'Medo Extremo';
    if (value > 20 && value <= 40) return 'Medo';
    if (value > 40 && value <= 60) return 'Neutro';
    if (value > 60 && value <= 80) return 'Ganância';
    return 'Ganância Extrema';
  };

  return { data, loading, error };
}; 