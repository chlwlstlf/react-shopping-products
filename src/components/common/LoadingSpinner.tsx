import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return <StyledLoadingSpinner></StyledLoadingSpinner>;
};

export default LoadingSpinner;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.color.primary.light};
  border-top: 4px solid ${({ theme }) => theme.color.primary.main};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;
