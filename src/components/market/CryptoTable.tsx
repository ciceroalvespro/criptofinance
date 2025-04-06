import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowUp, ArrowDown } from 'lucide-react';

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

interface CryptoTableProps {
  data: CryptoData[];
  searchQuery: string;
}

const TableContainer = styled.div`
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  border-radius: 16px;
  overflow-x: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  width: 95%;
  max-width: 1200px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    color: #ff6b00;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TableCell = styled.td`
  padding: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
`;

const TableRow = styled.tr`
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CryptoImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px;
`;

const CryptoName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CryptoNameText = styled.span`
  font-weight: 500;
  color: #fff;
`;

const CryptoSymbol = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const PriceChange = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isPositive ? '#00ff9d' : '#ff4d4d'};
  font-weight: 500;
`;

const formatNumber = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

export const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoData;
    direction: 'asc' | 'desc';
  }>({ key: 'market_cap_rank', direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'market_cap_rank') {
      return sortConfig.direction === 'asc' 
        ? a.market_cap_rank - b.market_cap_rank
        : b.market_cap_rank - a.market_cap_rank;
    }
    return sortConfig.direction === 'asc'
      ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
      : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
  });

  const handleSort = (key: keyof CryptoData) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort('market_cap_rank')}>
              #
            </TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader onClick={() => handleSort('current_price')}>
              Preço
            </TableHeader>
            <TableHeader onClick={() => handleSort('price_change_percentage_24h')}>
              24h %
            </TableHeader>
            <TableHeader onClick={() => handleSort('market_cap')}>
              Market Cap
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.market_cap_rank}</TableCell>
              <TableCell>
                <CryptoInfo>
                  <CryptoImage src={crypto.image} alt={crypto.name} />
                  <CryptoName>
                    <CryptoNameText>{crypto.name}</CryptoNameText>
                    <CryptoSymbol>{crypto.symbol.toUpperCase()}</CryptoSymbol>
                  </CryptoName>
                </CryptoInfo>
              </TableCell>
              <TableCell>{formatNumber(crypto.current_price)}</TableCell>
              <TableCell>
                <PriceChange isPositive={crypto.price_change_percentage_24h > 0}>
                  {crypto.price_change_percentage_24h > 0 ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </PriceChange>
              </TableCell>
              <TableCell>{formatNumber(crypto.market_cap)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}; 