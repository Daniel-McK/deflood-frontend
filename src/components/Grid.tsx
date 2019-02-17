import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  width: 360px;
  height: 360px;
  grid-template-columns: repeat(12, 30px);
  grid-template-rows: repeat(12, 30px);
  align-items: center;
  justify-items: center;
`;
