import styled, { keyframes } from 'styled-components';
import { Z_INDEX } from '../../constants/zIndex';
import UpIcon from '../../assets/UpIconWhite.svg';

const FloatingButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledFloatingButton type="button" onClick={goToTop}>
      <img src={UpIcon} alt="위로 스크롤" />
    </StyledFloatingButton>
  );
};

export default FloatingButton;

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

const StyledFloatingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 30px;
  bottom: 20px;
  z-index: ${Z_INDEX.CLICKABLE};
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
