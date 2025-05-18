import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "../utils/cartStorage";
import {
	getCartItems,
	getTotalAmount,
	updateQuantity,
	removeFromCart,
	clearCart,
	updateStock,
} from "../utils/cartStorage";

interface CartContextType {
	cartItems: CartItem[];
	totalAmount: number;
	updateCartData: () => void;
	handleQuantityChange: (code: string, newQuantity: number) => void;
	handleRemoveItem: (code: string) => void;
	clearCartItems: () => void;
	updateCartStock: (code: string, stock: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);

	const updateCartData = () => {
		const items = getCartItems();
		setCartItems(items);
		setTotalAmount(getTotalAmount(items));
	};

	const handleQuantityChange = (code: string, newQuantity: number) => {
		const updatedItems = updateQuantity(code, newQuantity);
		setCartItems(updatedItems);
		setTotalAmount(getTotalAmount(updatedItems));
	};

	const handleRemoveItem = (code: string) => {
		const updatedItems = removeFromCart(code);
		setCartItems(updatedItems);
		setTotalAmount(getTotalAmount(updatedItems));
	};

	const clearCartItems = () => {
		clearCart();
		setCartItems([]);
		setTotalAmount(0);
	};

	const updateCartStock = (code: string, stock: number) => {
		updateStock(code, stock);
		updateCartData();
	};

	useEffect(() => {
		// 初始載入購物車數據
		updateCartData();

		// 添加事件監聽器
		window.addEventListener("cartUpdated", updateCartData);

		return () => {
			window.removeEventListener("cartUpdated", updateCartData);
		};
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				totalAmount,
				updateCartData,
				handleQuantityChange,
				handleRemoveItem,
				clearCartItems,
				updateCartStock,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
