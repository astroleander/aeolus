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
      this.geometries = [];
      /**
       * BoxBufferGeometry
       * width : Float,
       * height : Float,
       * depth : Float,
       * widthSegments : Integer,
       * heightSegments : Integer,
       * depthSegments : Integer
       */
      let box = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
      this.geometries.push(box);

      /**
       * CircleBufferGeometry
       * radius : Float,
       * segments : Integer,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let circle = new THREE.CircleBufferGeometry(this.size / 2);
      this.geometries.push(circle);

      /**
       * ConeBufferGeometry
       * radius : Float,
       * height : Float,
       * radialSegments : Integer,
       * heightSegments : Integer,
       * openEnded : Boolean,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let cone = new THREE.ConeBufferGeometry(this.size / 2, this.size);
      this.geometries.push(cone);

      /**
       * CylinderBufferGeometry
       * radiusTop : Float,
       * radiusBottom : Float,
       * height : Float,
       * radialSegments : Integer,
       * heightSegments : Integer,
       * openEnded : Boolean,
       * thetaStart : Float,
       * thetaLength : Float
       */
      let cylinder = new THREE.CylinderBufferGeometry(this.size / 2, this.size / 2, this.size);
      this.geometries.push(cylinder);

 

      /**
       * ExtrudeBufferGeometry
       * shapes : Array
       * options : Object
       * - curveSegments : int. Number of points on the curves. Default is 12.
       * - steps : int. Number of points used for subdividing segments along the depth of the extruded spline. Default is 1.
       * - depth : float. Depth to extrude the shape. Default is 100.
       * - bevelEnabled : bool. Apply beveling to the shape. Default is true.
       * - bevelThickness : float. How deep into the original shape the bevel goes. Default is 6.
       * - bevelSize : float. Distance from the shape outline that the bevel extends. Default is bevelThickness - 2.
       * - bevelOffset : float. Distance from the shape outline that the bevel starts. Default is 0.
       * - bevelSegments : int. Number of bevel layers. Default is 3.
       * - extrudePath : THREE.Curve. A 3D spline path along which the shape should be extruded.
       * - UVGenerator : Object. object that provides UV generator functions
       */
      let extrudeShape = new THREE.Shape();
      // 这玩意儿是平面的，只有 x 和 y
      extrudeShape.moveTo(0, this.size / 2);
      // extrudeShape.bezierCurveTo(0, 0, 0, 0, this.size / 2, 0);
      // extrudeShape.bezierCurveTo(0, 0, 0, 0, 0, -this.size / 2);
      // extrudeShape.bezierCurveTo(0, 0, 0, 0, -this.size / 2, 0);
      // extrudeShape.bezierCurveTo(0, 0, 0, 0, 0, this.size / 2);
      extrudeShape.lineTo(this.size / 2, this.size / 2);
      extrudeShape.lineTo(this.size / 2, 0);
      extrudeShape.lineTo(0, -this.size / 2);
      extrudeShape.lineTo(-this.size / 2, 0);
      extrudeShape.lineTo(0, this.size / 2);

      let extrude = new THREE.ExtrudeBufferGeometry(extrudeShape, {
        steps: 2,
        depth: this.size / 2,
        bevelEnabled: true,
        bevelThickness: this.size / 4,  // 斜角的厚度 // 现在总厚度 = depeth + 2 * bevelThickness
        bevelSize: this.size / 4,       // 斜角的大小
        bevelOffset: 0,                 // 斜角起点到 shape outline 的距离
        bevelSegments: 2,               // 斜角用几个面绘制，数目越大斜角越圆润
      })
      this.geometries.push(extrude);

      /**
       * LatheBufferGeometry
       * points : Array, 
       * segments : Integer,
       * phiStart : Float,
       * phiLength : Float
       * points - Array of Vector2s. The x-coordinate of each point must be greater than zero.
       * segments — the number of circumference segments to generate. Default is 12.
       * 可以理解为在平面上的一四象限画线, 然后把这根线转一圈(转圈按照segments)
       */

      /**
       * DodecahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float,
       * detail : Integer,
       * detail Default is 0.
       * Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
       */
      let dodecahedron = new THREE.DodecahedronBufferGeometry(this.size / 2);
      this.geometries.push(dodecahedron);
      /**
       * IcosahedronBufferGeometry
       * @extends PolyhedronBufferGeometry
       * radius : Float,
       * detail : Integer,
       * detail Default is 0.
       * Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
       */
      let icosahedron = new THREE.IcosahedronBufferGeometry(this.size / 2);
      this.geometries.push(icosahedron);
    },
    locateGeometries() {
      let material = new THREE.MeshLambertMaterial({ color: 0x21ccee, side: THREE.DoubleSide});
      let locatedGeometries = xyCalculator(this.geometries, this.size, 2 * this.size);
      console.log(locatedGeometries)
      locatedGeometries.coordinates.forEach(geometry => {
        const mesh = new THREE.Mesh(geometry.obj, material);
        mesh.position.set(geometry.x, 0, geometry.y);
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
      light.lookAt(new THREE.Vector3(0, 0, 0));
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
      plane.position.y = -10;
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
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
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
    },
    updateParams() {
      /**
       * Geometry 的参数一旦确定无法重新设置，我们实质上是重新绘制一遍图形
       */
      this.meshes.forEach(mesh => {
        this.scene.remove(this.meshes);
      });
      this.invokeGeometries();
      this.locateGeometries();
    }
  }
}
</script>

<style scoped lang='scss'>
</style>