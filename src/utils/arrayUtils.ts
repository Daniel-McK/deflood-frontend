export function iterateNestedArrays<T>(
  arr: Array<Array<T>>,
  callback: (item: T, row: number, col: number) => void
) {
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      callback(arr[row][col], row, col);
    }
  }
}
