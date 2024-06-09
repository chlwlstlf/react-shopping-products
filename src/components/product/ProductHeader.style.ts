import styled from 'styled-components';

export const CartIconWrapper = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CartNumber = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.primary.white};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.primary.main};
`;
