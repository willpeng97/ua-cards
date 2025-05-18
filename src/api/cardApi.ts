interface Card {
	id: number;
	image: string;
	title: string;
	code: string;
	price: number;
	stock: number;
	category: string;
}

export const cardApi = {
	// 取得卡片列表
	getCards: async (): Promise<Card[]> => {
		try {
			const url = `https://ua-cards.com/test.php`;
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
};
