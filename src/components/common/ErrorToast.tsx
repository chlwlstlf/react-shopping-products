import styled, { keyframes } from 'styled-components';
import { Z_INDEX } from '../../constants/zIndex';

interface ErrorToastProps {
  message: string;
  isOpen: boolean;
}

const ErrorToast = ({ message, isOpen }: ErrorToastProps) => {
  return <StyledErrorToast $isOpen={isOpen}>{message}</StyledErrorToast>;
};

export default ErrorToast;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledErrorToast = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #f33f3f;
  color: white;
  font-size: 14px;
  z-index: ${Z_INDEX.TOAST};

  transition: visibility 0.5s;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.5s none;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
`;
