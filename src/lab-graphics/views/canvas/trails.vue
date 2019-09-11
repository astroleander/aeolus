<!--
  @author: Astroleander
  @created: 2019/09/11
  @origin/inspiration: http://jsfiddle.net/avhLcyk4/
  @description: 
  我折服于人类的创造力, 我就是个弟弟
  Create a white mask every frame, 
  which making the red rect be  25% more shallow than last frame
-->
<template>
  <article class='focus-center fullscreen'>
    <canvas class="" id="container"></canvas>
  </article>
</template>

<script>
import * as THREE from 'three'
export default {
  data() { return {
    canvas: null
  } },
  mounted() {
    this.canvas = document.getElementById('container');
    this.render();
  },
  methods: {
    render(t) {
      // The canvas element has two attributes to control the size of the coordinate space: width and height.
      // These attributes, when specified, must have values that are valid non-negative integers.
      // The width attribute defaults to 300, and the height attribute defaults to 150.
      let c = this.canvas.getContext('2d');
      let time = t * 0.004;

      c.beginPath();
      c.arc(Math.sin(time) * 40 + 50, Math.cos(time) * 40 + 70, 10, 0, 2 * Math.PI);
      c.fillStyle = 'red';
      c.fill();
      
      c.beginPath();
      c.arc(Math.sin(time/2) * 40 + 150, Math.cos(time) * 50 + 70, 10, 0, 2 * Math.PI);
      c.fillStyle = 'yellow';
      c.fill();

      c.beginPath();
      c.arc(Math.sin(time) * 40 + 250, Math.cos(time/2) * 40 + 70, 10, 0, 2 * Math.PI);
      c.fillStyle = 'green';
      c.fill();

      c.fillStyle = 'rgba(255, 255, 255, 0.05)';
      c.fillRect(0, 0, this.canvas.width, this.canvas.height);
      requestAnimationFrame(this.render);
    }
  }
}
</script>

<style scoped lang='scss'>
#container{
  border: 1px solid silver;
  width: 40%;
}
</style>