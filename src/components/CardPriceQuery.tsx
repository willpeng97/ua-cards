import { useState } from "react";
import styled from "styled-components";
import { cardApi } from "../api/cardApi";

const Container = styled.div`
	padding: 1rem;
	border: 1px solid var(--neutral-300);
	border-radius: 8px;
	background: white;
`;

const Title = styled.h2`
	color: var(--neutral-800);
	font-size: 1.25rem;
	margin-bottom: 1rem;
`;

const Form = styled.form`
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
`;

const Input = styled.input`
	flex: 1;
	padding: 0.5rem;
	border: 1px solid var(--neutral-300);
	border-radius: 4px;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
	}
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	background: var(--primary-color);
	color: white;
	border: none;
	border-radius: 4px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background: var(--primary-dark);
	}

	&:disabled {
		background: var(--neutral-400);
		cursor: not-allowed;
	}
`;

const ResultBox = styled.div`
	margin-top: 1rem;
	padding: 1rem;
	border: 1px solid var(--neutral-300);
	border-radius: 4px;
	background: var(--neutral-50);
`;

const ResultItem = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 0.5rem;
`;

const Label = styled.span`
	color: var(--neutral-700);
	font-weight: 600;
`;

const Value = styled.span`
	color: var(--neutral-800);
	font-weight: 500;
`;

const ErrorMessage = styled.p`
	color: var(--error-color);
	margin-top: 0.5rem;
`;

const CardPriceQuery = () => {
	const [cardNumber, setCardNumber] = useState("");
	const [price, setPrice] = useState<number | undefined>(undefined);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!cardNumber.trim()) return;

		setIsLoading(true);
		setError("");
		setPrice(undefined);

		try {
			const result = await cardApi.getCardPrice(cardNumber);
			setPrice(result.price);
			if (result.error) {
				setError(result.error);
			}
		} catch (err) {
			console.error(err);
			setError("查詢失敗，請稍後再試");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<Title>卡片價格查詢</Title>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
					placeholder="請輸入卡片編號"
					disabled={isLoading}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "查詢中..." : "查詢"}
				</Button>
			</Form>

			{(price !== undefined || error) && (
				<ResultBox>
					<ResultItem>
						<Label>卡片編號:</Label>
						<Value>{cardNumber}</Value>
					</ResultItem>
					{price !== undefined && (
						<ResultItem>
							<Label>價格:</Label>
							<Value>{price > 0 ? `$${price}` : "查無此卡片"}</Value>
						</ResultItem>
					)}
					{error && <ErrorMessage>{error}</ErrorMessage>}
				</ResultBox>
			)}
		</Container>
	);
};

export default CardPriceQuery;
