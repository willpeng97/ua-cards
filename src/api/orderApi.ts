interface OrderItem {
	card_id: string;
	quantity: number;
}

interface OrderData {
	phone: string;
	cart: OrderItem[];
}

interface SendMailData {
	orderDetails: string;
	totalAmount: number;
	email: string;
	phone: string;
}

interface OrderResponse {
	success: boolean;
	message?: string;
}

interface ApiResponse {
	success: boolean;
	message?: string;
}

export const orderApi = {
	saveOrder: async (orderData: OrderData): Promise<OrderResponse> => {
		try {
			const response = await fetch("https://ua-cards.com/page/save_order.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(orderData),
			});

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
				"https://ua-cards.com/page/send_email_test.php",
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
			if (text.includes("郵件已成功發送")) {
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
};
