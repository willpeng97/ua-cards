import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import type { CartItem } from '../utils/cartStorage';
import { getCartItems, getTotalAmount, updateQuantity, removeFromCart } from '../utils/cartStorage';
import processImg from '../assets/purchase_process.png';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SummarySection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const Title = styled.h1`
  color: var(--neutral-800);
  font-size: var(--font-size-xxl);
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const FormField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--neutral-700);
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--neutral-300);
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--neutral-200);
`;

const CartItemImage = styled.img`
  width: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CartItemTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;

const CartItemCode = styled.div`
  color: var(--neutral-600);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const CartItemPrice = styled.div`
  color: var(--neutral-600);
  font-size: 1.1rem;
  font-weight: 500;
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  height: 32px;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  height: 32px;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: background-color 0.2s ease;
  width: 32px;
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
  padding: 0 0.5rem;
  width: 36px;
  text-align: center;
  background: white;
  color: #333;
  font-size: 1rem;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    color: #ff4444;
  }
`;

const Total = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--neutral-200);
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--neutral-400);
    cursor: not-allowed;
  }
`;

const ProcessImage = styled.img`
  width: 100%;
  width: 100%;
  display: block;
  margin-bottom: 2rem;
`;

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    const updateCartData = () => {
      const items = getCartItems();
      setCartItems(items);
      setTotalAmount(getTotalAmount(items));
    };

    updateCartData();
    window.addEventListener('cartUpdated', updateCartData);

    return () => {
      window.removeEventListener('cartUpdated', updateCartData);
    };
  }, []);

  const handleQuantityChange = (code: string, newQuantity: number) => {
    const updatedItems = updateQuantity(code, newQuantity);
    setCartItems(updatedItems);
    setTotalAmount(getTotalAmount(updatedItems));
  };

  const handleRemoveItem = (code: string) => {
    const updatedItems = removeFromCart(code);
    setCartItems(updatedItems);
    setTotalAmount(getTotalAmount(updatedItems));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 實現結帳邏輯
    console.log('Checkout submitted:', formData);
  };

  return (
    <CheckoutContainer>
      <SummarySection>
        <ProcessImage src={processImg} alt="購買流程" />
        <Title>訂單內容</Title>
        {cartItems.map(item => (
          <CartItem key={item.code}>
            <CartItemImage src={item.image} alt={item.title} />
            <CartItemInfo>
              <CartItemDetails>
                <CartItemTitle>{item.title}</CartItemTitle>
                <CartItemCode>{item.code}</CartItemCode>
                <CartItemPrice>${item.price}</CartItemPrice>
              </CartItemDetails>
              <CartItemActions>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.code, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.code, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton onClick={() => handleRemoveItem(item.code)}>
                  <FaTrash />
                </RemoveButton>
              </CartItemActions>
            </CartItemInfo>
          </CartItem>
        ))}
        <Total>
          <span>總金額</span>
          <span>${totalAmount}</span>
        </Total>
      </SummarySection>
      <FormSection>
        <Title>結帳資訊</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormField>
              <Label htmlFor="phone">電話</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="email">電子郵件</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormField>
          </FormGroup>
          <SubmitButton type="submit">7-11 賣貨便自填單結帳</SubmitButton>
        </Form>
      </FormSection>
    </CheckoutContainer>
  );
};

export default CheckoutPage; 