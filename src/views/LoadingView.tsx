import React, { useState, useEffect } from 'react';
import { map, range } from 'lodash';
import styled, { keyframes } from 'styled-components';
import { EnteringView } from '../components/PageView';
import { getRowFromIndex, getColFromIndex } from '../utils/boardUtils';
import Board from '../types/Board';
import { Grid } from '../components/Grid';

const grow = keyframes`
  from {
    height: 25%;
    width: 25%;
    background-color: #607625;
  }

  to {
    height: 90%;
    width: 90%;
    background-color: #809d31;
  }
`;

const LoadingItem = styled.div<{ index: number }>`
  width: 25%;
  height: 25%;
  background-color: #607625;
  animation: ${grow} .6s ease-in-out infinite alternate;
  animation-delay: ${props => props.index * 0.05}s;
`;

const LoadingView: React.SFC<{}> = props => {
  const [entered, setEntered] = useState<boolean>(false);
  useEffect(() => {
    if (!entered) {
      setEntered(true);
    }
  });
  return (
    <EnteringView entered={entered}>
      <Grid>
        {map(range(0, Board.NUM_CELLS), index => (
          <LoadingItem key={index} index={getRowFromIndex(index) + getColFromIndex(index)} />
        ))}
      </Grid>
    </EnteringView>
  );
};

export default LoadingView;
