<!--
  @author: Astroleander
  @created: 2019/09/02
  @origin/inspiration: null
  @description: Try create a building division by floor
-->
<template>
  <article class="fullscreen">
    <div id='container'></div>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

let SPACE_SIZE = 2000, DIVISIONS = 10;
let FLOOR = 5;

export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
    
      axes: [],
      wave: null,
      wave2: null,
      coin: 1,
      coin2: 1.5
    }
  },
  mounted() {
    this.initialCanvas();
    this.render();
  },
  methods: {
    initialCanvas() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(innerWidth, innerHeight);
      let element = document.getElementById('container');
      element.appendChild(this.renderer.domElement);

      let fov = 45, aspect = window.innerWidth / window.innerHeight, near = 5, far = 8200; 
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(800, 800, -600);
      new OrbitControls(this.camera, this.renderer.domElement)

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x333333);

      for (let index = -(SPACE_SIZE/2); index <= SPACE_SIZE/2; index += SPACE_SIZE) {
        let zHelper = new THREE.GridHelper(SPACE_SIZE * 1.2, 1, 0x33EEFF, 0x33EEFF);
        zHelper.position.set(0, index, 0);
        this.scene.add(zHelper);
      }

      this.wave = new THREE.GridHelper(SPACE_SIZE, 1, 0x33EEFF, 0x33EEFF);
      this.wave2 = new THREE.GridHelper(SPACE_SIZE, 1, 0x33EEFF, 0x33EEFF);
      this.wave.position.set(0, -(SPACE_SIZE/2), 0);
      this.wave2.position.set(0, -(SPACE_SIZE/2), 0);
      this.scene.add(this.wave);
      this.scene.add(this.wave2);

      for (let index = -(SPACE_SIZE/2); index <= SPACE_SIZE/2; index += (SPACE_SIZE/FLOOR)) {
        let zHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS, 0x33EEFF, 0x33EEFF);
        zHelper.position.set(0, index, 0);
        this.scene.add(zHelper);

        let geometry = new THREE.PlaneBufferGeometry(SPACE_SIZE, SPACE_SIZE);
        let material = new THREE.MeshBasicMaterial({
          color: 0x3f7b9d,
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
        });
        let plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, index, 0);
        plane.rotateX(Math.PI / 2);
        this.scene.add(plane);
      }
    },
    render() {
      this.coin < 2? this.coin += 0.01 : this.coin = 1;
      this.coin2 < 2? this.coin2 += 0.01 : this.coin2 = 1;
      this.wave.scale = new THREE.Vector3(this.coin, this.coin, this.coin);
      this.wave2.scale = new THREE.Vector3(this.coin2, this.coin2, this.coin2);
      // console.log(this.wave.scale)
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    }
  }
}
</script>

<style>

</style>
