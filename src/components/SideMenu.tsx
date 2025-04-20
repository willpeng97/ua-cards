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

const MenuItem = styled.li`
  padding: var(--spacing-sm) 0;
  cursor: pointer;
  color: var(--neutral-700);
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

interface SideMenuProps {
  onSelect?: (item: string) => void;
}

const SideMenu = ({ onSelect }: SideMenuProps) => {
  const animeList = [
    '鬼滅之刃',
    '咒術迴戰',
    '進擊的巨人',
    '間諜家家酒',
    '我推的孩子'
  ];

  return (
    <SideMenuContainer>
      <MenuTitle>動漫作品</MenuTitle>
      <MenuList>
        {animeList.map((item) => (
          <MenuItem 
            key={item}
            onClick={() => onSelect?.(item)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </SideMenuContainer>
  );
};

export default SideMenu; 