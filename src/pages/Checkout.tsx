import styled from 'styled-components';
import { useState, useEffect } from 'react';
import type { CartItem } from '../utils/cartStorage';
import { getCartItems, getTotalAmount } from '../utils/cartStorage';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  margin-bottom: 2rem;
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
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--neutral-200);
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
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
  color: var(--neutral-600);
`;

const CartItemQuantity = styled.div`
  color: var(--neutral-600);
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
    const items = getCartItems();
    setCartItems(items);
    setTotalAmount(getTotalAmount(items));
  }, []);

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
        <Title>訂單摘要</Title>
        {cartItems.map(item => (
          <CartItem key={item.code}>
            <CartItemImage src={item.image} alt={item.title} />
            <CartItemInfo>
              <CartItemTitle>{item.title}</CartItemTitle>
              <CartItemPrice>${item.price}</CartItemPrice>
              <CartItemQuantity>數量: {item.quantity}</CartItemQuantity>
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
            <Label htmlFor="phone">電話</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">電子郵件</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">確認結帳</SubmitButton>
        </Form>
      </FormSection>
    </CheckoutContainer>
  );
};

export default CheckoutPage; 