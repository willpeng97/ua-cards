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
			const cards = data.map((card: Card) => ({
				...card,
				price: Math.floor(card.price / 5),
			}));

			// 獲取卡牌等級的權重
			const getCardLevelWeight = (code: string) => {
				const parts = code.split("/");
				const lastPart = parts[parts.length - 1];
				if (lastPart === "SRS") return 3;
				if (lastPart === "RS") return 2;
				return 1;
			};

			// 獲取基本編號（不含等級後綴）
			const getBaseCode = (code: string) => {
				const parts = code.split("/");
				// 如果最後一個部分是 RS 或 SRS，則移除它
				if (
					parts[parts.length - 1] === "RS" ||
					parts[parts.length - 1] === "SRS"
				) {
					parts.pop();
				}
				return parts.join("/");
			};

			// 排序邏輯：先按基本編號排序，再按等級排序
			return cards.sort((a: Card, b: Card) => {
				// 提取基本編號（不含等級後綴）
				const baseCodeA = getBaseCode(a.code);
				const baseCodeB = getBaseCode(b.code);

				// 如果基本編號不同，按基本編號排序
				if (baseCodeA !== baseCodeB) {
					return baseCodeA.localeCompare(baseCodeB);
				}

				// 如果基本編號相同，按等級排序（SRS > RS > 一般）
				return getCardLevelWeight(b.code) - getCardLevelWeight(a.code);
			});
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
