<template>
  <article>
    不要用 25 ~ 30 的用例，不然递归方法直接把栈爆了
    <section>
      <input v-model.lazy.number="times" type="number" max="500"/>
    </section>
    <section>
      <p>Recursion Runtimes:{{printRecursion[1]}}</p>
      <p class='output' v-for="(i, idx) in printRecursion[0]" :key="idx">{{i}}</p>
    </section>
    <section>
      <p>Table Maker Runtimes:{{printTable[1]}}</p>
      <p class='output' v-for="(i, idx) in printTable[0]" :key="idx">{{i}}</p>
    </section>
  </article>
</template>

<script>
function cal(i, j){
  if (i < j) return 0;
  else if (i === 1 || j === 1) return 1;
  else return cal(i - 1, j) + cal(i - 1, j - 1)
}

function loc(i, j, pos){
  if (j > i || j === -1) return -1;
  return pos[i] + j;
}

// function table(numRows) {
//   // record num of num of each row
//   const pos = []
//   // const num = [1]
//   const array = [[1]]
//   for (let index = 0; index < numRows; index++) {
//     pos.push(index + (pos[index-1] || 0)) 
//   }
//   // console.log(pos)
//   const max = pos[pos.length - 1]
//   for(let i = 0; i < numRows; i++) {
//     array[i] ? array[i] : array[i] = []
//     for(let j = 0; j < i + 1; j++) {
//       let idx = loc(i, j, pos)
//       if (idx === 0) continue;
//       array[i][j] = (array[i-1] && array[i-1][j] || 0) + (array[i-1] && array[i-1][j-1] || 0)
//       // num[idx] = (num[loc(i-1, j, pos)] || 0) + (num[loc(i-1, j-1, pos)] || 0)
//     }
//   }
//   return array
// }

// a shorter version
function table(numRows) {
  if (numRows < 1) return [];
  const array = [[1]];
  for (let row = 0; row < numRows; row++) {
    array.push([]);
    for (let idx = 0; idx < row + 1; idx++) {
      if (row === 0) continue;
      array[row].push( 
        (array[row - 1] && array[row - 1][idx - 1] || 0) +
        (array[row - 1] && array[row - 1][idx] || 0)
      )
    }
  }
  array.pop()
  return array;
}


function recursion(numRows) {
  let res = [];
  let row = Number(numRows);
  while(row > 0) {
    const rowarr = []
    for (let idx = 0; idx < row; idx++) {
      rowarr.push(cal(row, idx + 1))
    }
    res.unshift(rowarr);
    row--;
  }
  return res
}

export default {
  data() {
    return {
      times: 20,
    }
  },
  computed: {
    printRecursion() {
      if (this.times > 30) return [['罢工！'], 'N/a']
      const timestamp = Date.now()
      const res = recursion(this.times)
      const runtimestamp = Date.now()
      return [res, runtimestamp - timestamp]
    },
    printTable() {
      const timestamp = Date.now()
      const res = table(this.times)
      const runtimestamp = Date.now()
      return [res, runtimestamp - timestamp]
    }
  }
}
</script>

<style lang="scss" scoped>
p.output {
  font-size: 0.5em;
  margin: 1px 1px 1px 1px;
}
</style>
