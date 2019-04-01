export const generateSquareMaze = (size) => {
  const map = generateMap(size)
  // generateEntry(map)
  let x, x1, n, axis
  // [0][x] [n][x] [x][n] [x][0] 
  x = Math.floor(Math.random() * size)
  x1 = x
  n = Math.floor(Math.random() * size)
  axis = Math.floor(Math.random() * size)
  n > size/2 ?
    axis > size / 2 ? map[0][x] = -1 : map[x][0] = -1 :
    axis > size / 2 ? map[size - 1][x] = -1 : map[x][size - 1] = -1
  do {
    x = Math.floor(Math.random() * size)
  } while(x1 === x)
  n = Math.floor(Math.random() * size)
  axis = Math.floor(Math.random() * size)
  n > size / 2 ?
    axis > size / 2 ? map[0][x] = -2 : map[x][0] = -2 :
    axis > size / 2 ? map[size - 1][x] = -2 : map[x][size - 1] = -2
  console.log(map)
  return map
}

const generateMap = (size) => {
  const ret = []
  for (let i = 0; i < size; i++) {
    ret.push([])
    for (let j = 0; j < size; j++) {
      ret[i][j] = 0
    }
  }
  return ret
}