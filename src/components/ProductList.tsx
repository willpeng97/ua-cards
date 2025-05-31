import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaHome } from "react-icons/fa";
import {
	HiOutlineSortAscending,
	HiOutlineSortDescending,
} from "react-icons/hi";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { Popover } from "antd";
import { Product } from "../types/ProductTypes";

const ProductListContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
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

const SortContainer = styled.div`
	display: flex;
	align-items: center;
	background: var(--neutral-300);
	border-radius: 4px;
	overflow-x: auto;
`;

const SortButton = styled.button<{ isActive?: boolean }>`
	background: ${(props) =>
		props.isActive ? "var(--primary-color)" : "transparent"};
	color: ${(props) => (props.isActive ? "white" : "var(--neutral-600)")};
	border: none;
	padding: 0.5rem 1rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.9rem;
	transition: all 0.2s ease;
	white-space: nowrap;

	&:hover {
		background: ${(props) =>
			props.isActive ? "var(--primary-color)" : "var(--neutral-200)"};
	}
`;

const PriceRangeContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	padding: 0 0.5rem;
	white-space: nowrap;
`;

const PriceInput = styled.input`
	width: 80px;
	padding: 0.2rem 0.25rem;
	border: 1px solid var(--neutral-300);
	font-size: 0.9rem;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
	}
`;

const PriceSeparator = styled.span`
	color: var(--neutral-500);
