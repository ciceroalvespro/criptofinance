import React, { useState } from 'react';
import styled from 'styled-components';
import { useCryptoData } from '../hooks/useCryptoData';
import { useMarketStats } from '../hooks/useMarketStats';
import { useFearGreedIndex } from '../hooks/useFearGreedIndex';
import CryptoTable from '../components/market/CryptoTable';
import MarketOverviewCards from '../components/market/MarketOverviewCards';
import SearchBar from '../components/market/SearchBar';
import Navbar from '../components/Navbar';

const MarketContainer = styled.div`
  padding: 0;
  max-width: 100%;
  margin: 0;
  margin-top: 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  color: #fff;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MarketTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); // Subtrair a altura do Navbar
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-top-color: #ff6b00;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 4px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.75rem;
    margin: 0.75rem 0;
  }
`;

const Market: React.FC = () => {
  const { data: cryptoData, loading: cryptoLoading, error: cryptoError } = useCryptoData();
  const { stats: marketStats, loading: statsLoading, error: statsError } = useMarketStats();
  const { data: fearGreedData, loading: fearGreedLoading, error: fearGreedError } = useFearGreedIndex();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Só mostra loading se todos os dados estiverem carregando
  const loading = cryptoLoading && statsLoading && fearGreedLoading;

  if (loading) {
    return (
      <MarketContainer>
        <Navbar />
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </MarketContainer>
    );
  }

  return (
    <MarketContainer>
      <Navbar />
      <ContentContainer>
        <MarketTitle>Mercado de Criptomoedas</MarketTitle>
        
        {fearGreedError && <ErrorMessage>{fearGreedError}</ErrorMessage>}
        {cryptoError && <ErrorMessage>{cryptoError}</ErrorMessage>}
        
        <MarketOverviewCards 
          marketCap={marketStats?.total_market_cap}
          btcDominance={marketStats?.btc_dominance}
          fearGreedIndex={fearGreedData?.value}
          fearGreedChange={fearGreedData?.change}
        />

        <SearchBar onSearch={handleSearch} />
      </ContentContainer>

      {cryptoData && cryptoData.length > 0 && (
        <CryptoTable 
          data={cryptoData}
          searchQuery={searchQuery}
        />
      )}
    </MarketContainer>
  );
};

export default Market; 