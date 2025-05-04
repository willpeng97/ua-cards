import styled from "styled-components";
import { useState } from "react";

const ReportContainer = styled.div`
	max-width: 800px;
	margin: 1rem auto;
	padding: 2rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
	color: var(--neutral-800);
	font-size: var(--font-size-xxl);
	margin-bottom: 1rem;
	text-align: center;
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

const TextArea = styled.textarea`
	padding: 0.75rem;
	border: 1px solid var(--neutral-300);
	border-radius: 4px;
	font-size: 1rem;
	min-height: 150px;
	resize: vertical;

	&:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
	}
`;

const SubmitButton = styled.button`
	padding: 0.75rem;
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

const NoticeText = styled.p`
	color: var(--neutral-600);
	font-size: 0.9rem;
	text-align: center;
	font-style: italic;
`;

const ReportPage = () => {
	const [formData, setFormData] = useState({
		phone: "",
		email: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: 實現表單提交邏輯
		console.log("Form submitted:", formData);
	};

	return (
		<ReportContainer>
			<Title>客服回報單</Title>
			<NoticeText>!!請注意，回信可能會跑到垃圾信件中!!</NoticeText>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="phone">電話</Label>
					<Input
						type="text"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="0987654321"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">電子郵件</Label>
					<Input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="example@gmail.com"
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="message">問題描述</Label>
					<TextArea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<SubmitButton type="submit">提交</SubmitButton>
			</Form>
		</ReportContainer>
	);
};

export default ReportPage;
