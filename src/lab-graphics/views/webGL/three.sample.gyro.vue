<template>
  <article class="fullscreen">
    <section class="float right">
      <button @click="change(1)"> + </button>
      <button @click="change(2)"> - </button>
    </section>
    <div id="container"></div>
  </article>
</template>

<script>
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

export default {
  data: function() {
    return {
      camera: null,
      scene: null,
      renderer: null,

      detail: 1,
      mesh: null,
    }
  },
  mounted: function() {
    this.initWebGLCanvas();

    let geometry = new THREE.OctahedronBufferGeometry(100, this.detail);
    let material = new THREE.MeshToonMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
    this.scene.add(mesh);
    this.render();
  },
  methods: {
    initWebGLCanvas() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
      this.renderer.setSize(innerWidth, innerHeight);
      let el = document.getElementById('container');
      el.appendChild(this.renderer.domElement);

      let fov = 45, aspect = window.innerWidth / window.innerHeight, near = 10, far = 2000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(400, -200, 400);
      new OrbitControls(this.camera, this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x333333);
      let ambientLight = new THREE.AmbientLight(0x33eeff, 0.2);
      this.scene.add(ambientLight);
      let spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(400, 200, 400);
      spotLight.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(spotLight);
    },
    change(to) {
      to === 2 ?  (this.detail > -1 ? this.detail --  : '') : (this.detail < 5 ? this.detail++ : '');
      let geometry = new THREE.OctahedronBufferGeometry(100, this.detail);
      this.scene.remove(this.mesh);
      let material = new THREE.MeshToonMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      this.mesh = mesh;
      this.scene.add(mesh);
    },
    render() {
      requestAnimationFrame(this.animate);
    },
    animate(time) {
      this.mesh.rotateX(time * 0.00002);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    }

  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 5px 20px;
  font-size: 2em;
}
</style>

<style>

</style>