import React from 'react';
import styled from 'styled-components';
import ServiceCard from './ServiceCard';
import Navbar from './Navbar';
import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';

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

const HeroSection = styled.section`
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

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  line-height: 1.1;
  color: #000000;
`;

const HeroSubtitle = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.1;
  background: linear-gradient(135deg, #1976d2 0%, #0d47a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`;

const HeroButton = styled.a`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  color: white;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.3);
  position: relative;
  z-index: 10;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(26, 35, 126, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
`;

const Certification = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
`;

const CertificationTitle = styled.h2`
  font-size: 2.2rem;
  color: #1a237e;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CertificationText = styled.p`
  color: #2c3e50;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 400;
`;

const CertificationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px rgba(26, 35, 126, 0.2);
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
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #1a237e;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: #0d47a1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledLink = styled.a`
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

const ContactSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, 
    rgba(26, 35, 126, 0.1) 0%,
    rgba(13, 71, 161, 0.1) 50%,
    rgba(255, 107, 0, 0.1) 100%
  );
  margin-top: 4rem;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  scroll-margin-top: 100px;
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a237e;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(26, 35, 126, 0.2);
  }
`;

const IconComponent: React.FC<{ icon: IconType }> = ({ icon: Icon }) => {
  if (!Icon) return null;
  const IconElement = Icon as React.ComponentType<{ size?: number }>;
  return <IconElement size={20} />;
};

const HomePage: React.FC = () => {
  const services = [
    {
      title: "Gestão de Pools de Liquidez",
      description: "Estratégias otimizadas para gerar renda passiva consistente em diversos protocolos DeFi, com monitoramento contínuo e rebalanceamento."
    },
    {
      title: "Alocação Inteligente de Ativos",
      description: "Planejamento estratégico para equilibrar retorno e segurança no mercado cripto, adaptando-se às condições de mercado."
    },
    {
      title: "Educação Financeira no DeFi",
      description: "Ensino desde o básico até estratégias avançadas para quem deseja entrar no universo da renda passiva digital."
    }
  ];

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('contato');
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroContent>
          <HeroTitle>Transforme seus</HeroTitle>
          <HeroSubtitle>Investimentos Cripto</HeroSubtitle>
          <HeroTitle>com estratégias</HeroTitle>
          <HeroTitle>profissionais</HeroTitle>
          <HeroDescription>
            Empresa especializada em provisão de liquidez e gestão estratégica de ativos digitais, 
            oferecendo soluções personalizadas para maximizar seus retornos no mercado cripto.
          </HeroDescription>
          <HeroButton href="#contato" onClick={handleScrollToContact}>Comece Agora</HeroButton>
        </HeroContent>
      </HeroSection>
      
      <Container>
        <ServicesContainer id="servicos">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </ServicesContainer>

        <Certification>
          <CertificationTitle>Certificação Profissional</CertificationTitle>
          <CertificationText>
            Nossa equipe é certificada pela Blockchain Council como Certified DeFi Expert (CDE), 
            demonstrando profundo conhecimento em finanças descentralizadas, segurança blockchain 
            e estratégias de investimento em DeFi.
          </CertificationText>
          <CertificationBadge>Certified DeFi Expert (CDE)</CertificationBadge>
        </Certification>

        <ContactSection id="contato">
          <ContactContainer>
            <ContactTitle>Vamos Conversar</ContactTitle>
            <ContactSubtitle>
              Entre em contato para descobrir como posso ajudar em seus investimentos
            </ContactSubtitle>
            <ContactForm>
              <FormGroup>
                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" name="name" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Seu e-mail</Label>
                <Input type="email" id="email" name="email" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Mensagem</Label>
                <TextArea id="message" name="message" required />
              </FormGroup>
              <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
            </ContactForm>
          </ContactContainer>
        </ContactSection>
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
            <SocialIcons>
              <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <IconWrapper>
                  <IconComponent icon={FaLinkedin} />
                </IconWrapper>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <IconWrapper>
                  <IconComponent icon={FaInstagram} />
                </IconWrapper>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <IconWrapper>
                  <IconComponent icon={FaTwitter} />
                </IconWrapper>
              </SocialIcon>
              <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
                <IconWrapper>
                  <IconComponent icon={FaGithub} />
                </IconWrapper>
              </SocialIcon>
            </SocialIcons>
          </CompanyInfo>
          <QuickLinks>
            <QuickLinksTitle>Links Rápidos</QuickLinksTitle>
            <LinkList>
              <LinkItem>
                <StyledLink 
                  href="#inicio" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Início
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink 
                  href="#servicos" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('servicos');
                    if (section) {
                      const yOffset = -80;
                      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  Sobre
                </StyledLink>
              </LinkItem>
              <LinkItem>
                <StyledLink 
                  href="#contato" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('contato');
                    if (section) {
                      const yOffset = -80;
                      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                >
                  Contato
                </StyledLink>
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

export default HomePage; 