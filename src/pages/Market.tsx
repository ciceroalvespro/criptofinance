import React, { useState } from 'react';
import styled from 'styled-components';
import { MarketOverviewCards } from '../components/market/MarketOverviewCards';
import { SearchBar } from '../components/market/SearchBar';
import { CryptoTable } from '../components/market/CryptoTable';
import { useCryptoData } from '../hooks/useCryptoData';
import { useMarketStats } from '../hooks/useMarketStats';
import { useFearGreedIndex } from '../hooks/useFearGreedIndex';

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
`;

const MarketTitle = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  background: rgba(255, 77, 77, 0.2);
  border: 1px solid rgba(255, 77, 77, 0.3);
  color: #ff4d4d;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: #fff;
  gap: 1.5rem;
  text-align: center;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #ff6b00;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Market: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { cryptoData, loading: cryptoLoading, error: cryptoError } = useCryptoData();
  const { marketStats, loading: statsLoading, error: statsError } = useMarketStats();
  const { fearGreedData, loading: fearGreedLoading, error: fearGreedError } = useFearGreedIndex();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCryptoData = cryptoData.filter(crypto => 
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isLoading = cryptoLoading || statsLoading || fearGreedLoading;
  const hasError = cryptoError || statsError || fearGreedError;

  if (isLoading) {
    return (
      <MarketContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Carregando dados do mercado...</LoadingText>
        </LoadingContainer>
      </MarketContainer>
    );
  }

  if (hasError) {
    return (
      <MarketContainer>
        <ErrorMessage>
          {cryptoError || statsError || fearGreedError}
        </ErrorMessage>
      </MarketContainer>
    );
  }

  return (
    <MarketContainer>
      <ContentContainer>
        <MarketTitle>Mercado de Criptomoedas</MarketTitle>
        
        <MarketOverviewCards 
          marketCap={marketStats?.total_market_cap}
          btcDominance={marketStats?.btc_dominance}
          fearGreedIndex={fearGreedData?.value}
          fearGreedChange={fearGreedData?.change}
        />

        <SearchBar onSearch={handleSearch} />
      </ContentContainer>

      <CryptoTable 
        data={filteredCryptoData}
        searchQuery={searchQuery}
      />
    </MarketContainer>
  );
};

export default Market; 