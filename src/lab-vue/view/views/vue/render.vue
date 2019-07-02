<template>
  <article>
    <anchored-heading :level='1'>Hello World!</anchored-heading>
    <anchored-heading :level='2'>Hello World!</anchored-heading>
    <anchored-heading :level='3'>Hello World!</anchored-heading>
    <anchored-heading :level='4'>Hello World!</anchored-heading>
    <a href="https://cn.vuejs.org/v2/guide/render-function.html">see more info</a>
  </article>
</template>

<script>
import Vue from 'vue'
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子元素数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

export default {
  data() {
    return {
      title: 'title'
    }
  },
}
</script>

<style>

</style>
