import styled from "styled-components";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

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

	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
`;

const CategoryTitle = styled.h2`
	color: var(--neutral-800);
	font-size: var(--font-size-large);
	margin: 0;
	padding-bottom: 8px;
	border-bottom: 2px solid var(--primary-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SortContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const SortButton = styled.button`
	background: none;
	border: none;
	color: var(--neutral-600);
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.9rem;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	transition: all 0.2s ease;

	&:hover {
		color: var(--primary-color);
		background: rgba(255, 107, 0, 0.1);
	}
`;

const SortOptions = styled.div<{ isOpen: boolean }>`
	position: absolute;
	top: 100%;
	right: 0;
	background: white;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	padding: 0.5rem;
	z-index: 1000;
	display: ${(props) => (props.isOpen ? "block" : "none")};
	min-width: 120px;
`;

const SortOption = styled.button`
	width: 100%;
	text-align: left;
	padding: 0.5rem;
	border: none;
	background: none;
	color: var(--neutral-800);
	cursor: pointer;
	font-size: 0.9rem;
	border-radius: 4px;
	transition: all 0.2s ease;

	&:hover {
		background: rgba(255, 107, 0, 0.1);
		color: var(--primary-color);
	}
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem;
	color: var(--neutral-500);
	font-size: var(--font-size-large);
`;

const LoadMoreButton = styled.button`
	border: 1px solid var(--neutral-400);
	color: var(--neutral-600);
	background-color: var(--neutral-100);
	padding: 0.5rem 10rem;
	border-radius: 4px;
	font-size: var(--font-size-medium);
	cursor: pointer;
	transition: all 0.2s ease;
	margin: 1rem auto;
	display: block;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

	&:hover {
		background-color: var(--neutral-200);
		border-color: var(--neutral-800);
	}

	&:disabled {
		background-color: var(--neutral-400);
		border-color: var(--neutral-500);
		color: var(--neutral-600);
		cursor: not-allowed;
	}
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
	isLoading?: boolean;
}

const INITIAL_ITEMS = 20;
const LOAD_MORE_ITEMS = 20;

const ProductList = ({
	products,
	title,
	isLoading = false,
}: ProductListProps) => {
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [sortBy, setSortBy] = useState("default");
	const [displayCount, setDisplayCount] = useState(INITIAL_ITEMS);

	const handleSort = (type: string) => {
		setSortBy(type);
		setIsSortOpen(false);
		setDisplayCount(INITIAL_ITEMS); // 重置顯示數量
	};

	const sortedProducts = [...products].sort((a, b) => {
		switch (sortBy) {
			case "priceAsc":
				return a.price - b.price;
			case "priceDesc":
				return b.price - a.price;
			case "nameAsc":
				return a.title.localeCompare(b.title);
			case "nameDesc":
				return b.title.localeCompare(a.title);
			case "stockAsc":
				return a.stock - b.stock;
			case "stockDesc":
				return b.stock - a.stock;
			default:
				return 0;
		}
	});

	const handleLoadMore = () => {
		setDisplayCount((prev) => prev + LOAD_MORE_ITEMS);
	};

	const displayedProducts = sortedProducts.slice(0, displayCount);
	const hasMoreProducts = displayCount < sortedProducts.length;

	return (
		<ProductListContainer>
			<CategoryTitle>
				<span>{title ? `${title}` : "全部商品"}</span>
				<SortContainer>
					<SortButton onClick={() => setIsSortOpen(!isSortOpen)}>
						排序
						<FaChevronDown size={12} />
					</SortButton>
					<SortOptions isOpen={isSortOpen}>
						<SortOption onClick={() => handleSort("default")}>預設</SortOption>
						<SortOption onClick={() => handleSort("priceAsc")}>
							價格由低到高
						</SortOption>
						<SortOption onClick={() => handleSort("priceDesc")}>
							價格由高到低
						</SortOption>
						<SortOption onClick={() => handleSort("nameAsc")}>
							名稱 A-Z
						</SortOption>
						<SortOption onClick={() => handleSort("nameDesc")}>
							名稱 Z-A
						</SortOption>
						<SortOption onClick={() => handleSort("stockAsc")}>
							庫存由低到高
						</SortOption>
						<SortOption onClick={() => handleSort("stockDesc")}>
							庫存由高到低
						</SortOption>
					</SortOptions>
				</SortContainer>
			</CategoryTitle>
			{isLoading ? (
				<LoadingSpinner />
			) : sortedProducts.length === 0 ? (
				<EmptyState>找不到符合條件的商品</EmptyState>
			) : (
				<>
					<ProductGrid>
						{displayedProducts.map((product) => (
							<ProductCard key={product.code} {...product} />
						))}
					</ProductGrid>
					{hasMoreProducts && (
						<LoadMoreButton onClick={handleLoadMore}>
							顯示更多商品
						</LoadMoreButton>
					)}
				</>
			)}
		</ProductListContainer>
	);
};

export default ProductList;
