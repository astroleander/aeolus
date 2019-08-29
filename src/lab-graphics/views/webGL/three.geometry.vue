<!--
  @author: Astroleander
  @created: 2019/08/27
  @origin/inspiration: null
  @description: Test Geometry
-->
<template>
  <article class='fullscreen' id='container'>
  </article>
</template>

<script>
import * as THREE from 'three'
import xyCalculator from '@/modules/utils/xy_locate_calculator'
import OrbitControls from 'three-orbitcontrols'
import { Vector3 } from 'three';

const origin = new THREE.Vector3(0, 0, 0)

export default {
  data() {
    return {
      camera: null,
      size: 10,
      widthSegments: 5,
      heightSegments: 1,
      depthSegments: 1,
      geometries: [],
      meshes: [],
      studio: {},
      count: 0,
    }
  },
  mounted() {
    this.invokeGeometries();
    
    this.initRenderer();
    this.initCamera();
    this.initScene();

    this.buildStudio();
    this.locateGeometries();

    this.render();
  },
  methods: {
    invokeGeometries() {
      /**
       * BoxBufferGeometry
       * width : Float, 
       * height : Float, 
       * depth : Float, 
       * widthSegments : Integer, 
       * heightSegments : Integer, 
       * depthSegments : Integer
       */
      let box = new THREE.BoxBufferGeometry(this.size, 2 * this.size, this.size);
      this.geometries.push(box);

      /**
       * CircleBufferGeometry
       * radius : Float,
       * segments : Integer,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let circle = new THREE.CircleBufferGeometry(this.size);
      this.geometries.push(circle);
    },
    locateGeometries() {
      let material = new THREE.MeshLambertMaterial({ color: 0x21ccee, side: THREE.DoubleSide});
      let locatedGeometries = xyCalculator(this.geometries);
      console.log(locatedGeometries)
      locatedGeometries.coordinates.forEach(geometry => {
        const mesh = new THREE.Mesh(geometry.obj, material);
        mesh.position.set(geometry.x, geometry.y, 0);
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.meshes.push(mesh);
      })
    },
    // set light, plane, helper, etc.
    buildStudio() {
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      
      let light = new THREE.SpotLight(0xffffff);
      light.angle = 1.05;
      light.intensity = 1.2;
      light.penumbra = 1;
      light.decay = 2;

      light.position.set(2000, 0, 0);
      light.lookAt(new Vector3(0, 0, 0));
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 2000;

      this.scene.add(light);
      this.$set(this.studio, 'light', light)

      let geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 32, 32 );
      geometry.rotateX(Math.PI / 2);
      let material = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
      let plane = new THREE.Mesh( geometry, material );
      plane.receiveShadow = true;
      this.scene.add( plane );
    },
    initCamera() {
      let fov = 60, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 4000; 
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 30, 50);
      this.camera.lookAt(origin);
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x212121);
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      let element = document.getElementById('container');
      element.appendChild(this.renderer.domElement);     
    },
    render() {
      this.count += 5;
      const t = this.count / 360;
      const r = 300;

      let lx = r * Math.cos(t);
      let ly = r * Math.sin(t);
      
      this.renderer.render(this.scene, this.camera);
      this.studio.light.position.set(lx, 70, ly);
      this.studio.light.lookAt(origin);
      
      requestAnimationFrame(this.render);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>