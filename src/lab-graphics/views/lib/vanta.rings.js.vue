<template>
  <article class="fullscreen">
    <section class="fullscreen" id="rings"></section>
  </article>
</template>

<script>
import '#res/libs/vanta/vanta.rings.min.js'

export default {
  mounted() {
    try{
      VANTA.RINGS({
        el: "#rings"
      })
    } catch {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style>
</style>
