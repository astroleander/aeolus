import data from './SquareCity.json'
import * as THREE from 'three'
console.log('[data]', data);

export default function SquareCityMapParser() {
  console.log('[SquareCityMapParser]', data);
  // get centers

  const area_left = data.rowSize[0];
  const area_right = data.rowSize[1];
  const area_top = data.columnSize[0];
  const area_bottom = data.columnSize[1];

  const area_width = Math.abs(area_left) + area_right ;
  const area_height = Math.abs(area_top) + area_bottom;

  const sample = {count:0, proportion: 0};
  const row = data.row.reduce((pV, cV) => {
    return {count: pV.count + 1, proportion: pV.proportion + cV};
  }, sample);
  const column = data.column.reduce((pV, cV) => {
    return {count: pV.count + 1, proportion: pV.proportion + cV};
  }, sample);

  console.log(area_width)
  console.log(area_height)

  const squares = [];
  let idx = 0;
  // 行
  for (let i = 0; i < row.count; i++) {
    const height = (data.row[i] / row.proportion) * area_height
    // 列
    for (let j = 0; j < column.count; j++) {
      const width = (data.column[j] / column.proportion) * area_width

      let start;
      if (!!(idx % column.count)){
        start = squares[idx - 1] ? squares[idx - 1].end : area_left;
      } else {
        start = area_left;
      }
      const end = start + width;
      const top = squares[idx - column.count] ? squares[idx - column.count].bottom : area_top;
      const bottom = top + height;

      squares.push({
        row: i,
        column: j,
        start, end, bottom, top,
        center: [(start + end) / 2, (bottom + top) / 2],
        width, height
      })
      idx ++;

    }
  }
  console.log(squares)
  return squares
}