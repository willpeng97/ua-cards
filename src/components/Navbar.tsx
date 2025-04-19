import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #FF6B00;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
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
  return (
    <NavbarContainer>
      <Logo>卡牌交易平台</Logo>
      <NavLinks>
        <NavLink href="#">搜尋商品</NavLink>
        <NavLink href="#">攻略</NavLink>
        <NavLink href="#">聯絡我們</NavLink>
        <NavLink href="#">購物車</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 