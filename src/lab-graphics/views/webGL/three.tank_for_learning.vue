<template>
  <article class="fullscreen">
    <div id='container'>

    </div>
  </article>
</template>

<script>
import * as THREE from 'three'

export default {
  data() { 
    return {
      scene: null,
      camera: null,
    } 
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const container = document.getElementById('container');
      container.style
      /**
       * something we need to build
       */
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("rgb(125, 50, 50)");
      this.scene.add(new THREE.AmbientLight(0xffffff));

      this.camera = new THREE.PerspectiveCamera(50, window.innerHeight / window.innerWidth, 0.1, 1000);
      // this.camera.position.set(0, 0, 10);

      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      container.append(renderer.domElement);

      renderer.render(this.scene, this.camera);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>