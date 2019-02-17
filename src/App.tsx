import React, { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import InputView from './views/InputView';
import ScopeView from './views/ScopeView';
import { getSolutionInfo } from './utils/api';
import SolutionView from './views/SolutionView';
import Board from './types/Board';
import { getSolutionSteps } from './utils/boardUtils';
import SolutionStats from './types/SolutionStats';

const FILE_UPLOAD = 0;
const CROP_IMAGE = 1;
const LOADING_SOLUTION = 2;
const SHOW_SOLUTION = 3;

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    color: #F0F0F0;
    font-family: 'Roboto', sans-serif;
  }

  img.hidden {
    position: fixed;
    top: -1000px;
  }
`;

const AppWrapper = styled.div<{ stage: number }>`
  text-align: center;
  background-color: #23221a;
  height: 100vh;
  overflow-y: hidden;
`;

const App: React.SFC<any> = () => {
  const [stage, setStage] = useState<number>(FILE_UPLOAD);
  const [file, setFile] = useState<File | null>(null);
  const [colourArray, setColours] = useState<string[]>([]);
  const [steps, setSteps] = useState<Board[]>([]);
  const [stats, setStats] = useState<SolutionStats | null>(null);


  const onBoardSelected = async (board: number[][], colours: string[]) => {
    setStage(LOADING_SOLUTION);
    setColours(colours);
    setSteps([new Board(board)]);
    const results = await getSolutionInfo(board);
    setStats(results.data.stats);
    setSteps(getSolutionSteps(board, results.data.moves));
    setStage(SHOW_SOLUTION);
  };

  const selectFile = (selectedFile: File) => {
    setFile(selectedFile);
    setStage(CROP_IMAGE);
  };

  return (
    <AppWrapper stage={stage}>
      <GlobalStyles />
      <InputView onSelectFile={selectFile} />
      {file && <ScopeView file={file} onBoardSelected={onBoardSelected} />}
      {stage >= LOADING_SOLUTION && <SolutionView colourArray={colourArray} solutionSteps={steps} stats={stats} />}
    </AppWrapper>
  );
};

export default App;
