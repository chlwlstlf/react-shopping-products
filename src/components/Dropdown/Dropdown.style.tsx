import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Select = styled.select<{ $isDefault: boolean }>`
  width: 125px;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  color: ${(props) =>
    props.$isDefault ? ({ theme }) => theme.color.primary.light : ({ theme }) => theme.color.primary.dark};

  option {
    color: ${({ theme }) => theme.color.primary.dark};
  }
`;

export const ArrowIcon = styled.img`
  position: absolute;
  right: 10px;
`;
