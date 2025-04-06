import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  color: white;
  padding: 3rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #ff6b00;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: #ff6b00;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre Nós</FooterTitle>
          <FooterText>
            A CriptoFinance é sua plataforma completa para investimentos em criptomoedas,
            oferecendo ferramentas avançadas de análise e gestão de portfólio.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterLink to="/">Início</FooterLink>
          <FooterLink to="/market">Mercado</FooterLink>
          <FooterLink to="/portfolio">Portfólio</FooterLink>
          <FooterLink to="/onchain">OnChain</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterText>Email: contato@criptofinance.com</FooterText>
          <FooterText>Telefone: (11) 9999-9999</FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterText>© 2024 CriptoFinance. Todos os direitos reservados.</FooterText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 