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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const CardTitle = styled.h3`
  color: #ff6b00;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ChangeIndicator = styled.div<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#00ff9d' : '#ff4d4d'};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
          <ChangeIndicator isPositive={fearGreedChange >= 0}>
            {fearGreedChange >= 0 ? '↑' : '↓'} {Math.abs(fearGreedChange)}
          </ChangeIndicator>
        )}
      </Card>
    </CardsContainer>
  );
};

export default MarketOverviewCards; 