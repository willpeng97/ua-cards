import styled from "styled-components";
import { useState } from "react";
import { commonApi } from "../api/commonApi";
import Swal from "sweetalert2";

const ReportContainer = styled.div`
	width: 800px;
	margin: 1rem auto;
	padding: 2rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	@media (max-width: 768px) {
		width: 100vw;
	}
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
		issue: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const result = await commonApi.sendReport(formData);
			await Swal.fire({
				icon: result.success ? "success" : "error",
				title: result.success ? "發送成功" : "發送失敗",
				text: result.message,
				confirmButtonText: "確定",
				confirmButtonColor: "var(--primary-color)",
			});

			if (result.success) {
				setFormData({
					phone: "",
					email: "",
					issue: "",
				});
			}
		} catch (error) {
			console.error("發送回報失敗:", error);
			await Swal.fire({
				icon: "error",
				title: "發送失敗",
				text: "發送回報時出錯，請稍後再試。",
				confirmButtonText: "確定",
				confirmButtonColor: "var(--primary-color)",
			});
		} finally {
			setIsSubmitting(false);
		}
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
					<Label htmlFor="issue">問題描述</Label>
					<TextArea
						id="issue"
						name="issue"
						value={formData.issue}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<SubmitButton type="submit" disabled={isSubmitting}>
					{isSubmitting ? "發送中..." : "提交"}
				</SubmitButton>
			</Form>
		</ReportContainer>
	);
};

export default ReportPage;
