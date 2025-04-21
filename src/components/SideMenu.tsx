import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const SideMenuContainer = styled.div`
  width: 240px;
  background-color: var(--neutral-100);
  border-radius: 8px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: var(--spacing-md);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuTitle = styled.h2`
  color: var(--neutral-800);
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color);
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: var(--spacing-md);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FF6B00;
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
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

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const MenuItem = styled.li<{ isActive?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--neutral-700)'};
  background-color: ${props => props.isActive ? 'var(--neutral-200)' : 'transparent'};
  border-radius: 4px;
  font-weight: ${props => props.isActive ? '600' : '400'};
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover {
    color: var(--primary-color);
    background-color: var(--neutral-200);
  }
`;

interface SideMenuProps {
  onSelect?: (item: string) => void;
  selectedItem?: string;
  onSearch?: (query: string) => void;
}

const SideMenu = ({ onSelect, selectedItem, onSearch }: SideMenuProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch?.('');
  };

  const animeList = [
    '全部商品',
    '咒術迴戰',
    '進擊的巨人',
    '我的英雄學院'
  ];

  return (
    <SideMenuContainer>
      <MenuTitle>卡牌分類</MenuTitle>
      <SearchContainer>
        <SearchIcon />
        <SearchInput 
          type="text" 
          placeholder="搜尋卡牌..." 
          value={searchValue}
          onChange={handleSearch}
        />
        {searchValue && (
          <ClearButton onClick={handleClear}>
            <FaTimes />
          </ClearButton>
        )}
      </SearchContainer>
      <MenuList>
        {animeList.map((item) => (
          <MenuItem 
            key={item}
            onClick={() => onSelect?.(item)}
            isActive={item === selectedItem}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </SideMenuContainer>
  );
};

export default SideMenu; 