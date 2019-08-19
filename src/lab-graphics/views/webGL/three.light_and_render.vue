<!--
  @author: Astroleander
  @created: 2019/08/19
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

export default {
  data() { 
    return {
      element: null,
      camera: null,
      scene: null,
      renderer: null,
    } 
  },
  mounted() {
    this.MakeInitGreatAgain();
    this.MakeResizeEventAgain();
  },
  methods: {
    MakeInitGreatAgain() {
      this.MakeRendererGreatAgain();
      this.MakeCanvasGreatAgain();
      this.MakeCameraGreatAgain();
      this.MakeSceneGreatAgain();
      this.MakeMeshGreatAgain();
      this.MAGA();
      // requestAnimationFrame(this.MAGA);
    },
    MakeCanvasGreatAgain() {
      this.element = document.getElementById('container');
      this.element.appendChild(this.renderer.domElement);      
    },
    MakeRendererGreatAgain() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // this.renderer.alpha.enable = true;
      this.renderer.shadowMap.enable = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    },
    MakeCameraGreatAgain() {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
      this.camera.position.set(0, 20, 16);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    MakeLightGreatAgain() {
      const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      this.scene.add(light);
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      this.scene.add( directionalLight );
    },
    MakeSceneGreatAgain() {
      this.scene = new THREE.Scene();
      this.MakeLightGreatAgain();
    },
    MakeMeshGreatAgain() {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhysicalMaterial({color:0xdd2121});
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh)
    },
    MakeResizeEventAgain() {
      window.addEventListener('resize', e => {
        console.log('[trigger] resize');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      })
    },
    MAGA() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.MAGA)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>