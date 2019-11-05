<template>
  <section id='container'>
    <canvas ref='scope' id='scope' v-show="onScope"></canvas>
    <p v-show="!onScope" style="width: 50%; position: fixed; top: 30%; left: 50%; right: 50%;">Press Right Mouse to Open Scope</p>
  </section>
</template>

<script>
import normal from '@/modules/utils/mixin.template.three.normal.js'
import * as THREE from 'three'
import { Vector3 } from 'three';

export default {
  data() {
    return {
      scope: null,
      onScope: false,
      limit: 0,
      /**
       * 因为要每一帧都能拿到 cube
       * 
       * 像这样我们需要在之后获取的对象, 需要存放在可达的地方, 
       * 在 vue 我们存放在 data, react 我们存放在 state, pure js 中我们至少应当存放在公共所属对象下,
       * 
       */
      cubes: []
    }
  },
  mixins: [normal],
  mounted() {
    this.setRenderTarget(document.getElementById('container'));
    this.drawScope();
    this.drawLines();
    /**
     * 事件注册在具体的 DOM 节点上, 可以在销毁时方便一点自动处理掉
     */
    document.getElementById('container').addEventListener('mousedown', this.mouse_listener);
    document.getElementById('container').addEventListener('mouseup', this.mouse_listener);
    /**
     * 生成一堆 cubes
     */
    this.generatorCubes(15);
    /**
     * animate 函数是一个起始符号,
     * animate 会通过 requestAnimationFrame 请求帧更新,
     * 并且向 requestAnimationFrame 注入结束回调调用自身,
     * 开始更新周期 
     */
    this.animate();
  },
  methods: {
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
    },
    mouse_listener(e) {
      /**
       * 模拟 FPS 游戏的右键开镜, 注意我们需要刷新渲染才行
       */
      console.log(e);
      if (e.type === 'mousedown' && e.button === 2) {
        this.onScope = true;
        // if (this.onScope === true) {
        //   this.drawScope();
        //   this.drawLines();
        // };
        this.camera.zoom = 7;
        this.camera.updateProjectionMatrix();
        this.render();
      } 
      if (e.type === 'mouseup' && e.button === 2) {
        this.onScope = false;
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.render();
      }
    },
    generatorCubes(count = 5) {
      while(count > 0) {
        let location = [-1000 + Math.random() * 2000, -1000 + Math.random() * 2000];
        let len = 25 + Math.random() * 50;
        let height = -100 + 300 * Math.random();
        const geometry = new THREE.BoxBufferGeometry(len, len, len);
        // const material = new THREE.MeshNormalMaterial();
        let material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.position.set(location[0], height, location[1]);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        this.scene.add(mesh);
        mesh['attributes'] = {};
        mesh.attributes['direction'] = Math.floor(Math.random() * 3);
        this.cubes.push(mesh);
        count--;
      }
      this.render()
    },
    rotateCube(cube, t) {
      let r = [cube.rotation.x, cube.rotation.y, cube.rotation.z];
      // r[direction] 
      r[cube.attributes.direction] = t / 5000 * Math.PI * 2;
      cube.rotation.set(...r) 
    },
    animate(t) {
      this.cubes.forEach(cube => {
        this.rotateCube(cube, t);
      })
      this.render();
      requestAnimationFrame(this.animate);
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