import styled from 'styled-components';

export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const ProductPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const CartItemQuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
