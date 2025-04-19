import styled from 'styled-components';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import ProductCard from './components/ProductCard';
import { useState } from 'react';
import products from './data/products.json';

const AppContainer = styled.div`
  background-color: #f5f5f5;
  width: 100vw;
`;

const MainContent = styled.main`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProductSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FF6B00;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState('全部商品');
  const filteredProducts = selectedCategory === '全部商品' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <SideMenu onSelectCategory={setSelectedCategory} />
        <ProductSection>
          <SectionTitle>{selectedCategory}</SectionTitle>
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                code={product.code}
                price={product.price}
                stock={product.stock}
              />
            ))}
          </ProductGrid>
        </ProductSection>
      </MainContent>
    </AppContainer>
  );
}

export default App;
