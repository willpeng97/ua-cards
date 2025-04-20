import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaShoppingCart, FaTrash, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import logo from '../assets/LOGO.png';
import { useCart } from '../context/CartContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(to bottom, #FFB485, #F1F1F1);
  * {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
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
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: #FF6B00;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NavPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  text-align: left;
  margin-top: 0.5rem;
`;

const NavSection = styled.div`
  margin-top: 1rem;

  &:first-child {
    margin-top: 0;
  }
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #0066cc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: #FF6B00;
    text-decoration: underline;
  }

  svg {
    font-size: 0.8rem;
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: color 0.3s ease;
  font-size: 1rem;

  &:hover {
    color: #FF6B00;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #FF6B00;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CartPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  text-align: left;
  margin-top: 0.5rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  cursor: default;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  color: #333;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #333;
  }
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const CartItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CartItemTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
`;

const CartItemPrice = styled.div`
  color: #666;
  margin-bottom: 0.5rem;
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  height: 24px;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  height: 24px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #333;
  transition: background-color 0.2s ease;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 0.25rem;
  width: 32px;
  text-align: center;
  background: white;
  color: #333;
  font-size: 0.875rem;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #ff4444;
  }
`;

const CartTotal = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: #333;

  &:hover {
    color: #333;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--neutral-400);
    cursor: not-allowed;
  }
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
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const { cartItems, totalAmount, updateQuantity, removeFromCart } = useCart();

  const togglePopup = (popupName: string) => {
    setActivePopup(activePopup === popupName ? null : popupName);
  };

  const closeAllPopups = () => {
    setActivePopup(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-popup-trigger')) {
        closeAllPopups();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    // 延遲300ms後再進行搜尋，避免每次輸入都立即搜尋
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
  };

  const handleQuantityChange = (code: string, newQuantity: number) => (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    updateQuantity(code, newQuantity);
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
        <NavLink 
          className="nav-popup-trigger"
          onClick={() => togglePopup('guide')}
        >
          攻略
          <FaChevronDown size={12} />
          <NavPopup isOpen={activePopup === 'guide'}>
            <NavSection>
              <NavItem href="https://rugiacreation.com/ua/search" target="_blank" rel="noopener noreferrer">
                路基亞 UA 中文卡表
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://torecards.com/unionarenatier/#google_vignette" target="_blank" rel="noopener noreferrer">
                Tier List
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://www.unionarena-tcg.com/tc/" target="_blank" rel="noopener noreferrer">
                Union Arena 官網
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://www.unionarena-tcg.com/tc/rules/limited.php" target="_blank" rel="noopener noreferrer">
                Union Arena 禁/限卡表
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://yuyu-tei.jp/" target="_blank" rel="noopener noreferrer">
                yuyu-tei 遊遊亭 / yuyu亭
                <FaExternalLinkAlt />
              </NavItem>
            </NavSection>
          </NavPopup>
        </NavLink>
        <NavLink 
          className="nav-popup-trigger"
          onClick={() => togglePopup('contact')}
        >
          聯絡我們
          <FaChevronDown size={12} />
          <NavPopup isOpen={activePopup === 'contact'}>
            <NavSection>
              <NavItem href="https://myship.7-11.com.tw/cart/easy/GM2410225591590" target="_blank" rel="noopener noreferrer">
                7-11 賣貨便自填單
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://ua-cards.com/page/notice" target="_blank" rel="noopener noreferrer">
                購買須知
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://ua-cards.com/page/report" target="_blank" rel="noopener noreferrer">
                回報單
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem href="https://lin.ee/eRuNaiC" target="_blank" rel="noopener noreferrer">
                LINE 官方帳號 (@520nhcdh)
                <FaExternalLinkAlt />
              </NavItem>
            </NavSection>
          </NavPopup>
        </NavLink>
        <CartButton className="nav-popup-trigger" onClick={() => togglePopup('cart')}>
          <FaShoppingCart />
          購物車
          {cartItems.length > 0 && (
            <CartBadge>{cartItems.length}</CartBadge>
          )}
          <CartPopup isOpen={activePopup === 'cart'}>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map(item => (
                  <CartItem key={item.code}>
                    <CartItemImage src={item.image} alt={item.title} />
                    <CartItemInfo>
                      <CartItemTitle>{item.title}</CartItemTitle>
                      <CartItemPrice>
                        ${item.price}
                      </CartItemPrice>
                      <CartItemActions>
                        <QuantityControl>
                          <QuantityButton 
                            onClick={handleQuantityChange(item.code, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton 
                            onClick={handleQuantityChange(item.code, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </QuantityButton>
                        </QuantityControl>
                        <RemoveButton onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.code);
                        }}>
                          <FaTrash />
                        </RemoveButton>
                      </CartItemActions>
                    </CartItemInfo>
                  </CartItem>
                ))}
                <CartTotal>
                  <span>總金額</span>
                  <span>${totalAmount}</span>
                </CartTotal>
                <CheckoutButton>
                  前往結帳
                </CheckoutButton>
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