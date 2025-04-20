import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/LOGO.png';
import { useCart } from '../context/CartContext';

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
  width: 240px;
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

const CartButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #FF6B00;
  }
`;

const CartPopup = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: none;

  ${CartButton}:hover & {
    display: block;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CartItemPrice = styled.div`
  color: #666;
`;

const CartTotal = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

interface NavbarProps {
  onSearch: (keyword: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { cartItems, totalAmount } = useCart();

  useEffect(() => {
    // 延遲300ms後再進行搜尋，避免每次輸入都立即搜尋
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

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
            placeholder="搜尋卡牌..." 
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
        <CartButton>
          <FaShoppingCart />
          購物車
          <CartPopup>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map(item => (
                  <CartItem key={item.code}>
                    <CartItemImage src={item.image} alt={item.title} />
                    <CartItemInfo>
                      <CartItemTitle>{item.title}</CartItemTitle>
                      <CartItemPrice>
                        ${item.price} x {item.quantity}
                      </CartItemPrice>
                    </CartItemInfo>
                  </CartItem>
                ))}
                <CartTotal>
                  <span>總金額</span>
                  <span>${totalAmount}</span>
                </CartTotal>
              </>
            ) : (
              <EmptyCart>購物車是空的</EmptyCart>
            )}
          </CartPopup>
        </CartButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 