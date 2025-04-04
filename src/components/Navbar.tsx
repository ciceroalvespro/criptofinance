import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
  display: flex;
  gap: 0.5rem;
`;

const LogoPart = styled.span<{ color: string }>`
  color: ${props => props.color};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #1a237e;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1001;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
`;

const DropdownItem = styled(Link)`
  color: #1a237e;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(26, 35, 126, 0.1);
  }
`;

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSobreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      handleScroll(e, 'servicos');
    } else {
      window.location.href = '/#servicos';
    }
  };

  const handleInicioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      handleScrollToTop(e);
    } else {
      window.location.href = '/';
    }
  };

  const handleContatoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      handleScroll(e, 'contato');
    } else {
      window.location.href = '/#contato';
    }
  };

  return (
    <NavContainer>
      <Logo>
        <LogoText>
          <LogoPart color="#1a237e">Cripto</LogoPart>
          <LogoPart color="#ff6b00">Finance</LogoPart>
        </LogoText>
      </Logo>
      <NavLinks>
        <NavLink to="/" onClick={handleInicioClick}>Início</NavLink>
        <NavLink to="/#servicos" onClick={handleSobreClick}>Sobre</NavLink>
        <DropdownContainer ref={dropdownRef}>
          <NavLink to="#" onClick={toggleDropdown}>Ferramentas</NavLink>
          <DropdownContent isOpen={isDropdownOpen}>
            <DropdownItem to="/mercado">Mercado</DropdownItem>
            <DropdownItem to="/#portfolio">Portfólio</DropdownItem>
            <DropdownItem to="/#dados-onchain">Dados Onchain</DropdownItem>
          </DropdownContent>
        </DropdownContainer>
        <NavLink to="/#contato" onClick={handleContatoClick}>Contato</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 