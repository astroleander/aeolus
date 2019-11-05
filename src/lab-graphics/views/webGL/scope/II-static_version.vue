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
      scope: null,
      limit: 0
    }
  },
  mixins: [normal],
  mounted() {
    this.setRenderTarget(document.getElementById('container'));
    /**
     * 上一个版本的瞄准镜太难看了，我们来优化一下
     * 抽出两个函数，一个画瞄准镜，另一个画镜头
     */
    this.drawScope();
    this.drawLines();
  },
  methods: {
    /**
     * 画一个渐变圈来模拟 Scope
     */
    drawScope() {
      this.scope = document.getElementById('scope');
      this.scope.width = window.innerWidth;
      this.scope.height = window.innerHeight;

      let c = this.scope.getContext('2d');
      let limit = this.scope.width > this.scope.height ? this.scope.height : this.scope.width;
      let scope=c.createRadialGradient(
        this.scope.width / 2, this.scope.height / 2,
        limit/2 - 20,
        this.scope.width / 2, this.scope.height / 2,
        limit/2
        );
      scope.addColorStop(0, 'transparent');
      scope.addColorStop(0.5, 'black');
      scope.addColorStop(0.7, 'black');
      scope.addColorStop(1, '#212121');

      // Fill with gradient
      c.fillStyle = scope;
      c.fillRect(0, 0, this.scope.width, this.scope.height);
      
      /** 我们需要为画线存储一些变量 */
      this.limit = limit / 2;
      this.center = [this.scope.width / 2, this.scope.height / 2];
    },
    drawLines() {
      let c = this.scope.getContext('2d');
      c.fillStyle = 'black'
      c.fillRect(this.center[0]- 1.5, this.center[1]-1, 3, 3);
      // 内部细线
      let start = 10;
      let len = this.limit - 60;
      c.lineWidth = 1;
      c.strokeStyle = 'black';
  
      c.beginPath();
      c.moveTo(this.center[0], this.center[1] - len);
      c.lineTo(this.center[0], this.center[1] - start);
      c.stroke();

      c.beginPath();
      c.moveTo(this.center[0] - len, this.center[1]);
      c.lineTo(this.center[0] - start, this.center[1]);
      c.stroke();

      c.beginPath();
      c.moveTo(this.center[0] + len, this.center[1]);
      c.lineTo(this.center[0] + start, this.center[1]);
      c.stroke();


      // 外部粗线
      c.lineWidth = 3;
      let border = len + 50;
      c.beginPath();
      c.moveTo(this.center[0], this.center[1] + border);
      c.lineTo(this.center[0], this.center[1] + len / 2);
      c.stroke();

      c.beginPath();
      c.moveTo(this.center[0] + border, this.center[1]);
      c.lineTo(this.center[0] + len / 2, this.center[1]);
      c.stroke();

      c.beginPath();
      c.moveTo(this.center[0] - border, this.center[1]);
      c.lineTo(this.center[0] - len / 2, this.center[1]);
      c.stroke();
      
      c.beginPath();
      c.moveTo(this.center[0], this.center[1] - border);
      c.lineTo(this.center[0], this.center[1] - len / 2);
      c.stroke();
      // 水平刻度线
      c.lineWidth = 1;
      let gap = 25;
      for (let i = 25, j = 1; i < len / 2 - 25; i += 25, j += 1) {
        c.beginPath();
        c.moveTo(this.center[0] + i, this.center[1] + start / 2 + j);
        c.lineTo(this.center[0] + i, this.center[1] - start / 2 - j);
        c.stroke();
        c.beginPath();
        c.moveTo(this.center[0] - i, this.center[1] + start / 2 + j);
        c.lineTo(this.center[0] - i, this.center[1] - start / 2 - j);
        c.stroke();
      }

      // 下侧莫名酷炫线条
      let current = start, each = 10;
      let bias = [5, 15];
      while (current < len / 2 - 10) {
        c.beginPath();
        c.moveTo(this.center[0] + bias[0], this.center[1] + current);
        c.lineTo(this.center[0] + bias[1], this.center[1] + current + each);
        c.stroke();
        
        c.beginPath();
        c.moveTo(this.center[0] - bias[0], this.center[1] + current);
        c.lineTo(this.center[0] - bias[1], this.center[1] + current + each);
        c.stroke();
        current += each;
      }
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