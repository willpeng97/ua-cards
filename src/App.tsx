import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import ProductList from './components/ProductList';
import { useState } from 'react';
import products from './data/products.json';

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

  const handleAnimeSelect = (anime: string) => {
    setSelectedAnime(anime);
    // 這裡可以添加過濾商品的邏輯
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Navbar />
        <MainContent>
          <SideMenu onSelect={handleAnimeSelect} />
          <ProductList products={products} />
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
