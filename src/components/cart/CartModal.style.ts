import { Modal } from 'chlwlstlf-modal';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  overflow-y: auto;
  gap: 24px;
  .modal-content {
    gap: 24px;
  }
`;

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const EmptyProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding-top: ${({ theme }) => theme.boxHeight};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;

  img {
    width: 150px;
  }
`;

export const TotalAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

export const TotalAmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  strong {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
