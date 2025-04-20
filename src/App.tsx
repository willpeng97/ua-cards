import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import ProductList from './components/ProductList';
import { useState } from 'react';
import productsData from './data/products.json';

interface Product {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
  category: string;
}

const AppContainer = styled.div`
  background-color: var(--neutral-200);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  max-width: 1440px;
  margin: 0 auto;
`;

function App() {
  const [selectedAnime, setSelectedAnime] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(productsData);

  const handleAnimeSelect = (anime: string) => {
    setSelectedAnime(anime);
    if (anime === '全部商品') {
      // 如果選擇"全部"，顯示所有商品
      setProducts(productsData);
    } else {
      // 過濾特定類別的商品
      const filteredProducts = productsData.filter(
        (product: Product) => product.category === anime
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Navbar />
        <MainContent>
          <SideMenu 
            onSelect={handleAnimeSelect} 
            selectedItem={selectedAnime}
          />
          <ProductList products={products} title={selectedAnime} />
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
