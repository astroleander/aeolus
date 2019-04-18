<template>
  <article>
    <section>
      <li v-for="(note, idx) in notes" :key="idx">
        {{note}}
      </li>
    </section>
    <section>
      <button @click="shuffle">Shuffle</button>
      <button @click="add">Add</button>
      <section class="flex-cols">
      <transition-group tag='ul'>
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </transition-group>
      <transition-group name='flip-list' tag='ul'>
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </transition-group>
      </section>
    </section>
    <section>
      <button @click="shuffleTable">
        Shuffle
      </button>
      <transition-group name="cell" tag="div" class="container">
        <div v-for="cell in cells" :key="cell.id" class="cell">
          {{ cell.number }}
        </div>
      </transition-group>
    </section>
  </article>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      notes: [
        '不同于 <transition>，它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。',
        '过渡模式不可用，因为我们不再相互切换特有的元素。',
        '内部元素 总是需要 提供唯一的 key 属性值。'
      ],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      next: 11,
      cells: Array.apply(null, { length: 81 })
    	  .map(function (_, index) { 
          return {
            id: index,
            number: index % 9 + 1
          }
      })
    }
  },
  methods: {
    shuffle() {
      this.items = _.shuffle(this.items)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.next++)
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    shuffleTable() {
      this.cells = _.shuffle(this.cells)
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
.flip-list-enter {
  transform: scale(3)
}
.flip-list-enter-active {
  transition: transform 1s
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 238px;
  margin-top: 10px;
}
.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaa;
  margin-right: -1px;
  margin-bottom: -1px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:nth-child(27n) {
    margin-bottom: 0;
  }
}
.cell-move {
  transition: transform 1s;
}
</style>
