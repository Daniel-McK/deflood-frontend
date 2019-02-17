import React, { useState, useEffect } from 'react';
import { map, range } from 'lodash';
import Board from '../types/Board';
import { EnteringView } from '../components/PageView';
import { Grid } from '../components/Grid';
import styled from 'styled-components';
import { getRowFromIndex, getColFromIndex } from '../utils/boardUtils';

const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';

interface SolutionProps {
  solutionSteps: Board[];
  colourArray: string[];
}

const Cell = styled.div<{ bgColour: string }>(
  ({ bgColour }) => `
  width: 95%;
  height: 95%;
  background-color: ${bgColour};
  transition: background-color 0.17s;
`
);

const StepList = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
`;

const Step = styled.div<{ bgColour: string; selected: boolean }>(
  ({ bgColour, selected }) => `
  width: 20px;
  height: 20px;
  background-color: ${bgColour};
  ${selected ? 'border: white 4px solid; margin: 4px;' : 'margin: 8px;'}
  cursor: pointer;
`
);

const SolutionView: React.SFC<SolutionProps> = props => {
  const [currentStep, setStep] = useState<number>(0);
  const [entered, setEntered] = useState<boolean>(false);
  const renderedStep = props.solutionSteps[currentStep];

  const onKeyDown = (event: React.KeyboardEvent<any>) => {
    if (event.key === ARROW_LEFT) {
      setStep(Math.max(0, currentStep - 1));
    } else if (event.key === ARROW_RIGHT) {
      setStep(Math.min(props.solutionSteps.length - 1, currentStep + 1));
    }
  };

  useEffect(() => {
    if (!entered) {
      document.getElementById('solution-view')!.focus();
      setEntered(true);
    }
  });

  const lastMove = renderedStep.getLastMove();
  const board = renderedStep.getBoard();

  return (
    <EnteringView entered={entered} tabIndex={0} onKeyDown={onKeyDown} id="solution-view">
      <Grid>
        {map(range(0, Board.NUM_CELLS), (index: number) => {
          const cellValue =
            board[getRowFromIndex(index)][getColFromIndex(index)];
          return (
            <Cell
              bgColour={
                props.colourArray[cellValue === -1 ? lastMove : cellValue]
              }
              key={index}
            />
          );
        })}
      </Grid>
      <StepList>
        {map(props.solutionSteps, (step: Board, index: number) => {
          const updateStep = () => setStep(index);
          return (
            <Step
              bgColour={props.colourArray[step.getLastMove()]}
              onClick={updateStep}
              selected={step === renderedStep}
              key={index}
            >
              {index === 0 && 'S'}
            </Step>
          );
        })}
      </StepList>
    </EnteringView>
  );
};

export default SolutionView;
