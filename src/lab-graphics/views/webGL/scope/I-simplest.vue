<template>
  <section id='container'>
    <canvas id='scope'></canvas>
  </section>
</template>

<script>
import normal from '@/modules/utils/mixin.template.three.normal.js'

export default {
  data() {
    return {
      scope: null
    }
  },
  mixins: [normal],
  mounted() {
    this.setRenderTarget(document.getElementById('container'));
    this.drawScope();
  },
  methods: {
    drawScope() {
      this.scope = document.getElementById('scope');
      console.log(this.scope);
      /**
       * 注意, canvas的内部的宽高和外部的宽高是不同的,
       * canvas 本质可以理解为固定大小的像素图片, 如果只设置外部样式大小, canvas 会以默认大小作为内部大小, 然后拉伸至外部大小
       * 
       */
      this.scope.width = window.innerWidth;
      this.scope.height = window.innerHeight;

      let c = this.scope.getContext('2d');
      let limit = this.scope.width > this.scope.height ? this.scope.height : this.scope.width;
      let scope=c.createRadialGradient(
        this.scope.width / 2, this.scope.height / 2,
        limit/2 - 50,
        this.scope.width / 2, this.scope.height / 2,
        limit/2 - 30
        );
      scope.addColorStop(0, 'transparent');
      scope.addColorStop(1, 'black');

      // Fill with gradient
      c.fillStyle = scope;
      
      c.fillRect(0, 0, this.scope.width, this.scope.height);
    }
  }
}
</script>

<style lang="scss" scoped>
#scope {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  pointer-events: none;
}
</style>

<style>

</style>