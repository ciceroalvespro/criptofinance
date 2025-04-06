import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaTwitter, FaGithub, FaLinkedin, FaChartLine, FaWallet, FaDatabase, FaGraduationCap } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/blockchain-bg.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(45deg, #fff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(Link)<{ primary?: boolean }>`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.primary ? '#ff6b00' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '2px solid white'};
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.primary ? '#ff8533' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Section = styled.section<{ dark?: boolean }>`
  padding: 5rem 2rem;
  background: ${props => props.dark ? '#1a237e' : '#ffffff'};
  color: ${props => props.dark ? '#ffffff' : '#1a237e'};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.color || 'inherit'};
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #fff;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

const DiferenciaisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DiferencialItem = styled.div`
  background: rgba(26, 35, 126, 0.05);
  border: 1px solid rgba(26, 35, 126, 0.1);
  padding: 1.2rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    background: rgba(26, 35, 126, 0.1);
  }
`;

const DiferencialTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
  color: #1a237e;
`;

const DiferencialDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #1a237e;
  opacity: 0.8;
  max-width: 200px;
`;

const CTASection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: #ff6b00;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff8533;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const QuickLink = styled(Link)`
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const IconComponent: React.FC<{ icon: IconType }> = ({ icon: Icon }) => {
  if (!Icon) return null;
  const IconElement = Icon as React.ComponentType<{ size?: number }>;
  return <IconElement size={20} />;
};

const HomePage: React.FC = () => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('servicos');
    if (servicesSection) {
      const yOffset = -80;
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>CriptoFinance</HeroTitle>
          <HeroSubtitle>
            Sua plataforma completa para análise e investimento em criptomoedas
          </HeroSubtitle>
          <HeroButtons>
            <HeroButton to="/market">Explorar Mercado</HeroButton>
            <HeroButton to="/portfolio">Gerenciar Portfólio</HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionContent>
          <SectionTitle>Quem Somos</SectionTitle>
          <AboutText>
            A Cripto Finance é uma empresa especializada em soluções de finanças descentralizadas (DeFi), 
            oferecendo serviços de provisão de liquidez, gestão de ativos digitais e consultoria estratégica. 
            Nosso foco também está na educação, capacitando investidores e empresas com conhecimento profundo 
            em análise on-chain e dinâmicas do mercado cripto.
          </AboutText>
        </SectionContent>
      </Section>

      <Section dark id="servicos">
        <SectionContent>
          <SectionTitle>Nossos Serviços</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <ServiceIcon>
                <IconComponent icon={FaChartLine} />
              </ServiceIcon>
              <ServiceTitle>Consultoria DeFi</ServiceTitle>
              <ServiceDescription>
                Estratégias personalizadas para maximizar seus retornos no mercado de finanças descentralizadas.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <ServiceIcon>
                <IconComponent icon={FaWallet} />
              </ServiceIcon>
              <ServiceTitle>Gestão de Ativos Digitais</ServiceTitle>
              <ServiceDescription>
                Gestão profissional de portfólios cripto com foco em segurança e rentabilidade.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <ServiceIcon>
                <IconComponent icon={FaDatabase} />
              </ServiceIcon>
              <ServiceTitle>Análise On-Chain</ServiceTitle>
              <ServiceDescription>
                Análise profunda de dados blockchain para tomada de decisões informadas.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <ServiceIcon>
                <IconComponent icon={FaGraduationCap} />
              </ServiceIcon>
              <ServiceTitle>Educação e Treinamentos</ServiceTitle>
              <ServiceDescription>
                Capacitação completa em DeFi, blockchain e análise de mercado cripto.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionTitle>Por que escolher a Cripto Finance?</SectionTitle>
          <DiferenciaisGrid>
            <DiferencialItem>
              <DiferencialTitle>Experiência Sólida</DiferencialTitle>
              <DiferencialDescription>
                Anos de experiência no mercado DeFi, com resultados comprovados para nossos clientes.
              </DiferencialDescription>
            </DiferencialItem>
            <DiferencialItem>
              <DiferencialTitle>Análises Personalizadas</DiferencialTitle>
              <DiferencialDescription>
                Estratégias inteligentes adaptadas ao seu perfil de investimento e objetivos.
              </DiferencialDescription>
            </DiferencialItem>
            <DiferencialItem>
              <DiferencialTitle>Time Especializado</DiferencialTitle>
              <DiferencialDescription>
                Profissionais altamente qualificados em blockchain e análise on-chain.
              </DiferencialDescription>
            </DiferencialItem>
            <DiferencialItem>
              <DiferencialTitle>Educação Clara</DiferencialTitle>
              <DiferencialDescription>
                Metodologia didática que torna o complexo mundo DeFi acessível a todos.
              </DiferencialDescription>
            </DiferencialItem>
          </DiferenciaisGrid>
        </SectionContent>
      </Section>

      <CTASection id="contato">
        <CTATitle>Pronto para transformar sua relação com o mercado cripto?</CTATitle>
        <CTADescription>
          Fale com nossos especialistas agora mesmo e descubra como podemos ajudar você.
        </CTADescription>
        <CTAButton onClick={handleScrollToContact}>
          Entrar em Contato
        </CTAButton>
      </CTASection>

      <Footer>
        <FooterContent>
          <QuickLinks>
            <QuickLink to="/">Início</QuickLink>
            <QuickLink to="/market">Mercado</QuickLink>
            <QuickLink to="/portfolio">Portfólio</QuickLink>
            <QuickLink to="/onchain">Análise OnChain</QuickLink>
          </QuickLinks>
          <SocialIcons>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <IconWrapper>
                <IconComponent icon={FaLinkedin} />
              </IconWrapper>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/criptofinanc/" target="_blank" rel="noopener noreferrer">
              <IconWrapper>
                <IconComponent icon={FaInstagram} />
              </IconWrapper>
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <IconWrapper>
                <IconComponent icon={FaTwitter} />
              </IconWrapper>
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <IconWrapper>
                <IconComponent icon={FaGithub} />
              </IconWrapper>
            </SocialIcon>
          </SocialIcons>
          <Copyright>
            © 2025 CriptoFinance. Todos os direitos reservados.
          </Copyright>
        </FooterContent>
      </Footer>
    </div>
  );
};

export default HomePage; 