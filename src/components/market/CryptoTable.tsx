import React, { useState } from 'react';
import styled from 'styled-components';

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

interface CryptoTableProps {
  data: CryptoData[];
  searchQuery: string;
}

type SortField = 'name' | 'current_price' | 'price_change_percentage_24h' | 'market_cap' | 'total_volume' | 'circulating_supply' | 'market_cap_rank';
type SortDirection = 'asc' | 'desc';

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

  @media (max-width: 768px) {
    width: 100%;
    margin: 1rem auto;
    border-radius: 0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Th = styled.th<{ width?: string; sortable?: boolean }>`
  padding: 1rem;
  text-align: left;
  background: rgba(255, 255, 255, 0.05);
  font-weight: 600;
  width: ${props => props.width || 'auto'};
  white-space: nowrap;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  user-select: none;

  &:hover {
    background: ${props => props.sortable ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const SortIcon = styled.span<{ active: boolean; direction: 'asc' | 'desc' }>`
  margin-left: 4px;
  opacity: ${props => props.active ? 1 : 0.3};
  transform: ${props => props.direction === 'desc' ? 'rotate(180deg)' : 'none'};
`;

const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const CoinCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const PriceChange = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#00ff9d' : '#ff4d4d'};
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

const CryptoTable: React.FC<CryptoTableProps> = ({ data, searchQuery }) => {
  const [sortField, setSortField] = useState<SortField>('market_cap_rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortData = (data: CryptoData[]) => {
    return [...data].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'current_price':
          comparison = a.current_price - b.current_price;
          break;
        case 'price_change_percentage_24h':
          comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
          break;
        case 'market_cap':
          comparison = a.market_cap - b.market_cap;
          break;
        case 'total_volume':
          comparison = a.total_volume - b.total_volume;
          break;
        case 'circulating_supply':
          comparison = a.circulating_supply - b.circulating_supply;
          break;
        case 'market_cap_rank':
          comparison = a.market_cap_rank - b.market_cap_rank;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const filteredData = data.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = sortData(filteredData);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th width="5%" sortable onClick={() => handleSort('market_cap_rank')}>
              #
              <SortIcon active={sortField === 'market_cap_rank'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="15%" sortable onClick={() => handleSort('name')}>
              Moeda
              <SortIcon active={sortField === 'name'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="15%" sortable onClick={() => handleSort('current_price')}>
              Preço
              <SortIcon active={sortField === 'current_price'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="15%" sortable onClick={() => handleSort('price_change_percentage_24h')}>
              24h
              <SortIcon active={sortField === 'price_change_percentage_24h'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="20%" sortable onClick={() => handleSort('market_cap')}>
              Cap. Mercado
              <SortIcon active={sortField === 'market_cap'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="20%" sortable onClick={() => handleSort('total_volume')}>
              Volume 24h
              <SortIcon active={sortField === 'total_volume'} direction={sortDirection}>↑</SortIcon>
            </Th>
            <Th width="15%" sortable onClick={() => handleSort('circulating_supply')}>
              Circulação
              <SortIcon active={sortField === 'circulating_supply'} direction={sortDirection}>↑</SortIcon>
            </Th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((crypto) => (
            <Tr key={crypto.id}>
              <Td>{crypto.market_cap_rank}</Td>
              <Td>
                <CoinCell>
                  <img src={crypto.image} alt={crypto.name} />
                  <span>{crypto.name}</span>
                </CoinCell>
              </Td>
              <Td>${formatNumber(crypto.current_price)}</Td>
              <Td>
                <PriceChange isPositive={crypto.price_change_percentage_24h > 0}>
                  {crypto.price_change_percentage_24h > 0 ? '↑' : '↓'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </PriceChange>
              </Td>
              <Td>{formatNumber(crypto.market_cap)}</Td>
              <Td>{formatNumber(crypto.total_volume)}</Td>
              <Td>{formatNumber(crypto.circulating_supply)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable; 