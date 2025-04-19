import styled from 'styled-components';

const MenuContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const MenuTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FF6B00;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }
`;

const MenuItem = styled.li`
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const MenuLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  display: block;
  padding: 0.5rem 0;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #FF6B00;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.25rem 0;
  }
`;

interface SideMenuProps {
  onSelectCategory: (category: string) => void;
}

const SideMenu = ({ onSelectCategory }: SideMenuProps) => {
  const categories = [
    '全部商品',
    '海賊王',
    '死神',
    '幽遊白書',
    '火影忍者',
    '七龍珠',
    '遊戲王',
    '寶可夢',
    '鋼之鍊金術師',
    '進擊的巨人',
    '咒術迴戰'
  ];

  return (
    <MenuContainer>
      <MenuTitle>動漫作品</MenuTitle>
      <MenuList>
        {categories.map((category) => (
          <MenuItem key={category}>
            <MenuLink onClick={() => onSelectCategory(category)}>
              {category}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  );
};

export default SideMenu; 