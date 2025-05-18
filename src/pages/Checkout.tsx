import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import type { CartItem } from "../utils/cartStorage";
import processImg from "../assets/purchase_process.png";
import Swal from "sweetalert2";
import { cardApi } from "../api/commonApi";
import { orderApi } from "../api/orderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../contexts/CartContext";

const CheckoutContainer = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	padding: 0 var(--spacing-md);
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		padding: 0 var(--spacing-sm);
	}
`;

const FormSection = styled.section`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SummarySection = styled.section`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: fit-content;
`;

const Title = styled.h1`
	color: var(--neutral-800);
	font-size: var(--font-size-xxl);
	margin-bottom: 1rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media (min-width: 768px) {
		flex-direction: row;
		gap: 1rem;
	}
`;

const FormField = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Label = styled.label`
	color: var(--neutral-700);
	font-weight: 600;
`;

const Input = styled.input`
	padding: 0.75rem;
	border: 1px solid var(--neutral-300);
	border-radius: 4px;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
	}
`;

const CartItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	padding: 1.5rem 0;
	border-bottom: 1px solid var(--neutral-200);
`;

const CartItemImage = styled.img`
	width: 80px;
	object-fit: cover;
	border-radius: 8px;
`;

const CartItemInfo = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CartItemDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const CartItemTitle = styled.div`
	font-weight: 600;
	font-size: 1.1rem;
	margin-bottom: 0.25rem;
`;

const CartItemCode = styled.div`
	color: var(--neutral-600);
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
`;

const CartItemPrice = styled.div`
	color: var(--neutral-600);
	font-size: 1.1rem;
	font-weight: 500;
`;

const CartItemActions = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-direction: column;
	align-items: flex-start;
`;

const QuantityWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const QuantityControl = styled.div`
	display: flex;
	align-items: center;
	width: 100px;
	border: 1px solid #ddd;
	border-radius: 6px;
	overflow: hidden;
	height: 32px;
`;

const QuantityButton = styled.button`
	background: #f5f5f5;
	border: none;
	height: 32px;
	cursor: pointer;
	font-size: 1rem;
	color: #333;
	transition: background-color 0.2s ease;
	width: 32px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #e0e0e0;
		color: #333;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const QuantityDisplay = styled.span`
	padding: 0 0.5rem;
	width: 36px;
	text-align: center;
	background: white;
	color: #333;
	font-size: 1rem;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
`;

const RemoveButton = styled.button`
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color 0.2s ease;
	font-size: 1.2rem;

	&:hover {
		color: #ff4444;
	}
`;

const MaxQuantityWarning = styled.div`
	color: var(--primary-color);
	font-size: 0.8rem;
	text-align: left;
	font-weight: 400;
`;

const Total = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid var(--neutral-200);
	display: flex;
	justify-content: space-between;
	font-weight: 600;
	font-size: 1.1rem;
`;

const SubmitButton = styled.button`
	padding: 1rem;
	background: var(--primary-color);
	color: white;
	font-size: 1.2rem;
	border: none;
	border-radius: 4px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	&:hover {
		background: var(--primary-dark);
	}

	&:disabled {
		background: var(--neutral-400);
		cursor: not-allowed;
	}
`;

const Spinner = styled.div`
	width: 1rem;
	height: 1rem;
	border: 2px solid #ffffff;
	border-top: 2px solid transparent;
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const ProcessImage = styled.img`
	width: 100%;
	width: 100%;
	display: block;
	margin-bottom: 2rem;
