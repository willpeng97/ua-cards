import styled from 'styled-components';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from 'react';

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 200px;
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
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

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

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  color: var(--neutral-700);
  transition: background-color 0.2s ease;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    background: #d0d0d0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0.5rem;
  width: 36px;
  text-align: center;
  background: white;
  color: var(--primary-dark);
  font-size: 0.9rem;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const AddToCartButton = styled.button`
  padding: 0.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-dark);
  }

  &:disabled {
    background: var(--neutral-400);
    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ImageModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
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
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer>
        <ProductImage 
          src={image} 
          alt={title} 
          onClick={handleImageClick}
        />
        <ProductInfo>
          <ProductTitle>{title}</ProductTitle>
          <ProductCode>{code}</ProductCode>
          <ProductPrice>NT$ {price}</ProductPrice>
          <StockInfo>庫存: {stock}</StockInfo>
          <ActionContainer>
            <QuantityControl>
              <QuantityButton 
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton 
                onClick={handleIncrease}
                disabled={quantity >= stock}
              >
                +
              </QuantityButton>
            </QuantityControl>
            <AddToCartButton disabled={stock === 0}>
              <MdOutlineAddShoppingCart />
            </AddToCartButton>
          </ActionContainer>
        </ProductInfo>
      </CardContainer>

      <ImageModal isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>
            <MdClose />
          </CloseButton>
          <ModalImage src={image} alt={title} />
        </ModalContent>
      </ImageModal>
    </>
  );
};

export default ProductCard; 