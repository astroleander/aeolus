<template>
  <article class="fullscreen" v-html="data">
  </article>
</template>

<script>
import chinaMap from '#res/assets/china.svg'
export default {
  data() { 
    return {
      data: chinaMap
    } 
  }
}
</script>

<style scoped lang='scss'>
svg path {
  fill: lightcoral；
}
svg {
  width: 1000px;
}
</style>