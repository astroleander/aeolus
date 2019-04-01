<template>
  <article>
    <section :style="map_styles" class="map">
      <div v-for="(element, i) in [].concat(...map)" :key="i"
        :style="{
          'grid-row': Math.floor(i/size) + 1,
          'grid-column': (i+1) % size, 
          'background': getBackground(element)
          }" 
        class="grid"
        >
        <br/>
      </div>      
    </section>
  </article>
</template>

<script>
import { generateSquareMaze } from '@lv/view/src/generateMaze.js'

const initialfindWay = (map) => {
  // 1.initial initialfindWay map
  let d = []
  let unvisited_nodes = []
  let start = {}
  for (let i = 0; i < map.length; i++) {
    d.push([])
    for (let j = 0; j < map[i].length; j++) {
      unvisited_nodes.push(i+','+j)
      if (map[i][j] === -2) {
        d[i][j] = -2
      } else if (map[i][j] === -1) {
        d[i][j] = 0
        start = {i,j}
      } else {
        d[i][j] = Number.MAX_VALUE
      }
    }
  }
  return {d, unvisited_nodes, start}
}

function* findWaySteps(d, unvisited_nodes, start) {
  let i,j
  const visited = [{i:start.i, j:start.j}]
  console.log(visited)
  let cur_distance
  // find adjency
  while(visited.length > 0){
    ({i, j} = visited.shift())
    cur_distance = d[i][j]
    if (d[i][j-1] && d[i][j-1] === Number.MAX_VALUE) {
      d[i][j-1] = cur_distance + 1
      visited.push({i, j:j-1})
    } else if (d[i][j-1] && d[i][j-1] === -2) {
      yield true
      break
    }
    if (d[i][j+1] && d[i][j+1] === Number.MAX_VALUE) {
      d[i][j+1] = cur_distance + 1
      visited.push({i, j:j+1})
    } else if (d[i][j+1] && d[i][j+1] === -2) {
      yield true
      break
    }
    if (d[i-1] && d[i-1][j] && d[i-1][j] === Number.MAX_VALUE ) {
      d[i-1][j] = cur_distance + 1
      visited.push({i:i-1, j})
    } else if (d[i-1] && d[i-1][j] && d[i-1][j] === -2) {
      yield true
      break
    }
    if (d[i+1] && d[i+1][j] && d[i+1][j] === Number.MAX_VALUE) {
      d[i+1][j] = cur_distance + 1
      visited.push({i:i+1, j})
    } else if (d[i+1] && d[i+1][j] && d[i+1][j] === -2) {
      yield true
      break
    }
    d[start.i][start.j] = -1
    yield d
  }
  yield true
}

const len = 32
export default {
  data() {
    return {
      size: len,
      map: generateSquareMaze(len),
      frequency: 50,
      map_styles: {
        'grid-template-columns': 'repeat('+ len +', 20px)'
      },
    }
  },
  methods: {
    getBackground(type) {
      if(0 < type && type < Number.MAX_VALUE) {
        return '#8' + type%10 + type%10
      }
      switch (type) {
        case -1:
          return '#3D7'          
        case -2:
          return '#0055DD'
        case Number.MAX_VALUE:
          return '#FFF'
        default:
          return '#FFF'
      }
    }
  },
  mounted() {
    let d, unvisited_nodes
    let findWay = initialfindWay(this.map)
    console.log(findWay.d)
    console.log(findWay.unvisited_nodes)
    let iter = findWaySteps(findWay.d, findWay.unvisited_nodes, findWay.start)
    
    let timer = setInterval(() => {
      let ret = iter.next()
      console.log(ret.value)
      if (ret.value !== true) {
        this.map = []
        this.map = ret.value
      } else {
        clearInterval(timer)
      }
    }, this.frequency)
  }
}
</script>

<style lang="scss" scoped>
.map {
  display: grid;
  justify-items:  stretch;

}
.grid {
  height: 20px;
  border: 1px solid #999;
}
</style>
