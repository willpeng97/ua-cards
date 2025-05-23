interface OrderItem {
	card_id: string;
	quantity: number;
}

interface OrderData {
	phone: string;
	cart: OrderItem[];
}

interface Card {
	name: string;
	code: string;
	price: number;
	count: number;
	image: string;
}

interface SendMailData {
	totalAmount: number;
	email: string;
	phone: string;
	cards: Card[];
}

interface OrderResponse {
	success: boolean;
	message?: string;
}

interface ApiResponse {
	success: boolean;
	message?: string;
}

type InventoryData = OrderItem[];

export const orderApi = {
	saveOrder: async (orderData: OrderData): Promise<OrderResponse> => {
		try {
			const response = await fetch(
				"https://ua-cards.com/shop_backend/save_order.php",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(orderData),
				}
			);

			const result = await response.json();
			return result;
		} catch (error) {
			console.error("儲存訂單時發生錯誤：", error);
			return {
				success: false,
				message: "無法送出訂單，請稍後再試。",
			};
		}
	},

	sendMail: async (sendMailData: SendMailData): Promise<ApiResponse> => {
		try {
			const response = await fetch(
				"https://ua-cards.com/shop_backend/sendmailNew.php",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(sendMailData),
				}
			);

			const text = await response.text();
			console.log("Mail API Response:", text);

			// 檢查回應是否包含成功訊息
			if (text.includes("訂單已成功發送")) {
				return { success: true };
			}

			return {
				success: false,
				message: text || "郵件發送失敗",
			};
		} catch (error) {
			console.error("發送郵件失敗:", error);
			return {
				success: false,
				message: "發送郵件時發生錯誤",
			};
		}
	},

	updateInventory: async (
		inventoryData: InventoryData
	): Promise<OrderResponse> => {
		try {
			const response = await fetch(
				"https://ua-cards.com/shop_backend/inventory_cart.php",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(inventoryData),
				}
			);

			if (!response.ok) {
				const text = await response.text();
				throw new Error("Server Error: " + text);
			}

			const result = await response.json();
			return result;
		} catch (error) {
			console.error("更新庫存時發生錯誤：", error);
			return {
				success: false,
				message: "無法更新庫存，請稍後再試。",
			};
		}
	},
};
