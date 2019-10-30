<template>
  <section id='container'>
    
  </section>
</template>

<script>
import mixin from '@/modules/utils/mixin.template.three.normal.js'
export default {
  mixins: [mixin],
  mounted() {
    this.setRenderTarget(document.getElementById('container'))
  }
}
</script>

<style>

</style>