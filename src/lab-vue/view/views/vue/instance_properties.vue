<template>
  <article class="flex-middle">
    <h1>{{this.vueInstanceProperties}}</h1>
    <h1>see console</h1>
    <span>more info plz see <a href="https://cn.vuejs.org/v2/cookbook/adding-instance-properties.html">https://cn.vuejs.org/v2/cookbook/adding-instance-properties.html</a></span>
  </article>
</template>

<script>
import Vue from 'vue'
Vue.prototype.vueInstanceProperties = 'This is an vue instance properties'

export default {
  beforeCreate: function() {
    console.log(this.vueInstanceProperties)
  },
  data() {
    return {
      vueInstanceProperties: 'This is an vue component properties',
    }
  },
  mounted: function() {
    console.log(this.vueInstanceProperties)
  }
}
</script>

<style lang="scss" scoped>

</style>
