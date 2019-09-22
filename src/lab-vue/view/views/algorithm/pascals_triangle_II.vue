<template>
  <article>
    空间利用上存在巨大的差异
    <section>
      <input v-model.lazy.number="times" type="number" max="500"/>
    </section>
    <section>
      <p>Demical Plan Space:{{printDp[1]}}</p>
      <p>Demical Plan Result:{{printDp[0]}}</p>
    </section>
    <section>
      <p>Table Maker Space:{{printTable[1]}}</p>
      <p>Table Maker Result:{{printTable[0]}}</p>
    </section>
  </article>
</template>

<script>
import { dp, table } from '#algo/leetcode/118-119-pascals-triangle'

export default {
  data() {
    return {
      times: 20,
    }
  },
  computed: {
    printDp() {
      console.log(dp, table)
      return dp(this.times)
    },
    printTable() {
      console.log(this.times)
      return table(this.times)
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
