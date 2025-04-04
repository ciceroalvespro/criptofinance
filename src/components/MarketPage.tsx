import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(26, 35, 126, 0.05) 0%,
      rgba(13, 71, 161, 0.05) 50%,
      rgba(255, 107, 0, 0.05) 100%
    );
    z-index: -1;
  }
`;

const MarketSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, 
    rgba(26, 35, 126, 0.1) 0%,
    rgba(13, 71, 161, 0.1) 50%,
    rgba(255, 107, 0, 0.1) 100%
  );
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(26, 35, 126, 0.15) 0%,
      rgba(13, 71, 161, 0.15) 50%,
      rgba(255, 107, 0, 0.15) 100%
    );
    z-index: 1;
  }
`;

const MarketContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const MarketTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;
  color: #000000;
`;

const MarketSubtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.2;
  color: #1a237e;
`;

const MarketDescription = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: rgba(13, 17, 62, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  margin-top: 4rem;
  width: 100%;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CompanyInfo = styled.div`
  max-width: 500px;
`;

const CompanyName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const LogoPart = styled.span<{ color: string }>`
  color: ${props => props.color};
`;

const CompanyDescription = styled.p`
  line-height: 1.6;
  opacity: 0.9;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuickLinksTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.8rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 0;

  &:hover {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.8;
`;

const MarketPage: React.FC = () => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <MarketSection>
        <MarketContent>
          <MarketTitle>Análise de Mercado</MarketTitle>
          <MarketSubtitle>Informações em tempo real sobre o mercado cripto</MarketSubtitle>
          <MarketDescription>
            Acompanhe as principais tendências, preços e métricas do mercado de criptomoedas. 
            Nossa plataforma oferece dados atualizados e análises profissionais para ajudar você 
            a tomar decisões informadas sobre seus investimentos.
          </MarketDescription>
        </MarketContent>
      </MarketSection>
      
      <Container>
        {/* Aqui você pode adicionar os componentes de análise de mercado */}
      </Container>

      <Footer>
        <FooterContent>
          <CompanyInfo>
            <CompanyName>
              <LogoPart color="#1a237e">Cripto</LogoPart>
              <LogoPart color="#ff6b00">Finance</LogoPart>
            </CompanyName>
            <CompanyDescription>
              Empresa especializada em Finanças Descentralizadas e Blockchain, fornecendo orientação estratégica para empresas e indivíduos que desejam navegar com segurança neste novo paradigma financeiro.
            </CompanyDescription>
          </CompanyInfo>
          <QuickLinks>
            <QuickLinksTitle>Links Rápidos</QuickLinksTitle>
            <LinkList>
              <LinkItem>
                <StyledLink to="/">Início</StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink to="/#servicos">Sobre</StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink to="/#contato">Contato</StyledLink>
              </LinkItem>
            </LinkList>
          </QuickLinks>
        </FooterContent>
        <Copyright>
          © 2025 CriptoFinance. Todos os direitos reservados.
        </Copyright>
      </Footer>
    </div>
  );
};

export default MarketPage; 