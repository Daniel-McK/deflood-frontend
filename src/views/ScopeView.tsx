import React, { useState, useEffect, useRef } from 'react';
import { EnteringView } from '../components/PageView';
import styled from 'styled-components';
import Cropper from 'react-cropper';
import { getGridFromImageData } from '../utils/imageUtils';

interface ScopeViewProps {
  file: File;
  onBoardSelected: (grid: number[][], colourArray: string[]) => void;
}

const NextWrapper = styled.button`
  position: absolute;
  bottom: 48px;
  right: 48px;
  background-color: #009624;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 32px;
  line-height: 32px;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    outline: none;
`;

const ScopeView: React.SFC<ScopeViewProps> = props => {
  const cropperRef = useRef<any>(null);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    if (!imageSource) {
      const imageReader = new FileReader();
      imageReader.addEventListener('load', (image: any) => {
        setImageSource(image.srcElement.result);
      });
      imageReader.readAsDataURL(props.file);
    }
  });

  const onClick = async () => {
    try {
      const canvas: HTMLCanvasElement = cropperRef.current!.getCroppedCanvas();
      const context = canvas.getContext('2d');
      const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
      const { colourArray, grid } = getGridFromImageData(imageData);
      props.onBoardSelected(grid, colourArray);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EnteringView entered={!!imageSource}>
      <Cropper
        ref={cropperRef}
        src={imageSource}
        aspectRatio={1}
        style={{
          height: '100vh',
          width: '100vw'
        }}
      />
      <NextWrapper onClick={onClick}>✓</NextWrapper>
    </EnteringView>
  );
};

export default ScopeView;
