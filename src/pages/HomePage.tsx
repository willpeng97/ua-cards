import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import ProductList from "../components/ProductList";
import {
	HomeCarousel,
	CarouselItem as CarouselItemProps,
} from "../components/HomeCarousel";
import { useState, useCallback, useEffect } from "react";
import { commonApi } from "../api/commonApi";
import { Product } from "../types/ProductTypes";

// 原有的 MainContent 樣式
const MainContent = styled.div`
	display: flex;
	padding: var(--spacing-md);
	gap: var(--spacing-md);
	margin: 0 auto;
	width: 100%;

	@media (max-width: 768px) {
		flex-direction: column;
		padding: var(--spacing-sm);
	}
`;

const HomePage = () => {
	const [selectedAnime, setSelectedAnime] = useState<string>("");
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [carouselItems, setCarouselItems] = useState<CarouselItemProps[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const fetchedProducts = await commonApi.getCards();
				setAllProducts(fetchedProducts);
				setProducts(fetchedProducts);
				setSelectedAnime("全部作品");

				// 獲取唯一的類別列表
				// const uniqueCategories = Array.from(
				// 	new Set(fetchedProducts.map((product) => product.category))
				// );
				const uniqueCategories = [
					"預購商品區",
					"完整牌組",
					"卡牌保護套",
					"二星 & 三星 & AP",
					"金肉人",
					"防風少年",
					"鋼之鍊金術師",
					"超時空要塞",
					"一拳超人",
					"Code Geass 奪回的Rozé",
					"2.5次元的誘惑",
					"香格里拉 開拓異境",
					"魔法少女小圓",
					"明日方舟",
					"刀劍神域",
					"假面騎士",
					"怪獸八號",
					"學園偶像大師",
					"超超超超喜歡你的100個女友",
					"不死不運",
					"SHY",
					"進撃の巨人",
					"GAMERA -Rebirth-",
					"幽遊白書",
					"黑色五葉草",
					"排球少年",
					"勝利の女神 NIKKE",
					"美食獵人",
					"SYNDUALITY Noir",
					"Dr. Stone",
					"藍色監獄",
					"銀魂",
					"我的英雄學院",
					"我與機器子",
					"BLEACH 死神",
					"關於我轉生變成史萊姆這檔事",
					"鬼滅の刃",
					"偶像大師 閃耀色彩",
					"HUNTER Ｘ HUNTER",
					"咒術迴戰",
					"Code Geass 反叛的魯路修",
				];

				setCategories(uniqueCategories);
			} catch (error) {
				console.error("獲取產品資料失敗:", error);
			} finally {
				setIsLoading(false);
			}
		};

		const fetchCarousel = async () => {
			try {
				const fetchedCarousel = await commonApi.getCarousel();
				setCarouselItems(fetchedCarousel);
			} catch (error) {
				console.error("獲取輪播資料失敗:", error);
			}
		};

		fetchProducts();
		fetchCarousel();
	}, []);

	const filterProducts = useCallback(
		(category: string, query: string) => {
			let filtered = allProducts;

			if (query) {
				const lowerQuery = query.toLowerCase();
				filtered = filtered.filter(
					(product) =>
						product.title.toLowerCase().includes(lowerQuery) ||
						product.code.toLowerCase().includes(lowerQuery) ||
						product.category.toLowerCase().includes(lowerQuery)
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
			<HomeCarousel carouselItems={carouselItems} />

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
