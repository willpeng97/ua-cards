import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import ProductList from "../components/ProductList";
import HomeCarousel from "../components/HomeCarousel";
import { useState, useCallback, useEffect } from "react";
import { cardApi } from "../api/cardApi";

interface Product {
	id: number;
	image: string;
	title: string;
	code: string;
	price: number;
	stock: number;
	category: string;
}

// 原有的 MainContent 樣式
const MainContent = styled.div`
	display: flex;
	padding: var(--spacing-md);
	gap: var(--spacing-md);
	margin: 0 auto;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const HomePage = () => {
	const [selectedAnime, setSelectedAnime] = useState<string>("");
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const fetchedProducts = await cardApi.getCards();
				setAllProducts(fetchedProducts);
				setProducts(fetchedProducts);
				setSelectedAnime("全部作品");

				// 獲取唯一的類別列表
				const uniqueCategories = Array.from(
					new Set(fetchedProducts.map((product) => product.category))
				);
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("獲取產品資料失敗:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const filterProducts = useCallback(
		(category: string, query: string) => {
			let filtered = allProducts;

			if (query) {
				const lowerQuery = query.toLowerCase();
				filtered = filtered.filter(
					(product) =>
						product.title.toLowerCase().includes(lowerQuery) ||
						product.code.toLowerCase().includes(lowerQuery)
				);
				setSelectedAnime(`"${query}" 的搜尋結果`);
			} else if (
				category &&
				category !== "全部作品" &&
				category !== "搜尋結果"
			) {
				filtered = filtered.filter((product) => product.category === category);
			} else {
				setSelectedAnime("全部作品");
			}

			return filtered;
		},
		[allProducts]
	);

	const handleAnimeSelect = (anime: string) => {
		setSelectedAnime(anime);
		const filteredProducts = filterProducts(anime, searchQuery);
		setProducts(filteredProducts);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		// 如果清空搜尋，使用 "全部作品" 作為分類
		const category = query ? selectedAnime : "全部作品";
		const filteredProducts = filterProducts(category, query);
		setProducts(filteredProducts);
	};

	return (
		<>
			<HomeCarousel />

			<MainContent>
				<SideMenu
					onSelect={handleAnimeSelect}
					selectedItem={selectedAnime}
					onSearch={handleSearch}
					categoryList={categories}
				/>

				<ProductList
					products={products}
					title={selectedAnime}
					isLoading={isLoading}
				/>
			</MainContent>
		</>
	);
};

export default HomePage;
