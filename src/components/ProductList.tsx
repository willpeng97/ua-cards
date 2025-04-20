import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--neutral-100);
  padding: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const CategoryTitle = styled.h2`
  color: var(--neutral-800);
  font-size: var(--font-size-large);
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary-color);
`;

interface Product {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductListProps {
  products: Product[];
  title: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  return (
    <ProductListContainer>
      <CategoryTitle>
        {title ? `${title}` : '全部商品'}
      </CategoryTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.code}
            {...product}
          />
        ))}
      </ProductGrid>
    </ProductListContainer>
  );
};

export default ProductList; 