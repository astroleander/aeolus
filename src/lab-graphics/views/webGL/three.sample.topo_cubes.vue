<!--
  @author: Astroleander
  @created: 2019/09/02
  @origin/inspiration: null
  @description: Try create a space to contain topo
-->
<template>
  <article class="fullscreen">
    <div id='container'></div>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

let SPACE_SIZE = 1000, DIVISIONS = 5;
let CUBE_SIZE = 50;

export default {
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      /**
       * - lines
       * - cubes
       * - parent cube
       */
      topo: {},
      /**
       * - surroundings
       */
      trils: [],
      /**
       * - axes line
       */
      axes: [],
      heightCount: 0,
      upwards: true,
    }
  },
  mounted() {
    this.initialCanvas();
    this.createCubes();
    this.createVertexCube();
    this.createLines();
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
      let zBaseHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS, 0x33EEFF, 0x666666);
      let xBaseHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS, 0x33EEFF, 0x666666);
      let yBaseHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS, 0x33EEFF, 0x666666);
      xBaseHelper.rotateX(Math.PI / 2);
      yBaseHelper.rotateZ(Math.PI / 2);
      this.scene.add(zBaseHelper);
      this.scene.add(xBaseHelper);
      this.scene.add(yBaseHelper);

      for (let index = -(SPACE_SIZE/2); index <= SPACE_SIZE/2; index += (SPACE_SIZE/DIVISIONS)) {
        if (index === 0) continue;
        let zHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS);
        let xHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS);
        let yHelper = new THREE.GridHelper(SPACE_SIZE, DIVISIONS);
        zHelper.position.set(0, index, 0);
        xHelper.rotateX(Math.PI / 2);
        xHelper.position.set(0, 0, index);
        yHelper.rotateZ(Math.PI / 2);
        yHelper.position.set(index, 0);
        this.scene.add(zHelper);
        this.scene.add(xHelper);
        this.scene.add(yHelper);
      }
    },
    createCubes() {
      let cube_row = 4, cube_col = 2; // 4 * 2
      let margin_row = 10, margin_col = 50;
      let cubes = [];
      let group = new THREE.Group();
      for (let i = 0; i < cube_row; ++i) {
        for (let j = 0; j < cube_col; ++j) {
          let cube = {
            i, j,
            x: -(CUBE_SIZE * cube_row + margin_row * (cube_row - 1)) / 2 + i * (CUBE_SIZE + margin_row) + CUBE_SIZE / 2,
            z: -(CUBE_SIZE * cube_col + margin_col * (cube_col - 1)) / 2 + j * (CUBE_SIZE + margin_col) + CUBE_SIZE / 2,
          }
          let geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
          let material = new THREE.MeshNormalMaterial();
          let mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(cube.x, 0, cube.z);
          cubes.push(mesh);
          group.add(mesh);
        }
      }
      // console.log(cubes);
      // console.log(group);
      this.scene.add(group);
      this.$set(this.topo, 'group', group);
      this.$set(this.topo, 'cubes', cubes);
    },
    createVertexCube() {
      let vertex = new THREE.Vector3(this.topo.group.position.x, this.topo.group.position.y, this.topo.group.position.z);
      vertex.y += 300;
      let geometry = new THREE.OctahedronBufferGeometry(CUBE_SIZE, 0);
      let material = new THREE.MeshNormalMaterial();
      let vertexCube = new THREE.Mesh(geometry, material);
      vertexCube.position.set(vertex.x, vertex.y, vertex.z);
      this.scene.add(vertexCube)
      console.log('[vertexCube]',vertexCube)
      this.$set(this.topo, 'vertex', vertexCube);
    },
    createLines() {
      let material = new THREE.LineBasicMaterial({
        color: 0x33eeff,
        linewidth: 20,
        });
      let lines = [];
      let margin_general = 5;
      for (let index = 0; index < this.topo.cubes.length; index++) {

        let cube_top_surface = new THREE.Vector3(
          this.topo.cubes[index].position.x, 
          this.topo.cubes[index].position.y + CUBE_SIZE / 2 + margin_general, 
          this.topo.cubes[index].position.z
          );
        let oct_bottom_vertex =  new THREE.Vector3(
          this.topo.vertex.position.x, 
          this.topo.vertex.position.y - CUBE_SIZE - margin_general, 
          this.topo.vertex.position.z
          );

        this.topo.cubes[index].position
        let line = new THREE.LineCurve3(
          oct_bottom_vertex, 
          cube_top_surface
          );
        let geometry = new THREE.TubeBufferGeometry(line, 20, 2, 8, true);
        let material = new THREE.MeshNormalMaterial();
        let mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh);
        lines.push(mesh)
      }
      this.$set(this.topo, 'line', lines);
    },
    render() {
      this.heightCount ++;
      this.upwards ? this.topo.vertex.position.y ++: this.topo.vertex.position.y --; 
      if (this.heightCount > 20) {
        this.heightCount = 0;
        this.upwards = !!! this.upwards
      }
      
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render)
    }
  }
}
</script>

<style>

</style>
