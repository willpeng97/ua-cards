import styled from 'styled-components';

const SideMenuContainer = styled.div`
  width: 240px;
  background-color: var(--neutral-100);
  border-radius: 8px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: var(--spacing-md);
`;

const MenuTitle = styled.h2`
  color: var(--neutral-800);
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ isActive?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--neutral-700)'};
  background-color: ${props => props.isActive ? 'var(--neutral-200)' : 'transparent'};
  border-radius: 4px;
  font-weight: ${props => props.isActive ? '600' : '400'};

  &:hover {
    color: var(--primary-color);
    background-color: var(--neutral-200);
  }
`;

interface SideMenuProps {
  onSelect?: (item: string) => void;
  selectedItem?: string;
}

const SideMenu = ({ onSelect, selectedItem }: SideMenuProps) => {
  const animeList = [
    '全部商品',
    '咒術迴戰',
    '進擊的巨人',
    '我的英雄學院'
  ];

  return (
    <SideMenuContainer>
      <MenuTitle>卡牌分類</MenuTitle>
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