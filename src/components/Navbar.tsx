import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrash, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/LOGO.png';
import type { CartItem } from '../utils/cartStorage';
import { getCartItems, updateQuantity, removeFromCart, getTotalAmount } from '../utils/cartStorage';

const navLinkStyles = css`
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
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(to bottom, #FFB485, #F1F1F1);
  * {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled(Link)`
  height: 48px;

  @media (max-width: 768px) {
    height: 32px;
  }

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
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  ${navLinkStyles}
`;

const NavButton = styled.button`
  ${navLinkStyles}
  background: none;
  border: none;
  padding: 0;
`;

const NavPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: fit-content;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  text-align: left;
  margin-top: 0.5rem;
  @media (max-width: 768px) {
    right: -40px;
    z-index: 999;
  }
`;

const NavSection = styled.div`
  margin-top: 1rem;

  &:first-child {
    margin-top: 0;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #0066cc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
  }

  svg {
    font-size: 0.8rem;
  }
`;

const CartButton = styled.button`
  ${navLinkStyles}
  background: none;
  border: none;
  padding: 0;
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

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #333;
  }
`;

const CartItemImage = styled.img`
  width: 50px;
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

const CartItemCode = styled.div`
  color: var(--neutral-600);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
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

const CheckoutButton = styled(Link)`
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
  text-decoration: none;
  text-align: center;
  display: block;

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

const Navbar = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateCartData = () => {
    const items = getCartItems();
    setCartItems(items);
    setTotalAmount(getTotalAmount(items));
  };

  useEffect(() => {
    // 初始載入購物車數據
    updateCartData();

    // 添加事件監聽器
    window.addEventListener('cartUpdated', updateCartData);

    return () => {
      window.removeEventListener('cartUpdated', updateCartData);
    };
  }, []);

  const togglePopup = (popupName: string) => {
    if (popupName === 'cart') {
      updateCartData();
    }
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

  const handleQuantityChange = (code: string, newQuantity: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedItems = updateQuantity(code, newQuantity);
    setCartItems(updatedItems);
    setTotalAmount(getTotalAmount(updatedItems));
  };

  const handleRemoveItem = (code: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedItems = removeFromCart(code);
    setCartItems(updatedItems);
    setTotalAmount(getTotalAmount(updatedItems));
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <img src={logo} alt="Logo" />
      </Logo>
      <NavLinks>
        <NavLink to="/">首頁</NavLink>
        <NavButton 
          className="nav-popup-trigger"
          onClick={() => togglePopup('guide')}
        >
          攻略
          <FaChevronDown size={12} />
          <NavPopup isOpen={activePopup === 'guide'}>
            <NavSection>
              <NavItem to="https://rugiacreation.com/ua/search" target="_blank" rel="noopener noreferrer">
                路基亞 UA 中文卡表
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="https://torecards.com/unionarenatier/#google_vignette" target="_blank" rel="noopener noreferrer">
                Tier List
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="https://www.unionarena-tcg.com/tc/" target="_blank" rel="noopener noreferrer">
                Union Arena 官網
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="https://www.unionarena-tcg.com/tc/rules/limited.php" target="_blank" rel="noopener noreferrer">
                Union Arena 禁/限卡表
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="https://yuyu-tei.jp/" target="_blank" rel="noopener noreferrer">
                yuyu-tei 遊遊亭 / yuyu亭
                <FaExternalLinkAlt />
              </NavItem>
            </NavSection>
          </NavPopup>
        </NavButton>
        <NavButton 
          className="nav-popup-trigger"
          onClick={() => togglePopup('contact')}
        >
          聯絡我們
          <FaChevronDown size={12} />
          <NavPopup isOpen={activePopup === 'contact'}>
            <NavSection>
              <NavItem to="https://lin.ee/eRuNaiC" target="_blank" rel="noopener noreferrer">
                LINE 官方帳號 (@520nhcdh)
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="https://myship.7-11.com.tw/cart/easy/GM2410225591590" target="_blank" rel="noopener noreferrer">
                7-11 賣貨便自填單
                <FaExternalLinkAlt />
              </NavItem>
              <NavItem to="/report"rel="noopener noreferrer">
                客服回報單
              </NavItem>
              <NavItem to="/notice" rel="noopener noreferrer">
                購買須知
              </NavItem>
            </NavSection>
          </NavPopup>
        </NavButton>
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
                      <CartItemCode>{item.code}</CartItemCode>
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
                        <RemoveButton onClick={handleRemoveItem(item.code)}>
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
                <CheckoutButton to="/checkout">
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