<template>
  <article class="fullscreen">
    <section class="fullscreen" id="clouds"></section>
  </article>
</template>

<script>
import '#res/libs/vanta/vanta.clouds.min.js';

export default {
  mounted() {
    VANTA.CLOUDS({
      el: "#clouds",
    })  
  }
}
</script>

<style lang="scss" scoped>
// .fullscreen {
//   position: absolute;
//   top:0%;
//   left: 0%;
// }
</style>


<style>
</style>
