<template>
  <article>
    <input v-model.number="N"/>
    <p>{{result}}</p>
  </article>
</template>

<script>
import Fib from '#algo/leetcode/509-fibonacci'

export default {
  data() {
    return {
      N: 10,
      result: null
    }
  },
  methods: {
    fib() {
      this.result = Fib.fib_table(this.N)
    }
  },
  mounted() {
    this.fib()
  },
  watch: {
    N() {
      this.fib()
    }
  }
}
</script>

<style>

</style>
