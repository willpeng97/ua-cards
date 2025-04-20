import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import ProductList from './components/ProductList';
import { useState, useCallback } from 'react';
import productsData from './mockData/products.json';
import { CartProvider } from './context/CartContext';

interface Product {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
  category: string;
}

const AppContainer = styled.div`
  background-color: #F1F1F1;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  margin: 0 auto;
`;

function App() {
  const [selectedAnime, setSelectedAnime] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterProducts = useCallback((category: string, query: string) => {
    let filtered = productsData;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) ||
        product.code.toLowerCase().includes(lowerQuery)
      );
      setSelectedAnime(`"${query}" 的搜尋結果`);
    } 
    else if (category && category !== '全部商品' && category !== '搜尋結果') {
      filtered = filtered.filter(product => product.category === category);
    } else {
      setSelectedAnime("全部商品");
    }

    return filtered;
  }, []);

  const handleAnimeSelect = (anime: string) => {
    setSelectedAnime(anime);
    const filteredProducts = filterProducts(anime, searchQuery);
    setProducts(filteredProducts);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 如果清空搜尋，使用 "全部商品" 作為分類
    const category = query ? selectedAnime : "全部商品";
    const filteredProducts = filterProducts(category, query);
    setProducts(filteredProducts);
  };

  return (
    <>
      <GlobalStyles />
      <CartProvider>
        <AppContainer>
          <Navbar onSearch={handleSearch} />
          <MainContent>
            <SideMenu 
              onSelect={handleAnimeSelect} 
              selectedItem={selectedAnime}
            />
            <ProductList products={products} title={selectedAnime} />
          </MainContent>
        </AppContainer>
      </CartProvider>
    </>
  );
}

export default App;
