import React from 'react';
import styled from 'styled-components';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MarketOverviewCardsProps {
  marketCap?: number;
  btcDominance?: number;
  fearGreedIndex?: number;
  fearGreedChange?: number;
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.8rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
`;

const CardValue = styled.div`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardChange = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isPositive ? '#00ff9d' : '#ff4d4d'};
  font-size: 1rem;
  font-weight: 500;
`;

const formatNumber = (num?: number): string => {
  if (!num) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

export const MarketOverviewCards: React.FC<MarketOverviewCardsProps> = ({
  marketCap,
  btcDominance,
  fearGreedIndex,
  fearGreedChange
}) => {
  return (
    <CardsContainer>
      <Card>
        <CardTitle>Valor de Mercado Global</CardTitle>
        <CardValue>{formatNumber(marketCap)}</CardValue>
      </Card>

      <Card>
        <CardTitle>Dominância do BTC</CardTitle>
        <CardValue>{btcDominance ? `${btcDominance.toFixed(2)}%` : 'N/A'}</CardValue>
      </Card>

      <Card>
        <CardTitle>Índice de Medo e Ganância</CardTitle>
        <CardValue>{fearGreedIndex || 'N/A'}</CardValue>
        {fearGreedChange !== undefined && (
          <CardChange isPositive={fearGreedChange > 0}>
            {fearGreedChange > 0 ? (
              <ArrowUp size={18} />
            ) : (
              <ArrowDown size={18} />
            )}
            {Math.abs(fearGreedChange).toFixed(2)}%
          </CardChange>
        )}
      </Card>
    </CardsContainer>
  );
}; 