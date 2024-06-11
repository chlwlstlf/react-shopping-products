import styled, { keyframes } from 'styled-components';

const jump = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Layout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 30px;
  bottom: 20px;
  z-index: 999;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50px;
  box-shadow: 3px 3px 5px -3px #333;
  cursor: pointer;

  img {
    width: 13px;
    height: 13px;
  }

  &:hover {
    animation: ${jump} 0.8s ease;
  }
`;
