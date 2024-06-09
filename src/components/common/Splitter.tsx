import styled from 'styled-components';

const Splitter = () => <StyledSplitter />;

const StyledSplitter = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.color.primary.light};
`;
export default Splitter;
