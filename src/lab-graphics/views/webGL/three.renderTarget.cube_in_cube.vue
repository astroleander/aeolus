<!--
  @author: Astroleander
  @created: 2019/08/14
  @origin/inspiration: https://threejsfundamentals.org/threejs/lessons/threejs-rendertargets.html
  @description: a sample for renderer and renderTarget
-->
<template>
  <article class="fullscreen">
    <div id='container'>

    </div>
  </article>
</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      /**
       * renderer 负责渲染, 我们使用的是 WebGL 渲染器。
       * 设置一个渲染器一般有下面几个步骤
       * 1. 声明渲染器对象
       * 2. 指定渲染器的尺寸 `renderer.setSize()`
       * 3. 追加生成的 canvas 元素到容器元素中 `renderer.DOMElement`
       * 4. 设置 canvas 背景色和背景透明度
       */
      renderer: null,
      /**
       * renderTarget,
       * 渲染目标是一个缓冲，显卡通过这个缓冲使用一个Effect类绘制场景的像素。可以理解为"渲染到"
       */
      renderTarget: null,
      // 场景
      scene: null,
      // 摄像机
      camera: null,
      // 外层方块
      cube: null,

      // 用于内部的场景, 指定了 renderTarget 后渲染
      rtScene: null,
      // 用于内部的摄像机, 指定了 renderTarget 后渲染
      rtCamera: null,
      // 内部方块
      cubes: [],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      /**
       * 执行初始化绑定, 将 WebGL renderer 结果生成的 canvas 绑定到 dom 树上。
       * 这里用的 window.innerWidth 和 window.innerWidth 获取宽高, 所以无所谓。如果用父节点的宽高来设置 canvas 的话注意高度需要预置。
       *
       * 此外, renderer 支持参数设置一些基础值, 详情
       * @see https://threejs.org/docs/#api/en/renderers/WebGLRenderer
       * 这里也可以用参数 canvas 来绑定一个已经存在的 canvas 节点作为输出
       *
       * 不同类型的 render 渲染结果不同, 这里用的 webGLrender
       */
      const container = document.getElementById('container');
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      container.appendChild(this.renderer.domElement);

      /**
       * renderer 宽高, 在初始化的工程中设置 renderer 宽高来决定渲染范围
       * 这个范围指的是 !像素点!,
       */
      const width = window.innerWidth
      const height = window.innerHeight;

      // 第二个 renderer 宽高
      // const rtWidth = 5;
      // const rtHeight = 5;
      const rtWidth = 512;
      const rtHeight = 512;

      /**
       * @function function setSize( width : Integer, height : Integer, updateStyle : Boolean ): null
       *
       * 指定渲染的像素, 正常情况下 canvas 大小也会随之适应。可以设置 updateStyle=false 来创建不可变的 renderer
       *
       * Resizes the output canvas to (width, height) with **device pixel ratio** taken into account,
       * and also sets the viewport to fit that size, starting in (0, 0).
       * Setting updateStyle to false prevents any style changes to the output canvas.
       */
      this.renderer.setSize(width, height, false);

      /**
       * @constructor WebGLRenderTarget(width : Number, height : Number, options : Object)
       *
       * 所谓渲染目标是一个缓冲区, 可以在后台渲染场景像素。
       * 可以用于多种场景, 比如把一个图片在屏幕上展示之前对其进行预处理。
       *
       * A render target is a buffer where the video card draws pixels for a scene that
       * is being rendered in the background.
       * It is used in different effects, such as applying postprocessing to a rendered image
       * before displaying it on the screen.
       *
       * 这里创建一个 renderTarget 用于担当外部 rectangle 的 texture,
       * 所设置的 rtWidth/rtHeight 可以理解为这份 texture 被渲染的像素精度
       *
       * 在强行指定了 scene 的情况下会按照比例渲染。
       * 把上面的 rtWidth/rtHeight 改为 5, 由于中间内嵌的正方形的大小(也就是第二次renderer的区域)是固定的,
       * 可以观测到渲染的像素点被拉伸。
       */
      this.renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

      /**
       * 只有当 camera 看向 scene 的时候渲染才有意义。
       * PerspectiveCamera 模拟人眼的方式, 使用一个棱台 (frustum) 来定义我们的视角。
       * 这种投影模式旨在模仿人眼看到的方式。它是用于渲染3D场景的最常见投影模式。
       *
       * @constructor PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
       *    @param {Number} fov - Camera frustum vertical field of view.
       *                          从底到高的视野角度 (棱台侧边延长线于顶点相交所形成的夹角)
       *    @param {Number} aspect - Camera frustum aspect ratio.
       *                          宽高比
       *    @param {Number} near - Camera frustum near plane.
       *                          近视点
       *    @param {Number} far - Camera frustum far plane.
       *                          远视点
       *        near                       mesh     far
       *         ↓ --- visible zone ------- ↓ -vz--- ↓
       *                                    |
       *                                    |
       *  eye -- | ------------------------ | ------ | ------
       *       ↑              ↑             |             ↑
       *    invisible         |             |             |
       *                   visible                      invisible
       *
       *     └---------------fov------------┘
       *
       *     └-------------------------scene----------------┘
       *
       * 更复杂的教程在 camera 的相关里再说吧
       */
      const rtFov = 75;
      const rtAspect = rtWidth / rtHeight; // === 1
      const rtNear = 0.1;
      const rtFar = 5;
      this.rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
      this.rtCamera.position.z = 2;

      /**
       * Scene 是描述 3D 的方式, 是我们承载所有物体的容器。
       * 场景的三大要素是 物体, 灯光, 照相机。但是照相机和场景从逻辑上是平级的。
       */
      this.rtScene = new THREE.Scene();
      this.rtScene.background = new THREE.Color(0x333333);

      /**
       * 光线, 依赖于场景
       */
      this.initRtLight();

      /**
       * 现在我们尝试添加几个物体
       * Mesh = Material + Geometry
       *
       * Mesh, 本意网格, 在 WebGL 中渲染物体的方式是先顶点着色再片着色所以叫 Mesh 吧
       * Material, 材质, 决定表面
       * Geometry, 鸡哦妹雀, 几何图形, 决定骨架
       *
       * 更详细的介绍看 Mesh/Geometry/Material 自己的部分
       */
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      // 利用 geometry 和默认 phong material 生成内部 cube 的 mesh
      this.cubes = [
        this.initCubes(geometry, 0xCC0000, 0, 0),
        this.initCubes(geometry, 0x00CC00, -2, 0),
        this.initCubes(geometry, 0x0000CC, 2, 0),
        this.initCubes(geometry, 0x00CCCC, 0, 2),
        this.initCubes(geometry, 0xCCCC00, 0, -2),
      ];

      // 第二个镜头, 用于观测整个画布
      const fov = 75;
      const aspect = 1;
      const near = 0.1;
      const far = 5;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.z = 3;

      // 外层场景
      this.scene = new THREE.Scene();
      // 外层场景的光
      this.initLight()
      /**
       * 外层场景的 cube
       * 依旧是 mesh = material + geometry
       * 注意 material 的材质使用的是 当前 renderTarget 所指定的 buffer 的结果导出的 texture
       * ( 见this.render )
       */
      const material = new THREE.MeshPhongMaterial({
        map: this.renderTarget.texture,
      });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);

      // this.renderer.setRenderTarget(this.renderTarget);
      // this.renderer.render(this.rtScene, this.rtCamera);
      // this.renderer.setRenderTarget(null);
      // this.renderer.render(this.scene, this.camera);

      // 开始渲染
      this.render(1);
    },
    initRtLight() {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      this.rtScene.add(light);
    },
    initLight() {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      this.scene.add(light);
    },
    initCubes(geometry, color, x, y) {
      const material = new THREE.MeshPhongMaterial({color});

      const cube = new THREE.Mesh(geometry, material);
      this.rtScene.add(cube);
      cube.position.x = x;
      cube.position.y = y;
      return cube;
    },
    resizeRenderer(renderer) {

    },
    render(time) {
      time *= 0.001;
      this.cubes.forEach((cube, idx) => {
        const speed = 1 + idx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      })
      // 设置内层渲染结果输出到 buffer, 这个结果将会被 外层 cube 读取, 作为其 material
      this.renderer.setRenderTarget(this.renderTarget);
      // 外层渲染空间的颜色, 第二个值是 alpha, 置零以使 canvas 透明
      /**
       * Q: 为什么这一行放在这里也可以呢? 不会使内层透明吗?
       * A: 因为内层的 scene 足够大, 遮盖了整个画布(即 cube), 没有展示画布出场景外被填充的部分
       *
       */
      this.renderer.setClearColor(0x000000, 0);
      // 渲染
      this.renderer.render(this.rtScene, this.rtCamera);
      // 完成以后把目标置空, 这样不会渲染到指定buffer, 就会直接输出
      this.renderer.setRenderTarget(null);

      // rotate the cube in the scene
      this.cube.rotation.x = time;
      this.cube.rotation.y = time * 1.1;

      // render the scene to the canvas
      this.renderer.render(this.scene, this.camera);

      // 为 requestAnimationFrame 注册 render 函数
      requestAnimationFrame(this.render);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>