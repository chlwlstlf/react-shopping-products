import styled from 'styled-components';

// Layout
export const Layout = styled.div`
  // width: 100vw;
`;

// Header
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 435px;
  height: ${({ theme }) => theme.boxHeight};
  padding: 0px 24px;
  background: ${({ theme }) => theme.color.primary.main};

  color: ${({ theme }) => theme.color.primary.white};
  font-size: 20px;
  font-weight: 800;
`;

// Content
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 435px;
  padding: 36px 24px;
`;

//Title
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const MainTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 18px;
`;
