<template>
  <article class="fullscreen">
    <section class="fullscreen" id="waves"></section>
    <section class="fullscreen" id="birds"></section>
  </article>
</template>

<script>
import '#res/libs/vanta/vanta.waves.min.js';
import '#res/libs/vanta/vanta.birds.min.js';

export default {
  mounted() {
    VANTA.WAVES({
      el: "#waves",
    })
    VANTA.BIRDS({
      el: "#birds",
      backgroundAlpha: 0.00,
      color1: 0x1e00ff,
      birdSize: 2.00
    })    
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  top:0%;
  left: 0%;
}
</style>


<style>
</style>
