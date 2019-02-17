const NUM_COLOURS_EXPECTED = 6;

export function getGridFromImageData(imageData: ImageData) {
  const colourArray: Array<string> = [];
  const grid: Array<Array<number>> = [];
  const cellDimension = imageData.height / 12;
  const cellOffset = cellDimension / 2;

  const getColourIndex = (colour: string) => {
    const colourIndex = colourArray.indexOf(colour);
    if (colourIndex >= 0) {
      return colourIndex;
    }
    colourArray.push(colour);
    return colourArray.length - 1;
  };

  for (let row = 0; row < 12; row++) {
    const gridRow: Array<number> = [];
    for (let col = 0; col < 12; col++) {
      const x = Math.trunc(col * cellDimension + cellOffset);
      const y = Math.trunc(row * cellDimension + cellOffset);
      const colourIndex = getColourIndex(getColourFromCell(imageData, x, y));
      gridRow.push(colourIndex);
    }
    grid.push(gridRow);
  }
  if (colourArray.length !== NUM_COLOURS_EXPECTED) {
    throw new Error('Unable to parse board');
  }
  return {
    colourArray,
    grid
  };
}

function getColourFromCell(imageData: ImageData, x: number, y: number) {
  const position = (y * imageData.width + x) * 4;
  const r = imageData.data[position];
  const g = imageData.data[position + 1];
  const b = imageData.data[position + 2];
  // ignore alpha
  return `rgb(${r}, ${g}, ${b})`;
}
