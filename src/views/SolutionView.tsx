import React, { useState, useEffect } from 'react';
import { map, range } from 'lodash';
import Board from '../types/Board';
import { EnteringView } from '../components/PageView';
import { Grid } from '../components/Grid';
import styled, { keyframes } from 'styled-components';
import { getRowFromIndex, getColFromIndex } from '../utils/boardUtils';
import Flyout from '../components/Flyout';
import SolutionStats from '../types/SolutionStats';

const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const I_KEY = 'i';
const ESCAPE = 'Escape';

interface SolutionProps {
  solutionSteps: Board[];
  colourArray: string[];
  stats: SolutionStats | null;
}

const grow = keyframes`
  from {
    height: 25%;
    width: 25%;
  }

  to {
    height: 90%;
    width: 90%;
  }
`;

const Cell = styled.div<{ bgColour: string; loading: boolean; index: number }>`
  ${props => (props.loading ? '' : 'width: 95%; height: 95%;')};
  transition: all 0.17s ease-in-out;
  background-color: ${props => props.bgColour};
  transition: all 0.17s;
  animation: ${grow} 0.6s ease-in-out infinite alternate;
  animation-delay: ${props => props.index * 0.05}s;
  ${props => (props.loading ? '' : 'animation-iteration-count: initial')};
`;

const StepList = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
  min-height: 100px;
`;

const Step = styled.div<{ bgColour: string; selected: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.bgColour};
  ${props =>
    props.selected ? 'border: white 4px solid; margin: 4px;' : 'margin: 8px;'}
  cursor: pointer;
`;

const MoreInfoButton = styled.div`
  cursor: pointer;
`;

const SolutionView: React.SFC<SolutionProps> = props => {
  const [currentStep, setStep] = useState<number>(0);
  const [entered, setEntered] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const renderedStep = props.solutionSteps[currentStep];

  const onKeyDown = (event: React.KeyboardEvent<any>) => {
    console.log(event.key);
    if (event.key === ARROW_LEFT) {
      setStep(Math.max(0, currentStep - 1));
    } else if (event.key === ARROW_RIGHT) {
      setStep(Math.min(props.solutionSteps.length - 1, currentStep + 1));
    } else if (event.key === ARROW_UP) {
      setStep(0);
    } else if (event.key === ARROW_DOWN) {
      setStep(props.solutionSteps.length - 1);
    } else if (event.key === I_KEY) {
      setShowInfo(true);
    } else if (event.key === ESCAPE) {
      setShowInfo(false);
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
    <EnteringView
      entered={true}
      tabIndex={0}
      onKeyDown={onKeyDown}
      id="solution-view"
    >
      <Grid>
        {map(range(0, Board.NUM_CELLS), (index: number) => {
          const cellValue =
            board[getRowFromIndex(index)][getColFromIndex(index)];
          const row = getRowFromIndex(index);
          const col = getColFromIndex(index);
          return (
            <Cell
              bgColour={
                props.colourArray[cellValue === -1 ? lastMove : cellValue]
              }
              index={row + col}
              loading={props.solutionSteps.length === 1}
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
      <MoreInfoButton onClick={() => setShowInfo(true)}>Show details</MoreInfoButton>
      {props.stats && showInfo && (
        <Flyout onClose={() => setShowInfo(false)}>
          <h1>Details</h1>
          <p>Number of moves: {props.solutionSteps.length - 1}</p>
          <p>Total iterations: {props.stats!.totalIterations}</p>
          <p>Couldn't beat the best: {props.stats!.cantBeatCurrentBest}</p>
          <p>Same board reached in fewer moves: {props.stats!.boardReachedInFewerMoves}</p>
          <p>Too far behind: {props.stats!.tooFarBehind}</p>
          <p>New best found: {props.stats!.bestFound}</p>
        </Flyout>
      )}
    </EnteringView>
  );
};

export default SolutionView;
