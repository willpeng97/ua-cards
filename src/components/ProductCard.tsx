import styled from "styled-components";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import Toast from "./Toast";
import { getCartItems, addToCart } from "../utils/cartStorage";
import type { CartItem } from "../utils/cartStorage";

const CardContainer = styled.div`
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	padding: 1rem;
	width: 200px;
	transition: transform 0.3s ease;

	&:hover {
		transform: translateY(-5px);
	}

	@media (max-width: 768px) {
		padding: 0.5rem;
		width: 150px;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	padding-top: 140%; // 保持圖片比例
	background-color: var(--neutral-100);
	border-radius: 4px;
	overflow: hidden;
`;

const ProductImage = styled.img<{ isLoaded: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	cursor: pointer;
	transition: opacity 0.3s ease;
	opacity: ${(props) => (props.isLoaded ? 1 : 0)};

	&:hover {
		opacity: 0.9;
	}
`;

const ImagePlaceholder = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		var(--neutral-100) 0%,
		var(--neutral-200) 50%,
		var(--neutral-100) 100%
	);
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite;
	border-radius: 4px;

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
`;

const ProductInfo = styled.div`
	margin-top: 1rem;

	@media (max-width: 768px) {
		margin-top: 0.75rem;
	}
`;

const ProductTitle = styled.h3`
	font-size: 1.2rem;
	margin: 0;
	color: #333;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const ProductCode = styled.div`
	font-size: 0.9rem;
	color: #666;
	margin: 0.5rem 0;
	border-radius: 4px;
	display: inline-block;

	@media (max-width: 768px) {
		font-size: 0.8rem;
	}
`;

const ProductPrice = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: #ff6b00;
	margin: 0.5rem 0;

	@media (max-width: 768px) {
		font-size: 1.1rem;
		margin: 0.25rem 0;
	}
`;

const StockInfo = styled.div`
	color: #666;
	font-size: 0.9rem;
	margin-bottom: 1rem;

	@media (max-width: 768px) {
		font-size: 0.8rem;
		margin-bottom: 0.75rem;
	}
`;

const ActionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 36px;
	gap: 0.5rem;
`;

const QuantityControl = styled.div`
	display: flex;
	align-items: center;
	width: 100px;
	border: 1px solid #ddd;
	border-radius: 4px;
	overflow: hidden;
	height: 100%;
`;

const QuantityButton = styled.button`
	background: #f5f5f5;
	border: none;
	height: 36px;
	cursor: pointer;
	font-size: 1rem;
	color: var(--neutral-700);
	transition: background-color 0.2s ease;
	width: 32px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #e0e0e0;
	}

	&:active {
		background: #d0d0d0;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const QuantityDisplay = styled.span`
	padding: 0.5rem;
	width: 36px;
	text-align: center;
	background: white;
	color: var(--primary-dark);
	font-size: 0.9rem;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
`;

const AddToCartButton = styled.button`
	padding: 0 1rem;
	background: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	transition: all 0.3s ease;

	&:hover {
		background: var(--primary-dark);
	}

	&:disabled {
		background: var(--neutral-400);
		cursor: not-allowed;
		opacity: 0.7;
	}

	svg {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		padding: 0 0.75rem;
	}
`;

const ImageModal = styled.div<{ isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	display: ${(props) => (props.isOpen ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding: 2rem;
`;

const ModalContent = styled.div`
	position: relative;
	max-width: 90%;
	max-height: 90%;
`;

const ModalImage = styled.img`
	max-width: 100%;
	max-height: 80vh;
	object-fit: contain;
	border-radius: 8px;
`;

const CloseButton = styled.button`
	position: absolute;
	top: -40px;
	right: 0;
	background: none;
	border: none;
	color: white;
	font-size: 2rem;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.8;
	}
`;

interface ProductCardProps {
	image: string;
	title: string;
	code: string;
	price: number;
	stock: number;
	category: string;
}

const ProductCard = ({
	image,
	title,
	code,
	price,
	stock,
	category,
}: ProductCardProps) => {
	const [quantity, setQuantity] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(() => {
		const updateCartData = () => {
			setCartItems(getCartItems());
		};

		// 初始載入購物車數據
		updateCartData();

		// 添加事件監聽器
		window.addEventListener("cartUpdated", updateCartData);

		return () => {
			window.removeEventListener("cartUpdated", updateCartData);
		};
	}, []);

	// 檢查購物車中該商品的數量
	const cartItem = cartItems.find((item) => item.code === code);
	const remainingStock = stock - (cartItem?.quantity || 0);

	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [showToast]);

	const handleDecrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	const handleIncrease = () => {
		if (quantity < remainingStock) {
			setQuantity(quantity + 1);
		}
	};

	const handleImageClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleAddToCart = () => {
		if (quantity > remainingStock || quantity === 0) {
			return;
		}

		addToCart({
			image,
			title,
			code,
			price,
			stock,
			category,
			quantity,
		});

		setQuantity(0);
		setShowToast(true);
		setCartItems(getCartItems());
	};

	return (
		<>
			<CardContainer>
				<ImageContainer>
					<ImagePlaceholder />
					<ProductImage
						src={image}
						alt={title}
						onClick={handleImageClick}
						loading="lazy"
						isLoaded={isImageLoaded}
						onLoad={() => setIsImageLoaded(true)}
					/>
				</ImageContainer>
				<ProductInfo>
					<ProductTitle>{title}</ProductTitle>
					<ProductCode>{code}</ProductCode>
					<ProductPrice>NT$ {price}</ProductPrice>
					<StockInfo>庫存: {remainingStock}</StockInfo>
					<ActionContainer>
						<QuantityControl>
							<QuantityButton onClick={handleDecrease} disabled={quantity < 1}>
								-
							</QuantityButton>
							<QuantityDisplay>{quantity}</QuantityDisplay>
							<QuantityButton
								onClick={handleIncrease}
								disabled={quantity >= remainingStock}
							>
								+
							</QuantityButton>
						</QuantityControl>
						<AddToCartButton
							onClick={handleAddToCart}
							disabled={remainingStock === 0}
						>
							<MdOutlineAddShoppingCart />
						</AddToCartButton>
					</ActionContainer>
				</ProductInfo>
			</CardContainer>

			<ImageModal isOpen={isModalOpen} onClick={handleCloseModal}>
				<ModalContent onClick={(e) => e.stopPropagation()}>
					<CloseButton onClick={handleCloseModal}>
						<MdClose />
					</CloseButton>
					<ModalImage src={image} alt={title} />
				</ModalContent>
			</ImageModal>

			<Toast
				message="成功加入到購物車"
				isVisible={showToast}
				onHide={() => setShowToast(false)}
			/>
		</>
	);
};

export default ProductCard;
