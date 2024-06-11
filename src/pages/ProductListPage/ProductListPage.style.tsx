import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 435px;
  padding: 36px 24px;
`;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
  border-radius: 22px;
  background-color: white;
  bottom: 0px;
  right: 0px;
  padding-top: 1px;
  font-size: 10px;
  font-weight: 700;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px;
`;

export const LoadingSpinner = styled.img`
  width: 40px;
`;

export const EmptyProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  padding-top: ${({ theme }) => theme.boxHeight};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;

  img {
    width: 150px;
  }
`;
