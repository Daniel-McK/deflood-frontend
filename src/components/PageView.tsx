import styled from 'styled-components';

export const PageView = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #23221a;
  flex-direction: column;
`;

export const EnteringView = styled(PageView)<{ entered: boolean }>(
  props => `
  position: absolute;
  top: ${props.entered ? '0' : '100%'};
  transition: top 0.25s ease-in-out;
`
);
