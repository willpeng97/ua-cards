import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--success-color);
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-weight: 600;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${props => props.isVisible ? slideIn : slideOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  min-width: 200px;
  max-width: 90%;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    min-width: 180px;
  }
`;

const Icon = styled(FaCheckCircle)`
  font-size: 1.25rem;
`;

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const Toast = ({ message, isVisible, onHide }: ToastProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onHide();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!shouldRender) return null;

  return (
    <ToastContainer isVisible={isVisible}>
      <Icon />
      {message}
    </ToastContainer>
  );
};

export default Toast; 