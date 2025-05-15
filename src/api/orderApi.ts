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
	totalAmount: string;
	email: string;
	phone: string;
}

interface OrderResponse {
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

	sendMail: async (sendMailData: SendMailData): Promise<OrderResponse> => {
		try {
			const response = await fetch("https://ua-cards.com/page/send_email.php", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendMailData),
			});

			const result = await response.json();
			return result;
		} catch (error) {
			console.error("發送電子郵件時發生錯誤：", error);
			return { success: false, message: "無法發送電子郵件，請稍後再試。" };
		}
	},
};
