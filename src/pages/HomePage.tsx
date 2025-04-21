import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import ProductList from '../components/ProductList';
import { useState, useCallback } from 'react';
import productsData from '../mockData/products.json';

interface Product {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
  category: string;
}

const MainContent = styled.div`
  display: flex;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HomePage = () => {
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
    <MainContent>
      <SideMenu 
        onSelect={handleAnimeSelect} 
        selectedItem={selectedAnime}
        onSearch={handleSearch}
      />
      <ProductList products={products} title={selectedAnime} />
    </MainContent>
  );
};

export default HomePage; 