import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductList = styled.div`
  display: grid;
  gap: 20px;
  justify-items: center;

  /* 데스크톱 */
  @media (min-width: 1250px) {
    grid-template-columns: repeat(6, 1fr);
  }

  /* 태블릿 */
  @media (min-width: 840px) and (max-width: 1249px) {
    grid-template-columns: repeat(4, 1fr);
  }

  /* 모바일 */
  @media (max-width: 839px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px;
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
