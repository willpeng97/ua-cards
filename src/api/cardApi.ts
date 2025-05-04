interface CardPriceResponse {
	price: number;
	error?: string;
}

export const cardApi = {
	/**
	 * 獲取卡片價格
	 * @param cardNumber 卡片編號
	 * @returns Promise<CardPriceResponse>
	 */
	getCardPrice: async (cardNumber: string): Promise<CardPriceResponse> => {
		try {
			const encodedCardNumber = encodeURIComponent(cardNumber);
			const url = `https://ua-cards.com/page/fetch_price_26BT.php?card_number=${encodedCardNumber}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			const data = await response.text();
			console.log("API Response:", data);

			// 檢查是否為數字
			const price = Number(data);
			if (isNaN(price)) {
				return { price: 0, error: data };
			}

			return { price };
		} catch (error) {
			console.error("獲取卡片價格失敗:", error);
			return { price: 0, error: "獲取價格失敗" };
		}
	},
};
