import * as React from 'react';
import { PageView } from '../components/PageView';
import FileLoader from '../components/FileLoader';

interface InputViewProps {
  onSelectFile: (file: File) => void;
}

const InputView: React.SFC<InputViewProps> = (props) => {
  return (
    <PageView>
      <FileLoader
        onChange={props.onSelectFile}
      />
    </PageView>
  );
};

export default InputView;
