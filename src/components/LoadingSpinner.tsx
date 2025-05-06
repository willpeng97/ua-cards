import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2rem;
`;

const Spinner = styled.div`
	width: 40px;
	height: 40px;
	border: 4px solid var(--neutral-200);
	border-top: 4px solid var(--primary-color);
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
	return (
		<SpinnerContainer>
			<Spinner />
		</SpinnerContainer>
	);
};

export default LoadingSpinner;
