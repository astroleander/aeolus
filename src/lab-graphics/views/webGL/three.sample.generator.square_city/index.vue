<!--
  @author: Astroleander
  @created: 2019/08/22
  @origin/inspiration: null
  @description: TODO
-->
<template>
  <article class='fullscreen' id='container'>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import Parser from './SquareCItyMapParser'
export default {
  data() { 
    return {
      camera: null,
      scene: null,
      renderer: null,
      lights: [],
      helpers: [], 
    }
  }, 
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      this.initRenderer();
      this.initCamera();
      this.initScene();

      this.createObjects();

      this.render();
    },
    initRenderer() {
      const container = document.getElementById('container');
      this.renderer = new THREE.WebGLRenderer({antialias:true});
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);

      container.appendChild(this.renderer.domElement);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(/*fov */45, /*aspect */window.innerWidth / window.innerHeight, /*near */10, /*far */20000);
      this.camera.position.set(0, -1500, 3000);
      new OrbitControls(this.camera, this.renderer.domElement);
    },
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xfffafa);
      /** lights
       */
      this.createAmbientLight();
      /** helpers
       * 
       */
      const gridHelper = new THREE.GridHelper(20000, 500);
      gridHelper.geometry.rotateX( Math.PI / 2 );
      this.helpers.push(gridHelper);
      const axesHelper = new THREE.AxesHelper(5000);
      this.scene.add(gridHelper);
      this.scene.add(axesHelper);
      /** fog
       * 
       */
      const fog = new THREE.FogExp2(0xfffafa, 0.00020);
      this.scene.fog = fog;
    },
    createObjects() {
      const shapes = Parser();
      console.log(shapes)
      let item;
      const group = new THREE.Group();
      for (const idx in shapes) {
        item = shapes[idx];
        const padding = 50;
        const depth = (0.2 + 0.8 * Math.random()) * 3000;
        const tmp = new THREE.Mesh(
          new THREE.BoxBufferGeometry(
            item.width - padding, 
            item.height - padding, 
            depth
            ),
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            flatShading: true,
          })
        )
        tmp.position.set(item.center[0], item.center[1], depth / 2)
        group.add(tmp)
      }
      console.log(group)
      this.scene.add(group)
    },
    render() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    createAmbientLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      this.scene.add(ambientLight);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>