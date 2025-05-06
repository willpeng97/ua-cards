import { useState, useEffect } from "react";
import { cardApi } from "../api/cardApi";

interface Card {
	id: number;
	image: string;
	title: string;
	code: string;
	price: number;
	stock: number;
	category: string;
}

const FetchCards = () => {
	const [cards, setCards] = useState<Card[]>([]);

	useEffect(() => {
		cardApi.getCards().then((data) => setCards(data));
	}, []);

	return (
		<div>
			{cards.map((card: Card) => (
				<div key={card.id}>
					<img src={card.image} alt={card.title} />
					<h3>{card.title}</h3>
					<p>編號: {card.code}</p>
					<p>價格: ${card.price}</p>
					<p>庫存: {card.stock}</p>
					<p>分類: {card.category}</p>
				</div>
			))}
		</div>
	);
};

export default FetchCards;
