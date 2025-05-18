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

interface ReportData {
	phone: string;
	email: string;
	issue: string;
}

export const commonApi = {
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

	// 發送客服回報
	sendReport: async (
		data: ReportData
	): Promise<{ success: boolean; message: string }> => {
		try {
			const url = `https://ua-cards.com/shop_backend/send_mail_report.php`;
			const formData = new FormData();
			formData.append("phone", data.phone);
			formData.append("email", data.email);
			formData.append("issue", data.issue);

			const response = await fetch(url, {
				method: "POST",
				body: formData,
			});

			const result = await response.text();

			// 根據後端回傳的訊息判斷是否成功
			if (result.includes("郵件已成功發送")) {
				return {
					success: true,
					message: "郵件已成功發送！",
				};
			} else {
				return {
					success: false,
					message: "發送回報時出錯，請稍後再試。",
				};
			}
		} catch (error) {
			console.error("發送回報失敗:", error);
			return {
				success: false,
				message: "發送回報時出錯，請稍後再試。",
			};
		}
	},
};
