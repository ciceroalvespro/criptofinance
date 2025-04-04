import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #ff6b00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: #1a237e;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Navbar: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavContainer>
      <Logo>
        <LogoText>CriptoFinance</LogoText>
      </Logo>
      <NavLinks>
        <NavLink href="#inicio" onClick={handleScrollToTop}>Início</NavLink>
        <NavLink href="#servicos" onClick={(e) => handleScroll(e, 'servicos')}>Sobre</NavLink>
        <NavLink href="#contato" onClick={(e) => handleScroll(e, 'contato')}>Contato</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 