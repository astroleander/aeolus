<template>
  <article class='fullscreen'>
    <div @click='onclick' class='shape' :style='style'></div>
  </article>
</template>

<script>
export default {
  data() { return {
    style: {}
  } },
  mounted() {
    this.randomShapeGenerator()
    let c = document.getElementsByClassName('floating-button')
    c[0].remove()
},
  methods: {
    onclick() {
      this.handleClick()
    },
    handleClick() {
      console.log('You click the square!')
      this.randomShapeGenerator()
    },
    randomShapeGenerator() {
      const randomSizeSeed = (() => 0.3 + Math.random() * 0.7 )()
      const randomPosWSeed = (() => 0.3 + Math.random() * 0.7 )()
      const randomPosHSeed = (() => 0.3 + Math.random() * 0.7 )()
      const fixed = 300;
      const wLimit = window.innerWidth, hLimit = window.innerHeight;
      let style = {}
      style.width = `${randomSizeSeed * fixed}px`;
      style.height = `${randomSizeSeed * fixed}px`;
      style.left = `${
        Math.floor(
          (randomPosWSeed * wLimit - randomSizeSeed * fixed) / wLimit * 100
          )}%`
      style.top = `${
        Math.floor(
          (randomPosHSeed * hLimit - randomSizeSeed * fixed) / hLimit * 100
        )}%`

      style.background = 'green';
      this.style = style
      console.log(style)
    }
  }
}
</script>

<style scoped lang='scss'>
.fullscreen {
  .shape {
    position: absolute;
  } 
}
</style>