`;

interface Card {
	code: string;
	stock: number;
	title: string;
	price: number;
	image: string;
}

const CheckoutPage = () => {
	const [products, setProducts] = useState<Card[]>([]);
	const {
		cartItems,
		totalAmount,
		handleQuantityChange,
		handleRemoveItem,
		clearCartItems,
		updateCartStock,
	} = useCart();
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		note: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	// 取得商品最新資料
	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await cardApi.getCards();
				setProducts(response);

				// 更新購物車中的庫存
				cartItems.forEach((item) => {
					const product = response.find((p) => p.code === item.code);
					if (product) {
						updateCartStock(item.code, product.stock);
					}
				});
				setIsLoading(false);
			} catch (error) {
				console.error("獲取商品資料失敗:", error);
			}
		};

		fetchProducts();
	}, []);

	// 檢查庫存並自動調整數量
	const checkAndAdjustStock = () => {
		let hasAdjusted = false;

		cartItems.forEach((item) => {
			const product = products.find((p) => p.code === item.code);
			if (product && product.stock < item.quantity) {
				handleQuantityChange(item.code, product.stock);
				hasAdjusted = true;
			}
		});

		if (hasAdjusted) {
			Swal.fire({
				title: "購物車已更新",
				text: "部分商品庫存不足，已自動調整數量，請確認後再結帳。",
				icon: "info",
				confirmButtonText: "確定",
				confirmButtonColor: "var(--primary-color)",
			});
			return true;
		}
		return false;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 結帳
	const handleCheckout = async (e: React.FormEvent) => {
		e.preventDefault();

		// 檢查庫存並自動調整數量
		if (checkAndAdjustStock()) {
			return;
		}

		setIsLoading(true);

		try {
			const orderData = {
				phone: formData.phone,
				email: formData.email,
				cart: cartItems.map((item) => ({
					card_id: item.code,
					quantity: item.quantity,
				})),
			};

			const orderDetails = cartItems
				.map(
					(item) =>
						`${item.title} - ${item.quantity} x $${item.price.toFixed(
							2
						)} (ID: ${item.code})\n`
				)
				.join("");

			// 先更新庫存
			const inventoryResponse = await orderApi.updateInventory({
				cart: orderData.cart,
			});

			if (!inventoryResponse.success) {
				throw new Error(inventoryResponse.message || "庫存更新失敗");
			}

			// 庫存更新成功後，發送郵件
			const mailResponse = await orderApi.sendMail({
				email: formData.email,
				phone: formData.phone,
				totalAmount: totalAmount,
				orderDetails: orderDetails,
			});

			if (!mailResponse.success) {
				throw new Error("郵件發送失敗");
			}

			// 最後儲存訂單
			const orderResponse = await orderApi.saveOrder(orderData);

			if (!orderResponse.success) {
				throw new Error("訂單儲存失敗");
			}

			// 所有操作都成功
			Swal.fire({
				title: "訂單已送出!!",
				text: `謝謝您的購買! 請記得至7-11賣貨便自填單填入電話及總金額: $${totalAmount}`,
				icon: "success",
				showCancelButton: true,
				confirmButtonText: "前往填單",
				cancelButtonText: "返回",
				reverseButtons: true,
				confirmButtonColor: "var(--info-color)",
				cancelButtonColor: "#6c757d",
			}).then((result) => {
				clearCartItems();
				if (result.isConfirmed) {
					window.location.href =
						"https://myship.7-11.com.tw/cart/easy/GM2410225591590";
				} else {
					window.location.href = "/";
				}
			});
		} catch (err) {
			console.error("Checkout error:", err);
			Swal.fire({
				title: "結帳失敗",
				text:
					err instanceof Error
						? err.message + "，請稍後再試"
						: "結帳過程發生錯誤，請稍後再試",
				icon: "error",
				confirmButtonText: "確定",
				confirmButtonColor: "var(--primary-color)",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CheckoutContainer>
			{isLoading && <LoadingSpinner />}
			<SummarySection>
				<ProcessImage src={processImg} alt="購買流程" />
				<Title>訂單內容</Title>
				{cartItems.map((item) => (
					<CartItem key={item.code}>
						<CartItemImage src={item.image} alt={item.title} />
						<CartItemInfo>
							<CartItemDetails>
								<CartItemTitle>{item.title}</CartItemTitle>
								<CartItemCode>{item.code}</CartItemCode>
								<CartItemPrice>${item.price}</CartItemPrice>
							</CartItemDetails>
							<CartItemActions>
								<QuantityWrapper>
									<QuantityControl>
										<QuantityButton
											onClick={() =>
												handleQuantityChange(item.code, item.quantity - 1)
											}
											disabled={item.quantity <= 1}
										>
											-
										</QuantityButton>
										<QuantityDisplay>{item.quantity}</QuantityDisplay>
										<QuantityButton
											onClick={() =>
												handleQuantityChange(item.code, item.quantity + 1)
											}
											disabled={item.quantity >= item.stock}
										>
											+
										</QuantityButton>
									</QuantityControl>
									<RemoveButton onClick={() => handleRemoveItem(item.code)}>
										<FaTrash />
									</RemoveButton>
								</QuantityWrapper>
								{item.quantity >= item.stock && item.stock > 0 && (
									<MaxQuantityWarning>已達選購數量上限</MaxQuantityWarning>
								)}
							</CartItemActions>
						</CartItemInfo>
					</CartItem>
				))}
				<Total>
					<span>總金額</span>
					<span>${totalAmount}</span>
				</Total>
			</SummarySection>
			<FormSection>
				<Title>結帳資訊</Title>
				<Form onSubmit={handleCheckout}>
					<FormGroup>
						<FormField>
							<Label htmlFor="phone">電話</Label>
							<Input
								type="tel"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
						</FormField>
						<FormField>
							<Label htmlFor="email">電子郵件</Label>
							<Input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</FormField>
					</FormGroup>
					<SubmitButton type="submit" disabled={isLoading}>
						{isLoading && <Spinner />}
						{isLoading ? "正在送出訂單..." : "7-11 賣貨便自填單結帳"}
					</SubmitButton>
				</Form>
			</FormSection>
		</CheckoutContainer>
	);
};

export default CheckoutPage;
