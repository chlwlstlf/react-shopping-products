import React from 'react';
import { Button } from '../common';
import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';
import styled from 'styled-components';

interface QuantityContainerProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityContainer: React.FC<QuantityContainerProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <QuantityContainerContainer>
      <Button variant="secondary" size="small" onClick={onDecrease}>
        <img src={MinusIcon} alt="수량 감소" />
      </Button>
      <span>{quantity}</span>
      <Button variant="secondary" size="small" onClick={onIncrease}>
        <img src={PlusIcon} alt="수량 증가" />
      </Button>
    </QuantityContainerContainer>
  );
};

export default QuantityContainer;

const QuantityContainerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