`;

const ApplyButton = styled.button`
	background: var(--neutral-900);
	color: white;
	border: none;
	padding: 0.2rem 0.5rem;
	cursor: pointer;
	font-size: 0.8rem;

	&:hover {
		background: var(--neutral-800);
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
	padding: 0.5rem;
	width: 100%;
	max-width: 500px;
	border-radius: 4px;
	font-size: var(--font-size-medium);
	cursor: pointer;
	transition: all 0.2s ease;
	margin: 1rem auto;
	display: block;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	text-wrap: nowrap;

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

const StockFilter = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding-left: 1rem;
	white-space: nowrap;
`;

const LevelWeightFilter = styled.div`
	padding-left: 1rem;
`;

const LevelWeightFilterButton = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	cursor: pointer;
	font-size: 0.9rem;
	white-space: nowrap;

	&:hover {
		color: var(--primary-color);
	}
`;

const LevelWeightCheckboxContainer = styled.div`
	display: flex;
	gap: 1rem;
	white-space: nowrap;
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	cursor: pointer;
	color: var(--neutral-700);
	font-size: 0.9rem;
	user-select: none;

	input[type="checkbox"] {
		width: 16px;
		height: 16px;
		cursor: pointer;
	}
`;

const BreadcrumbContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 0;
	color: var(--neutral-600);
	font-size: 0.9rem;
`;

const BreadcrumbItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const BreadcrumbSeparator = styled(FaChevronRight)`
	font-size: 0.8rem;
	color: var(--neutral-400);
`;

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
	const [sortBy, setSortBy] = useState("default");
	const [displayCount, setDisplayCount] = useState(INITIAL_ITEMS);
	const [priceRange, setPriceRange] = useState({ min: "", max: "" });
	const [tempPriceRange, setTempPriceRange] = useState({ min: "", max: "" });
	const [showInStockOnly, setShowInStockOnly] = useState(true);
	const [selectedLevelWeight, setSelectedLevelWeight] = useState<number[]>([
		1, 2, 3, 4,
	]);

	// 當分類改變時重置顯示數量和排序方式
	useEffect(() => {
		setDisplayCount(INITIAL_ITEMS);
		setPriceRange({ min: "", max: "" });
		setTempPriceRange({ min: "", max: "" });

		// 客製化排序
		if (title === "二星 & 三星 & AP") {
			setSortBy("priceDesc");
		} else if (title === "卡牌保護套") {
			setSortBy("codeAsc");
		} else {
			setSortBy("default");
		}
	}, [title]);

	const handleSort = (type: string) => {
		setSortBy(type);
		setDisplayCount(INITIAL_ITEMS);
	};

	const handlePriceChange = (type: "min" | "max", value: string) => {
		setTempPriceRange((prev) => ({
			...prev,
			[type]: value.replace(/[^0-9]/g, ""),
		}));
	};

	const handleApplyPriceRange = () => {
		setPriceRange(tempPriceRange);
		setDisplayCount(INITIAL_ITEMS);
	};

	const handleLevelWeightChange = (levelWeight: number) => {
		setSelectedLevelWeight((prev) => {
			if (prev.includes(levelWeight)) {
				return prev.filter((r) => r !== levelWeight);
			}
			return [...prev, levelWeight];
		});
		setDisplayCount(INITIAL_ITEMS);
	};

	const filteredProducts = products.filter((product) => {
		// 庫存篩選
		if (showInStockOnly && product.stock <= 0) {
			return false;
		}

		// 價格範圍篩選
		if (priceRange.min && product.price < Number(priceRange.min)) {
			return false;
		}
		if (priceRange.max && product.price > Number(priceRange.max)) {
			return false;
		}

		// 稀有度篩選
		if (
			selectedLevelWeight.length > 0 &&
			!selectedLevelWeight.includes(product.levelWeight)
		) {
			return false;
		}

		return true;
	});

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case "priceAsc":
				return a.price - b.price;
			case "priceDesc":
				return b.price - a.price;
			case "levelWeightAsc":
				return a.levelWeight - b.levelWeight;
			case "levelWeightDesc":
				return b.levelWeight - a.levelWeight;
			case "default":
			default:
				return 0; // 保持原始順序
		}
	});

	const handleLoadMore = () => {
		setDisplayCount((prev) => prev + LOAD_MORE_ITEMS);
	};

	const displayedProducts = sortedProducts.slice(0, displayCount);
	const hasMoreProducts = displayCount < sortedProducts.length;

	return (
		<ProductListContainer>
			<BreadcrumbContainer>
				<BreadcrumbItem>
					<FaHome size={14} />
					商品一覽
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>{title ? title : "全部商品"}</BreadcrumbItem>
			</BreadcrumbContainer>

			<SortContainer>
				<SortButton
					isActive={sortBy === "default"}
					onClick={() => handleSort("default")}
				>
					綜合排序
				</SortButton>
				<SortButton
					isActive={sortBy === "levelWeightAsc" || sortBy === "levelWeightDesc"}
					onClick={() =>
						handleSort(
							sortBy === "levelWeightAsc" ? "levelWeightDesc" : "levelWeightAsc"
						)
					}
				>
					稀有度
					{sortBy === "levelWeightAsc" ? (
						<HiOutlineSortAscending />
					) : (
						<HiOutlineSortDescending />
					)}
				</SortButton>
				<SortButton
					isActive={sortBy === "priceAsc" || sortBy === "priceDesc"}
					onClick={() =>
						handleSort(sortBy === "priceAsc" ? "priceDesc" : "priceAsc")
					}
				>
					價格
					{sortBy === "priceAsc" ? (
						<HiOutlineSortAscending />
					) : (
						<HiOutlineSortDescending />
					)}
				</SortButton>
				<PriceRangeContainer>
					<PriceInput
						type="text"
						placeholder="最低價"
						value={tempPriceRange.min}
						onChange={(e) => handlePriceChange("min", e.target.value)}
					/>
					<PriceSeparator>~</PriceSeparator>
					<PriceInput
						type="text"
						placeholder="最高價"
						value={tempPriceRange.max}
						onChange={(e) => handlePriceChange("max", e.target.value)}
					/>
					<ApplyButton onClick={handleApplyPriceRange}>確認</ApplyButton>
				</PriceRangeContainer>
				<StockFilter>
					<CheckboxLabel>
						<input
							type="checkbox"
							checked={showInStockOnly}
							onChange={(e) => {
								setShowInStockOnly(e.target.checked);
								setDisplayCount(INITIAL_ITEMS);
							}}
						/>
						僅顯示有庫存
					</CheckboxLabel>
				</StockFilter>
				<LevelWeightFilter>
					<Popover
						trigger="click"
						placement="bottomRight"
						content={
							<LevelWeightCheckboxContainer>
								<CheckboxLabel>
									<input
										type="checkbox"
										checked={selectedLevelWeight.includes(4)}
										onChange={() => handleLevelWeightChange(4)}
									/>
									UR & 紅卡
								</CheckboxLabel>
								<CheckboxLabel>
									<input
										type="checkbox"
										checked={selectedLevelWeight.includes(3)}
										onChange={() => handleLevelWeightChange(3)}
									/>
									SR
								</CheckboxLabel>
								<CheckboxLabel>
									<input
										type="checkbox"
										checked={selectedLevelWeight.includes(2)}
										onChange={() => handleLevelWeightChange(2)}
									/>
									R
								</CheckboxLabel>
								<CheckboxLabel>
									<input
										type="checkbox"
										checked={selectedLevelWeight.includes(1)}
										onChange={() => handleLevelWeightChange(1)}
									/>
									一般
								</CheckboxLabel>
							</LevelWeightCheckboxContainer>
						}
					>
						<LevelWeightFilterButton>
							稀有度選項
							<FaChevronDown />
						</LevelWeightFilterButton>
					</Popover>
				</LevelWeightFilter>
			</SortContainer>

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
							顯示更多卡牌
						</LoadMoreButton>
					)}
				</>
			)}
		</ProductListContainer>
	);
};

export default ProductList;
