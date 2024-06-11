import styled from 'styled-components';

export const Layout = styled.button<{ $isActive: boolean; $variant: string }>`
  display: flex;
  align-items: center;
  column-gap: 5px;
  width: 65px;
  height: 26px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.$variant === 'primary' ? 'black' : 'lightgrey')};
  color: ${(props) => (props.$variant === 'primary' ? 'white' : 'black')};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$variant === 'primary' ? '#444' : '#BBB')};
  }
`;
