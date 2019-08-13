import * as THREE from 'three'
import './loader/GLTFLoader'
import ComposeMaterial from './compose_material'
import HatchMaterial from './hatch_material'
import room from './models/room.gltf'

class SceneManager {
  constructor(element) {
    // super();
    // define args
    this.mouseXa = -1;
    this.mouseYa = -1;
    this.mouseXb = -1;
    this.mouseYb = -1;
    this.cameraCenter = new THREE.Vector3(-5, 7, 0);
    this.cameraOrigin = new THREE.Vector3(0, 0, 16);
    this.cameraRotateA = 0;
    this.cameraRotateB = 0;
    this.axisX = new THREE.Vector3(1, 0, 0);
    this.axisY = new THREE.Vector3(0, 1, 0);
  
    this.objectScene = new THREE.Scene();
    this.composeScene = new THREE.Scene();
  
    this.depthMaterial = new THREE.MeshDepthMaterial();
    this.normalMaterial = new THREE.MeshNormalMaterial();
    this.hatchMaterial = new HatchMaterial();
    this.composeMaterial = new ComposeMaterial();
  
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    // constructor start here
    this.element = element;
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

    this.initTextures();

    this.initObjectCamera();
    this.initComposeCamera();

    this.loadScene();
    this.initComposeScene();

    this.initRenderer();
    this.initMouseEvent();
    
  }
  initObjectCamera() {
    console.log('[scene generator][initObjectCamera]')
    this.objectCamera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 30);
    this.objectCamera.position.copy(this.cameraCenter).add(this.cameraOrigin);
    return 
  }
  initComposeCamera() {
    console.log('[scene generator][initComposeCamera]')
    this.composeCamera = new THREE.OrthographicCamera(
      -this.width / 2, this.width / 2, this.height / 2, -this.height / 2, -10, 10
    )
    return
  }
  initObjectScene() {
    console.log('[scene generator][initObjectScene]')
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

    const boxMesh = new THREE.Mesh(boxGeometry);
    const sphereMesh = new THREE.Mesh(sphereGeometry);

    boxMesh.position.x = 1;
    sphereMesh.position. x = -1;

    const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directLight.position.set(1, 1, 1);

    this.objectScene.add(boxMesh);
    this.objectScene.add(sphereMesh);
    this.objectScene.add(directLight);
    return;
  }
  loadScene() {
    console.log('[scene generator][loadScene]')
    let modelLoader = new THREE.GLTFLoader();
    modelLoader.load(room, (gltf) => {
      // const sceneMesh = new THREE.Mesh(geo);
      this.objectScene.add(gltf.scene)
    });
  }
  initComposeScene() {
    console.log('[scene generator][initComposeScene]')
    const composePlaneGeometry = 
      new THREE.PlaneBufferGeometry(this.width, this.height);
    const composePlaneMesh = 
      new THREE.Mesh(composePlaneGeometry, this.composeMaterial);
    this.composeScene.add(composePlaneMesh)
  }
  initTextures() {
    console.log('[scene generator][initTextures]')
    const pars = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: false
    };
    
    this.depthTexture = new THREE.WebGLRenderTarget(this.width, this.height, pars);
    this.normalTexture = new THREE.WebGLRenderTarget(this.width, this.height, pars);
    this.hatchTexture = new THREE.WebGLRenderTarget(this.width, this.height, pars);

    this.composeMaterial.uniforms.depthtexture.value = this.depthTexture;
    this.composeMaterial.uniforms.normaltexture.value = this.normalTexture;
    this.composeMaterial.uniforms.hatchtexture.value = this.hatchTexture; 
    return;
  }
  initRenderer() {
    console.log('[scene generator][initRenderer]')
    this.renderer.setSize(this.width, this.height);
    this.element.appendChild(this.renderer.domElement);
    return;
  }
  initMouseEvent() {
    console.log('[scene generator][initMouseEvent]')
    this.trackingMouse = false;
    this.element.onmousedown = e => {
      this.trackingMouse = true;
      this.mouseXa = e.clientX;
      this.mouseYa = e.clientY;
      this.mouseXb = this.mouseXa;
      this.mouseYb = this.mouseYa;
    };
    this.element.onmouseup = e => {
      this.trackingMouse = false;
      this.mouseXa = -1;
      return this.mouseYa = -1;
    };
    this.element.onmousemoveout = this.element.onmouseup;
    this.element.onmousemove = e => {
      if (this.trackingMouse) {
        this.mouseXb = e.clientX;
        return this.mouseYb = e.clientY;
      }
    };
  }
  rendererDepth() {
    console.log('[scene generator][rendererDepth]')
    this.initObjectScene.overrideMaterial = this.depthMaterial;
    this.renderer.setClearColor('#000000');
    this.renderer.clearTarget(this.depthTexture, true, true);
    this.renderer.render(this.objectScene, this.objectCamera, this.depthTexture);
  }
  rendererNormal() {
    console.log('[scene generator][rendererNormal]')
    this.initObjectScene.overrideMaterial = this.normalMaterial;
    this.renderer.setClearColor('#ffffff');
    this.renderer.clearTarget(this.normalTexture, true, true);
    this.renderer.render(this.objectScene, this.objectCamera, this.normalTexture);
  }
  rendererHatch() {
    console.log('[scene generator][rendererHatch]')
    this.objectScene.overrideMaterial = this.hatchMaterial;
    this.renderer.setClearColor('#ffffff');
    this.renderer.clearTarget(this.hatchTexture, true, true);
    this.renderer.render(this.objectScene, this.objectCamera, this.hatchTexture);
  }

  compose() {
    console.log('[scene generator][compose]')
    this.renderer.render(this.composeScene, this.composeCamera);
  }

  animate() {
    if ((this.mouseXa >= 0) && (this.mouseYa >= 0)) {
      const offsetX = this.mouseXb - this.mouseXa;
      const offsetY = this.mouseYb - this.mouseYa;
      this.cameraRotateA = - Math.atan(offsetX / 320);
      this.cameraRotateB = - Math.atan(offsetY / 320);
    } else {
      this.cameraRotateA *= 0.8;
      this.cameraRotateB *= 0.8;
    }
    this.objectCamera.position.copy(this.cameraOrigin).applyAxisAngle(this.axisY, this.cameraRotateA);
    this.objectCamera.position.applyAxisAngle(this.axisX, this.cameraRotateB);
    this.objectCamera.position.add(this.cameraCenter);
    this.objectCamera.lookAt(this.cameraCenter);
  }

  render() {
    this.animate();
    this.rendererDepth();
    this.rendererNormal();
    this.rendererHatch();
    this.compose();
  }
}

export default SceneManager