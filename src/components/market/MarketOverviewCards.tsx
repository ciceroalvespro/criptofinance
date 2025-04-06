import React from 'react';
import styled from 'styled-components';

interface MarketOverviewCardsProps {
  marketCap?: number;
  btcDominance?: number;
  fearGreedIndex?: number;
  fearGreedChange?: number;
}

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  color: #ff6b00;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

const MarketOverviewCards: React.FC<MarketOverviewCardsProps> = ({
  marketCap,
  btcDominance,
  fearGreedIndex,
  fearGreedChange
}) => {
  return (
    <CardsContainer>
      <Card>
        <CardTitle>Capitalização de Mercado</CardTitle>
        <CardValue>{formatNumber(marketCap)}</CardValue>
      </Card>

      <Card>
        <CardTitle>Dominância do Bitcoin</CardTitle>
        <CardValue>{btcDominance ? `${btcDominance.toFixed(2)}%` : 'N/A'}</CardValue>
      </Card>

      <Card>
        <CardTitle>Índice de Medo e Ganância</CardTitle>
        <CardValue>{fearGreedIndex ? fearGreedIndex : 'N/A'}</CardValue>
        {fearGreedChange !== undefined && (
          <div style={{ color: fearGreedChange >= 0 ? '#00ff9d' : '#ff4d4d' }}>
            {fearGreedChange >= 0 ? '↑' : '↓'} {Math.abs(fearGreedChange)}
          </div>
        )}
      </Card>
    </CardsContainer>
  );
};

export default MarketOverviewCards; 