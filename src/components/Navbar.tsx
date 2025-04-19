import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import logo from '../assets/LOGO.png';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(to bottom, #FFB485, #F1F1F1);
  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  height: 48px;
  display: flex;
  align-items: center;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 200px;
  background-color: white;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FF6B00;
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.5rem;
  color: #666;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #FF6B00;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <NavbarContainer>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <NavLinks>
        <SearchContainer>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="搜尋商品..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <ClearButton onClick={handleClear}>
              <FaTimes />
            </ClearButton>
          )}
        </SearchContainer>
        <NavLink href="#">攻略</NavLink>
        <NavLink href="#">聯絡我們</NavLink>
        <NavLink href="#">購物車</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 