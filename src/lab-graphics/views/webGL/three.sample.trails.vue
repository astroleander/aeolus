<!--
  @author: Astroleander
  @created: 2019/09/04
  @origin/inspiration: null
  @description: make trails
-->
<template>
  <article class='fullscreen'>
    <div id="container"></div>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

export default {
  data() {
     return {
       renderer: null,
       camera: null,
       scene: null,
       points: [],
     }
  },
  mounted() {
    this.createCanvas();
  },
  methods: {
    createCanvas() {
      // 1. create renderer
      // 2. create camera
      // 3. create sence

      // 1. create renderer
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
      let el = document.getElementById('container');
      el.appendChild(this.renderer.domElement);

      // 2. create camera
      let height = window.innerHeight, width = window.innerWidth;
      let fov = 45, aspect = width / height, near = 10, far = 1000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(800, -800, 600);
      new OrbitControls(this.camera, this.el);
      
      // 3. create sence
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x333333);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>