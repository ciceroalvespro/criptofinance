import React, { useState, useEffect } from 'react';
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

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, 
    rgba(13, 17, 62, 0.98) 0%,
    rgba(26, 35, 126, 0.98) 50%,
    rgba(13, 71, 161, 0.98) 100%
  );
  padding: 5rem 2rem;
  transition: right 0.3s ease;
  z-index: 1000;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  opacity: 0.9;
  transition: all 0.3s ease;
  padding: 0.8rem 0;
  position: relative;
  width: fit-content;

  &:hover {
    opacity: 1;
    color: #ff6b00;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
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

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
            <NavLink to="/onchain">OnChain</NavLink>
          </NavLinks>
          <HamburgerButton onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? '✕' : '☰'}
          </HamburgerButton>
        </NavContainer>
      </Nav>
      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
      <MobileMenu isOpen={isMenuOpen}>
        <MobileNavLink to="/" onClick={(e) => { handleScrollToTop(e); closeMenu(); }}>Início</MobileNavLink>
        <MobileNavLink to="/market" onClick={closeMenu}>Mercado</MobileNavLink>
        <MobileNavLink to="/portfolio" onClick={closeMenu}>Portfólio</MobileNavLink>
        <MobileNavLink to="/onchain" onClick={closeMenu}>OnChain</MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar; 