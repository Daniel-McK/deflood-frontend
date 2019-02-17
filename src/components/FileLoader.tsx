import * as React from 'react';
import styled from 'styled-components';

const ClickableLabel = styled.label`
  cursor: pointer;
  padding: 10px;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: solid 5px #607625;
  color: #607625;
  transition: 0.1s ease-in-out all;
  display: block;
  box-shadow: 0 2px 5px black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
  outline: none;

  &:hover,
  &:focus {
    background-color: #1c1b14;
  }
`;

const HiddenInput = styled.input`
  position: fixed;
  left: -1000px;
`;

interface FileLoaderProps {
  onChange: (file: File) => void;
}

const FileLoader: React.SFC<FileLoaderProps> = props => {
  const wrappedChange = (ev: any) => {
    if (ev.target.files[0]) {
      props.onChange(ev.target.files[0]);
    }
  };

  return (
    <div>
      <HiddenInput id="file-loader" type="file" onChange={wrappedChange} tabIndex={-1} />
      <ClickableLabel htmlFor="file-loader" tabIndex={0}>
        Upload file
      </ClickableLabel>
    </div>
  );
};

export default FileLoader;
