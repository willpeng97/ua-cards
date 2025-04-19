import styled from 'styled-components';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 160px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ProductInfo = styled.div`
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductCode = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
  border-radius: 4px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #FF6B00;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0.25rem 0;
  }
`;

const StockInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const QuantityButton = styled.button`
  background: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e0e0e0;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 1rem;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.25rem;

  @media (max-width: 768px) {
    width: 40px;
    padding: 0.2rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #FF6B00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e55c00;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

interface ProductCardProps {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
}

const ProductCard = ({ image, title, code, price, stock }: ProductCardProps) => {
  return (
    <CardContainer>
      <ProductImage src={image} alt={title} />
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductCode>{code}</ProductCode>
        <ProductPrice>NT$ {price}</ProductPrice>
        <StockInfo>庫存: {stock}</StockInfo>
        <QuantityControl>
          <QuantityButton>-</QuantityButton>
          <QuantityInput type="number" min="1" max={stock} defaultValue="1" />
          <QuantityButton>+</QuantityButton>
        </QuantityControl>
        <AddToCartButton>加入購物車</AddToCartButton>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard; 