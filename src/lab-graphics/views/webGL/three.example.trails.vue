<!--
  @author: Astroleander
  @created: 2019/09/10
  @origin/inspiration: https://github.com/mrdoob/three.js/blob/master/examples/webgl_trails.html
  @description: draw object with trail lines
-->
<template>
  <article class='fullscreen' id='container'>
  </article>
</template>

<script>
import * as THREE from 'three'
export default {
  data() { return {
    camera: null,
    scene: null,
    renderer: null,
    colorArray: [ new THREE.Color( 0xff0080 ), new THREE.Color( 0xffffff ), new THREE.Color( 0x8000ff ) ],
    positions: [],
    colors: []
  } },
  mounted() {
    this.initCanvas();
    this.initTrails();
    this.render();
  },
  methods: {
    initCanvas() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      {
        let fov = 60, aspect = width / height, near = 10, far = 4000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      }
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(width, height);
      document.getElementById('container').appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      this.scene.add(ambientLight);
    },
    initTrails() {
      
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    }
  },
}
</script>

<style scoped lang='scss'>
</style>