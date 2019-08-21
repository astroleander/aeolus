<!--
  @author: Astroleander
  @created: 2019/08/19
  @origin/inspiration: null
  @description: TODO
-->
<template>
  <article class='fullscreen' id='container'>
    <section class='float right'>
      <button class='menu'
        v-for='name in Object.keys(helpers)' :key="name"
        @click="e => ToggleHelperVeryBad(name, e)"
        >
        {{name}}
      </button>
      <button class='menu sp' @click="e => ToggleTotallyHelperVeryBad(e)">↖↘</button>
    </section>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MeshPhysicalMaterial, Group } from 'three';

function generateGeometry() {
  const ret = []
  let x = 4, y;
  for (; x > 0; x--) {
    y = 4; 
    for (; y> 0; y--){
      ret.push([-15 + 6 * x, -15 + 6 * y, -12 + 2 * y + 2 * x])
    }
  }
  return ret
}
export default {
  data() { 
    return {
      element: null,
      camera: null,
      scene: null,
      renderer: null,
      shapes: [], 
      lights: {},
      helpers: {},
      skeleton: null,
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
      // |- MakeLightGreatAgain();
      
      this.MakeMeshGreatAgain();
      // |- RussiaSkeletonInterference();
      // |- RussiaSkinInterference();

      this.MakeHelperGreatAgain();
      // |- FakeAxesHelper();
      // |- FakeBoxHelper();
      // |- FakeBox3Helper();
      // |- 
      // |- 
      // |-
      // TODO: PositionalAudioHelper
      // TODO: PlaneHelper
      // 

      this.MAGA();
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
      this.camera.position.set(0, 0, 15);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    MakeSceneGreatAgain() {
      this.scene = new THREE.Scene();
      // this.scene.fog = new THREE.Fog( 0x040306, 10, 300 );

      this.MakeLightGreatAgain();
    },
    MakeLightGreatAgain() {
      let sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
      this.lights.pointLight = new THREE.PointLight( 0x33ddff, 1, 100 );
      this.lights.pointLight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: 0x33ddff })));
      this.lights.pointLight.position.set( 0, 0, -100 );
      this.scene.add(this.lights.pointLight);

      /** 
       * @constructor THREE.HemisphereLight(skyColor, groundColor, intensity)
       *     @param {Integer} skyColor
       *     @param {Integer} groundColor
       *     @param {Float} Intensity 
       */
      const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      hemisphereLight.castShadow = true;
      hemisphereLight.color.setHSL( 0.6, 1, 0.6 );
      hemisphereLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemisphereLight.position.set( 0, 50, 0 );      
      this.scene.add(hemisphereLight);
      this.lights.hemisphereLight = hemisphereLight;

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      this.scene.add(directionalLight);
      this.lights.directionalLight = directionalLight;

      const spotLight = new THREE.SpotLight(0xff0000, 2);
      spotLight.position.set(-20, -20, 120);
      spotLight.castShadow = true;
      spotLight.distance = 209;
      spotLight.decay = 1;
      spotLight.angle = 0.2;
      this.lights.spotLight = spotLight
      this.scene.add(spotLight);

      const rectAreaLight = new THREE.RectAreaLight(0x0033bb, 11.0, 10 ,10);
      rectAreaLight.position.set(-5, -10, -5);
      rectAreaLight.lookAt(0, 0, 0);
      this.lights.rectAreaLight = rectAreaLight;
      this.scene.add(this.lights.rectAreaLight);
    },
    MakeHelperGreatAgain() {
      this.FakeBoxHelper();
      this.FakeBox3Helper();
      this.FakeFaceNormalsHelper();
      this.FakeVertexNormalsHelper();

      this.FakeArrowHelper();
      this.FakeAxesHelper();
      this.FakeGridHelper();
      this.FakePolarGridHelper();
      this.FakePlaneHelper();

      this.FakeHemisphereLightHelper(this.lights.hemisphereLight);
      this.FakeCameraHelper(this.lights.spotLight);
      this.FakeSpotLightHelper(this.lights.spotLight);
      this.FakeDirectionalLightHelper(this.lights.directionalLight);
      this.FakePointLightHelper(this.lights.pointLight);
      this.FakeRectAreaLightHelper(this.lights.rectAreaLight);

      this.FakeSkeletonHelper();


      // 强制刷新 helpers
      this.helpers = Object.assign({}, this.helpers);
      // 这个不行, 会加一个 undefined 进去
      // this.$set(this.helpers);
    },
    FakeArrowHelper() {
      let dir = new THREE.Vector3( -1, -1, -1 );
      // normalize the direction vector (convert to vector of length 1)
      dir.normalize();

      let origin = new THREE.Vector3( 0, 0, 0 );
      let length = 128;
      let hex = 0xffff00;

      this.helpers.ArrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
      this.scene.add( this.helpers.ArrowHelper );
    },
    FakeAxesHelper() {
      this.helpers.AxesHelper = new THREE.AxesHelper(256);
      this.scene.add(this.helpers.AxesHelper);
    },
    FakeBoxHelper() {
      const sphere = new THREE.SphereGeometry(8);
      const object = new THREE.Mesh(sphere, new THREE.MeshPhongMaterial(0xff0000));
      object.position.set(-24, 0, 0)
      this.helpers.BoxHelper = new THREE.BoxHelper(object, 0xffff00);
      this.scene.add(object); 
      this.scene.add(this.helpers.BoxHelper); 
    },
    FakeBox3Helper() {
      const box = new THREE.Box3();
      box.setFromCenterAndSize(new THREE.Vector3(9, 9, 9), new THREE.Vector3(18, 18, 18));
      this.helpers.Box3Helper = new THREE.Box3Helper(box, 0xff00ff);
      // this.scene.add(box); // invisible 
      this.scene.add(this.helpers.Box3Helper);  
    },
    FakePlaneHelper() {
      let plane = new THREE.Plane(new THREE.Vector3(-10, -10, 0), 1);
      this.helpers.PlaneHelper = new THREE.PlaneHelper(plane, 4, 0xffff00);
      this.scene.add(this.helpers.PlaneHelper);
    },
    FakeVertexNormalsHelper() {
      const geometry = this.shapes.children[0];
      this.helpers.VertexNormalsHelper = new THREE.VertexNormalsHelper(geometry, 1, 0xffff00, 1000);
      this.scene.add(this.helpers.VertexNormalsHelper);
    },
    FakeCameraHelper(spotLight) {
      this.helpers.CameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
      this.scene.add(this.helpers.CameraHelper);
    },
    FakeSpotLightHelper(spotLight) {
      this.helpers.SpotLightHelper = new THREE.SpotLightHelper(spotLight);
      this.scene.add(this.helpers.SpotLightHelper);
    },
    FakeDirectionalLightHelper(directionalLight) {
      this.helpers.DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 25);
      this.scene.add(this.helpers.DirectionalLightHelper);
    },
    FakeFaceNormalsHelper() {
      const geometry = new THREE.BoxGeometry(8, 8, 8, 2, 2, 2);
      const material = new THREE.MeshBasicMaterial( {color: 0xffbb88});
      const box = new THREE.Mesh(geometry, material);
      box.position.set(24, 0, 0);

      // 最后一个参数干啥用的，linewidth? 没用啊
      this.helpers.FaceNormalsHelper = new THREE.FaceNormalsHelper(box, 6, 0x00ff00, 1)
      this.scene.add(box);
      this.scene.add(this.helpers.FaceNormalsHelper);
    },
    FakeGridHelper() {
      let size = 100;
      let divisions = 25;
      this.helpers.GridHelper = new THREE.GridHelper(size, divisions)
      this.scene.add(this.helpers.GridHelper);
    },
    FakePolarGridHelper() {
      let radius = 50 * 1.414;
      let radials = 4;
      let circles = 9;
      let divisions1 = 8;
      let divisions2 = 128;

      this.helpers.PolarGridHelperDivision8 = new THREE.PolarGridHelper(radius, radials, circles, divisions1)
      this.helpers.PolarGridHelperDivision128 = new THREE.PolarGridHelper(radius, radials, circles, divisions2)
      this.scene.add(this.helpers.PolarGridHelperDivision8);
      this.scene.add(this.helpers.PolarGridHelperDivision128);
    },
    FakeHemisphereLightHelper(hemisphereLight) {
      this.helpers.HemisphereLightHelper = 
              new THREE.HemisphereLightHelper(hemisphereLight, 8);
      this.scene.add(this.helpers.HemisphereLightHelper);
    },
    FakePointLightHelper(pointLight) {
      const sphereSize = 10;
      this.helpers.pointLightHelper = 
              new THREE.PointLightHelper(pointLight, sphereSize);
      this.scene.add(this.helpers.pointLightHelper);
    },
    FakeRectAreaLightHelper(rectAreaLight) {
      this.helpers.rectAreaLightHelper =
              new THREE.RectAreaLightHelper(rectAreaLight, 0xffffff);
      // × this.scene.add(this.helpers.rectAreaLightHelper);
      // √ helper must be added as a child of the light
      rectAreaLight.add(this.helpers.rectAreaLightHelper);
    },
    FakeSkeletonHelper() {
      let helper = new THREE.SkeletonHelper(this.skeleton.bones[0]);
      helper.skeleton = this.skeleton;
      
      let boneContainer = new THREE.Group();
		  boneContainer.add(this.skeleton.bones[0]);
 
      this.helpers.SkeletonHelper = helper;
      this.scene.add(helper);
      // SkeletonHelper 始终假设当前获取的 bone 是最新的，所以我们需要手动把 bone 根节点进行更新
      // @see https://stackoverflow.com/questions/55487874/skeletonhelper-is-not-rendered?noredirect=1&lq=1
      // 下面这行也可以
      // this.scene.add(this.skeleton.bones[0]);
      this.scene.add(boneContainer);
    },
    MakeMeshGreatAgain() {
      this.RussiaSkeletonInterference();
      this.RussiaSkinInterference();
      
      const geoLocation = generateGeometry();
      let group = new THREE.Group();
      let geometry, material, mesh;
      geoLocation.forEach(location => {
        // console.log(location)
        geometry = new THREE.BoxGeometry(4,4,4);
        material = new THREE.MeshPhysicalMaterial({color:0xffffff});
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...location)
        group.add(mesh);
        this.shapes = group;
      })
      this.scene.add(group);
    },
    RussiaSkeletonInterference() {
      const bones = [];
      const shoulder = new THREE.Bone();
      const elbow = new THREE.Bone();
      const hand = new THREE.Bone();

      shoulder.add( elbow );
      elbow.add( hand );

      bones.push( shoulder );
      bones.push( elbow );
      bones.push( hand );

      shoulder.position.set(0, 0, -10);
      elbow.position.set(5, 5, 0);
      hand.position.z = -5;
      this.skeleton = new THREE.Skeleton(bones);
    },
    RussiaSkinInterference() {
    },
    MakeResizeEventAgain() {
      window.addEventListener('resize', e => {
        console.log('[trigger] resize');
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      })
    },
    MAGA() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.MAGA)
    },
    ToggleHelperVeryBad(tag, e) {
      this.helpers[tag].visible = !this.helpers[tag].visible; 
      Array.from(e.target.classList).find(e => e === 'inactive') === undefined ? 
        e.target.classList.add('inactive') : e.target.classList.remove('inactive')
    },
    ToggleTotallyHelperVeryBad(e) {
      Object.keys(this.helpers).forEach(key => {
        // console.log(this.helpers[key])
        this.helpers[key].visible = !this.helpers[key].visible
      })
      Array.from(e.target.parentElement.children).forEach(element => {
        if (element !== e.target) {
          Array.from(element.classList).find(e => e === 'inactive') === undefined ? 
            element.classList.add('inactive') : element.classList.remove('inactive')
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.menu {
  background: transparent;
  margin: 2px;
  border: 1px solid cyan;
  color: cyan;
  &.inactive {
    border: 1px solid gray;
    color: gray;
  }
  &:focus {
    outline: none;
  }
}
</style>