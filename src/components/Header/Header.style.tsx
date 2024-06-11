import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 435px;
  height: ${({ theme }) => theme.boxHeight};
  padding: 0px 24px;
  background: ${({ theme }) => theme.color.primary.main};
`;
