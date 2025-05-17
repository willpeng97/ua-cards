// interface CardPriceResponse {
// 	price: number;
// 	error?: string;
// }

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
	// getCardPrice: async (cardNumber: string): Promise<CardPriceResponse> => {
	// 	try {
	// 		const encodedCardNumber = encodeURIComponent(cardNumber);
	// 		const url = `https://ua-cards.com/page/fetch_price_26BT.php?card_number=${encodedCardNumber}`;

	// 		const response = await fetch(url, {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 			},
	// 		});

	// 		const data = await response.text();
	// 		console.log("API Response:", data);

	// 		// 檢查是否為數字
	// 		const price = Number(data);
	// 		if (isNaN(price)) {
	// 			return { price: 0, error: data };
	// 		}

	// 		return { price };
	// 	} catch (error) {
	// 		console.error("獲取卡片價格失敗:", error);
	// 		return { price: 0, error: "獲取價格失敗" };
	// 	}
	// },

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
