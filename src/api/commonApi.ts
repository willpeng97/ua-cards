import { Product as Card } from "../types/ProductTypes";

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
		// 獲取卡牌稀有度
		// const getCardRarity = (code: string) => {
		// 	const parts = code.split("/");
		// 	const lastPart = parts[parts.length - 1];
		// 	if (["SRS", "RS", "US", "CS", "R"].includes(lastPart)) return lastPart;
		// };

		// 獲取卡牌等級的權重
		const getCardLevelWeight = (code: string) => {
			const parts = code.split("/");
			const lastPart = parts[parts.length - 1];
			if (
				[
					"SRSSS",
					"SRSS",
					"USSS",
					"RSS",
					"AP",
					"RC",
					"3rd",
					"BGC",
					"S",
					"OBCW",
					"C",
				].includes(lastPart)
			)
				return 4; // 特殊卡 (二星 & 三星 & AP)
			if (["SRS", "RS", "US", "CS"].includes(lastPart)) return 3; // 星卡
			if (["R"].includes(lastPart)) return 1; // R卡

			if (parts.length === 2) {
				// 檢查是否包含 AP 字符
				if (lastPart.includes("AP")) return 4; // 特殊卡 (AP)
				// 檢查是否包含三個連續數字
				if (/\d{3}/.test(lastPart)) return 2; // R卡
			}

			return 0; // 其他
		};

		try {
			const url = `https://ua-cards.com/shop_backend/get_cards.php`;
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			const data = await response.json();
			// console.log("API Response:", data);

			// 將每個卡片的價格除以 5
			const cards = data.map((card: Card) => ({
				...card,
				price: Math.floor(card.price / 5),
				levelWeight: getCardLevelWeight(card.code),
				// rarity: getCardRarity(card.code),
			}));

			return cards;
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
