import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.95) 0%,
    rgba(26, 35, 126, 0.95) 50%,
    rgba(13, 71, 161, 0.95) 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const LogoPart = styled.span<{ color: string }>`
  color: ${props => props.color};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  opacity: 0.9;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff6b00;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <LogoPart color="#fff">Cripto</LogoPart>
          <LogoPart color="#ff6b00">Finance</LogoPart>
        </Logo>
        <NavLinks>
          <NavLink to="/" onClick={handleScrollToTop}>Início</NavLink>
          <NavLink to="/market">Mercado</NavLink>
          <NavLink to="/portfolio">Portfólio</NavLink>
          <NavLink to="/onchain">Análise OnChain</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 