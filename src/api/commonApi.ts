interface Card {
	id: number;
	image: string;
	title: string;
	code: string;
	price: number;
	stock: number;
	category: string;
}

interface Carousel {
	id: number;
	image: string;
	link: string;
	alt: string;
}

export const cardApi = {
	// 取得卡片列表
	getCards: async (): Promise<Card[]> => {
		try {
			const url = `https://ua-cards.com/shop_backend/get_cards.php`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			const data = await response.json();
			console.log("API Response:", data);

			// 將每個卡片的價格除以 5
			return data.map((card: Card) => ({
				...card,
				price: Math.floor(card.price / 5),
			}));
		} catch (error) {
			console.error("獲取卡片失敗:", error);
			return [];
		}
	},

	// 取得輪播列表
	getCarousel: async (): Promise<Carousel[]> => {
		try {
			const url = `https://ua-cards.com/shop_backend/get_carousel.php`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			const data = await response.json();
			console.log("API Response:", data);

			return data;
		} catch (error) {
			console.error("獲取輪播失敗:", error);
			return [];
		}
	},
};
