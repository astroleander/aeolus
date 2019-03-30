<template>
  <article>
    {{drawTree}}
    <section class="flex-middle">
      <div 
        v-for="(row, i) in drawOriginTree" :key="i"
        class="middle-line"
      >
        <div
          v-for="(item, idx) in row" :key="idx"
          class="item"
        >
          {{item || "-"}}
        </div>
      </div>
    </section>
    <section class="flex-middle">
      <div 
        v-for="(row, i) in drawTree" :key="i"
        class="middle-line"
      >
        <div
          v-for="(item, idx) in row" :key="idx"
          class="item"
        >
          {{item || "-"}}
        </div>
      </div>
    </section>
  </article>
</template>

<script>
const generateCompletedTree = (num) => {
  let ret = []
  for (let index = 0; index < num; index++) {
      ret.push((Math.random() * 100).toFixed(0))
    }
    console.log(ret)
    return ret
}

const reverse = (arr, layer) => {
  /**
   * For binary tree built by array,
   * We just need reverse each level layer of the tree
   */
  while (true) {
    let start_idx = Math.pow(2, layer) - 1
    let end_idx = start_idx * 2
    if (end_idx > arr.length) return arr
    let i = start_idx
    let j = end_idx
    console.log(i,j)
    while (i < j) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
      j--
    }

    layer += 1
  }
  return arr
  // if (arr[node] === undefined || arr[node] === null) return  
  // const swap = (arr, left, right) => {
  //   const temp = arr[left]
  //   arr[left] = arr[right]
  //   arr[right] = temp 
  // }
  // let left = node * 2 + 1
  // let right = node * 2 + 2
  // reverse(arr, left)
  // swap(arr, left, right)
  // reverse(arr, right)

  // return arr
}

const draw = (tree) => {
  let ret = []
  let layer = 0
  let limit
  do {
    layer +=1
    limit = Math.pow(2, layer) - 1 
    const cur = tree.slice(limit/2, limit)
    cur.push(...Array((limit/2).toFixed(0) - cur.length))
    console.log(cur)
    ret.push(cur)
  } while (limit < tree.length)
  return ret
}

export default {
  data() {
    return {
      tree: [],
      origin_tree: [],
      len: 15,
    }
  },
  methods: {
    generateTree() {
      this.tree = generateCompletedTree(this.len)
    },
    reverseTree() {
      console.log('old:\t'+this.tree)
      this.tree = reverse(this.tree, 0)
      console.log('new:\t'+this.tree)
    },
    left(n) {
      return
    },
    right() {

    }
  },
  computed: {
    drawTree() {
      return draw(this.tree)
    },
    drawOriginTree() {
      return draw(this.origin_tree)
    }
  },
  mounted() {
    this.generateTree()
    this.origin_tree.push(...this.tree)
    this.reverseTree()
  }
}
</script>

<style lang="scss" scoped>
.middle-line {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  .item {
    text-align: center;
    margin: 20px;
  }
}

</style>
