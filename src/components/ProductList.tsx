import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductListContainer = styled.div`
  flex: 1;
  display: grid;
  background-color: var(--neutral-100);
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-md);
`;

interface Product {
  image: string;
  title: string;
  code: string;
  price: number;
  stock: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductCard
          key={product.code}
          {...product}
        />
      ))}
    </ProductListContainer>
  );
};

export default ProductList; 