export interface CartItem {
	code: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
	stock: number;
	category: string;
}

const CART_STORAGE_KEY = "cart_items";

export const getCartItems = (): CartItem[] => {
	if (typeof window === "undefined") return [];
	const items = localStorage.getItem(CART_STORAGE_KEY);
	return items ? JSON.parse(items) : [];
};

export const saveCartItems = (items: CartItem[]) => {
	if (typeof window === "undefined") return;
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem) => {
	const items = getCartItems();
	const existingItem = items.find((i) => i.code === item.code);

	if (existingItem) {
		existingItem.quantity += item.quantity;
	} else {
		items.push(item);
	}

	saveCartItems(items);
	window.dispatchEvent(new Event("cartUpdated"));
	return items;
};

export const removeFromCart = (code: string) => {
	const items = getCartItems();
	const newItems = items.filter((item) => item.code !== code);
	saveCartItems(newItems);
	window.dispatchEvent(new Event("cartUpdated"));
	return newItems;
};

export const updateQuantity = (code: string, quantity: number) => {
	const items = getCartItems();
	const item = items.find((i) => i.code === code);

	if (item) {
		item.quantity = Math.max(1, Math.min(quantity, item.stock));
		saveCartItems(items);
		window.dispatchEvent(new Event("cartUpdated"));
	}

	return items;
};

export const clearCart = () => {
	saveCartItems([]);
	return [];
};

export const getTotalAmount = (items: CartItem[]): number => {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
