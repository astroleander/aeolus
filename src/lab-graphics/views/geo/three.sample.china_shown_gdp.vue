<template>
  <article class="fullscreen">
    <div id="container">
    </div>
  </article>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

import map from '@/res/assets/china.svg'
import gdp from '@/modules/api/wiki.china_gdp.js'
import mapping from '@/modules/utils/a_simple_china_name_mapping.js'

function parseGdp(res) {
  // console.log(res)
  const ele = res.data.parse.text['*']
  const table_regex = /<table class="wikitable sortable">([\s\S]+?)<\/table>/
  const table = ele.matchAll(table_regex).next().value[0]
  // console.log('[table]')
  // console.log(table)
  const td_regex = /<tr align="right">([\s\S]+?)<\/tr>[\s\S]*?/g
  const tdlist = table.matchAll(td_regex)
  // console.log('[td]')
  let matches, ret =  []
  for (const element of tdlist) {
    matches = element[0].match(/title="(.*)"[\s\S]+?<td>([\s\S]+?)<\/td>[\s\S]+?<td>([\s\S]+?)<\/td>[\s\S]+?<td>([\s\S]+?)<\/td>/)
    // console.log(matches)
    ret.push({
      name: matches[1],
      num: matches[3]
    })
  }
  console.log('[parse complete]')
  return ret
}

function d3threeD(exports) {
  const DEGS_TO_RADS = Math.PI / 180;
  // define ASCII code
  const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

  exports.transformSVGPath = function transformSVGPath(pathStr) {
    let path = new THREE.ShapePath();
    let idx = 1, len = pathStr.length, activeCmd,
        x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
        x1 = 0, x2 = 0, y1 = 0, y2 = 0,
        rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

    function eatNum() {
      let sidx, c, isFloat = false, s;

      // eat delims
      while (idx < len) {
        c = pathStr.charCodeAt(idx)
        if (c !== COMMA && c !== SPACE) break;
        idx ++;
      }
      c === MINUS ? sidx = idx++ : sidx = idx;
      // eat number
      while (idx < len) {
        c = pathStr.charCodeAt(idx)
        if (DIGIT_0 <= c && c <= DIGIT_9) {
          idx++;
          continue;
        } else if ( c === PERIOD) {
          idx++;
          isFloat = true;
          continue;
        }
        s = pathStr.substring(sidx, idx);
        // console.log(`[eatNum] inner while : ${s}`)
        return isFloat ? parseFloat(s) : parseInt(s)
      }
      s = pathStr.substring(sidx);
      // console.log(`[eatNum] outter : ${s}`)
      return isFloat ? parseFloat(s) : parseInt(s)
    } // end func

    function nextIsNum() {
      let c;
      // do permanently eat any delims...
      while(idx < len) {
        c = pathStr.charCodeAt(idx);
        if ( c !== COMMA && c !== SPACE) break;
        idx++;
      }
      c = pathStr.charCodeAt(idx);
      return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
    } // end func

    let canRepeat;
    activeCmd = pathStr[0];

    while (idx <= len) {
      canRepeat = true;
      switch (activeCmd) {
							// moveto commands, become lineto's if repeated
							case 'M':
								x = eatNum();
								y = eatNum();
								path.moveTo( x, y );
								activeCmd = 'L';
								firstX = x;
								firstY = y;
								break;
							case 'm':
								x += eatNum();
								y += eatNum();
								path.moveTo( x, y );
								activeCmd = 'l';
								firstX = x;
								firstY = y;
								break;
							case 'Z':
							case 'z':
								canRepeat = false;
								if ( x !== firstX || y !== firstY ) path.lineTo( firstX, firstY );
								break;
							// - lines!
							case 'L':
							case 'H':
							case 'V':
								nx = ( activeCmd === 'V' ) ? x : eatNum();
								ny = ( activeCmd === 'H' ) ? y : eatNum();
								path.lineTo( nx, ny );
								x = nx;
								y = ny;
								break;
							case 'l':
							case 'h':
							case 'v':
								nx = ( activeCmd === 'v' ) ? x : ( x + eatNum() );
								ny = ( activeCmd === 'h' ) ? y : ( y + eatNum() );
								path.lineTo( nx, ny );
								x = nx;
								y = ny;
								break;
							// - cubic bezier
							case 'C':
								x1 = eatNum(); y1 = eatNum();
							case 'S':
								if ( activeCmd === 'S' ) {
									x1 = 2 * x - x2;
									y1 = 2 * y - y2;
								}
								x2 = eatNum();
								y2 = eatNum();
								nx = eatNum();
								ny = eatNum();
								path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
								x = nx; y = ny;
								break;
							case 'c':
								x1 = x + eatNum();
								y1 = y + eatNum();
							case 's':
								if ( activeCmd === 's' ) {
									x1 = 2 * x - x2;
									y1 = 2 * y - y2;
								}
								x2 = x + eatNum();
								y2 = y + eatNum();
								nx = x + eatNum();
								ny = y + eatNum();
								path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
								x = nx; y = ny;
								break;
							// - quadratic bezier
							case 'Q':
								x1 = eatNum(); y1 = eatNum();
							case 'T':
								if ( activeCmd === 'T' ) {
									x1 = 2 * x - x1;
									y1 = 2 * y - y1;
								}
								nx = eatNum();
								ny = eatNum();
								path.quadraticCurveTo( x1, y1, nx, ny );
								x = nx;
								y = ny;
								break;
							case 'q':
								x1 = x + eatNum();
								y1 = y + eatNum();
							case 't':
								if ( activeCmd === 't' ) {
									x1 = 2 * x - x1;
									y1 = 2 * y - y1;
								}
								nx = x + eatNum();
								ny = y + eatNum();
								path.quadraticCurveTo( x1, y1, nx, ny );
								x = nx; y = ny;
								break;
							// - elliptical arc
							case 'A':
								rx = eatNum();
								ry = eatNum();
								xar = eatNum() * DEGS_TO_RADS;
								laf = eatNum();
								sf = eatNum();
								nx = eatNum();
								ny = eatNum();
								if ( rx !== ry ) console.warn( 'Forcing elliptical arc to be a circular one:', rx, ry );
								// SVG implementation notes does all the math for us! woo!
								// http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
								// step1, using x1 as x1'
								x1 = Math.cos( xar ) * ( x - nx ) / 2 + Math.sin( xar ) * ( y - ny ) / 2;
								y1 = - Math.sin( xar ) * ( x - nx ) / 2 + Math.cos( xar ) * ( y - ny ) / 2;
								// step 2, using x2 as cx'
								var norm = Math.sqrt( ( rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1 ) /
									 ( rx * rx * y1 * y1 + ry * ry * x1 * x1 ) );
								if ( laf === sf ) norm = - norm;
								x2 = norm * rx * y1 / ry;
								y2 = norm * - ry * x1 / rx;
								// step 3
								cx = Math.cos( xar ) * x2 - Math.sin( xar ) * y2 + ( x + nx ) / 2;
								cy = Math.sin( xar ) * x2 + Math.cos( xar ) * y2 + ( y + ny ) / 2;
								var u = new THREE.Vector2( 1, 0 );
								var v = new THREE.Vector2( ( x1 - x2 ) / rx, ( y1 - y2 ) / ry );
								var startAng = Math.acos( u.dot( v ) / u.length() / v.length() );
								if ( ( ( u.x * v.y ) - ( u.y * v.x ) ) < 0 ) startAng = - startAng;
								// we can reuse 'v' from start angle as our 'u' for delta angle
								u.x = ( - x1 - x2 ) / rx;
								u.y = ( - y1 - y2 ) / ry;
								var deltaAng = Math.acos( v.dot( u ) / v.length() / u.length() );
								// This normalization ends up making our curves fail to triangulate...
								if ( ( ( v.x * u.y ) - ( v.y * u.x ) ) < 0 ) deltaAng = - deltaAng;
								if ( ! sf && deltaAng > 0 ) deltaAng -= Math.PI * 2;
								if ( sf && deltaAng < 0 ) deltaAng += Math.PI * 2;
								path.absarc( cx, cy, rx, startAng, startAng + deltaAng, sf );
								x = nx;
								y = ny;
                break;
              case ' ':
                break;
							default:
								throw new Error( 'Wrong path command: ' + activeCmd );
      } // end switch
      // just reissue the command
      if (canRepeat && nextIsNum()) continue;
      activeCmd = pathStr[idx++];
    }
    console.log(`[path resolve] path:${path}`, path);
    return path;
  }; // end @func transformSVGPath
}

/// part from g0v/twgeojson
/// Graphic Engine and Geo Data Init Functions
let addGeoObject = function (d, group, svgObject) {
  let paths = svgObject.paths;
  let depths = svgObject.depths;
  let colors = svgObject.colors;
  let center = svgObject.center;
  console.log(`[addGeoObject][svgObject]paths:${paths}`)
  console.log(`[addGeoObject][svgObject]depths:${depths}`)
  console.log(`[addGeoObject][svgObject]color:${colors}`)
  console.log(`[addGeoObject][svgObject]center:${center}`)

  for (let i = 0; i < paths.length; i++) {
    let path = d.transformSVGPath(paths[i]);
    console.log('[transform] path success...')
    let color = new THREE.Color(colors[i]);
    console.log('[transform] color success...')
    let material = new THREE.MeshLambertMaterial({
      color: color,
      emissive: color
    });
    let depth = depths[i];
    console.log('[transform] depths success...')
    let simpleShapes = path.toShapes(true);
    console.log(`[simpleShapes.length] create times ${simpleShapes.length}`)
    for (let j = 0; j < simpleShapes.length; j++) {
      const simpleShape = simpleShapes[j];
      let shape3d = new THREE.ExtrudeBufferGeometry(simpleShape, {
        depth: depth,
        bevelEnabled: false
      });
      let mesh = new THREE.Mesh(shape3d, material);
      mesh.rotation.x = Math.PI;
      mesh.translateZ( - depth - 1);
      mesh.translateX( - center.x);
      mesh.translateY( - center. y);

      group.add(mesh);
    }
  }
}

async function initSVGObject() { 
  return await gdp.then(res => {
    let obj = {};
    let gdp_list = parseGdp(res)
    obj = importSvg(); // paths and titles
    
    obj.colors = Array(obj.paths.length).fill(0x21212130);
    obj.colors = obj.colors.map(each => Number.parseInt(`0x${Math.floor(256 * Math.random()).toString(8)}2121`),16)
    obj.center = { x: 350, y: 300};
    gdp_list = gdp_list.reduce((o, key) => ({ ...o, [mapping[key.name]]: Number(key.num.replace(/,/g, ''))}), {})
    obj.gdp = obj.titles.map(title => gdp_list[title])
    // 补齐香港, 澳门, 台湾的数据
    obj.gdp[Array.prototype.findIndex.call(obj.titles ,e => e === 'Hong Kong')] = 2402321
    obj.gdp[Array.prototype.findIndex.call(obj.titles ,e => e === 'Macau')] = 360946
    obj.gdp[Array.prototype.findIndex.call(obj.titles ,e => e === 'Taiwan')] = 3900236
    // 根据 gdp 渲染高度
    obj.depths = obj.gdp.map(gdp => Math.floor(Math.sqrt(gdp / 500) || 1))
    
    console.log(obj)
    return obj;
  });
}

function importSvg() {
  console.log('[import map]')
  let path_arr = []
  let title_arr = []

  let svgParser = new DOMParser();
  let doc = svgParser.parseFromString(map, "image/svg+xml");
  let provinceList = doc.children[0].children
  console.log(provinceList)
  provinceList = Array.from(provinceList).filter(e => e.tagName === 'path')
  for (const province of provinceList) {
    title_arr.push(province.attributes.title.value)
    path_arr.push(province.attributes.d.nodeValue)
  }
  return { 
    titles: title_arr, 
    paths: path_arr
    }
}

export default {
  data() {
    return {
      d3g: {},
      renderer: null,
      stats: null,
      scene: null,
      camera: null
    }
  },
  mounted() {
    console.log(this)
    this.d3g = {}
    console.log('[0]', this.d3g);
    d3threeD(this.d3g);
    console.log('[1]', this.d3g);
    this.init()
  },
  methods: {
    async init() {
      let container = document.getElementById('container');

      this.scene = new THREE.Scene();
      console.log(`[init][scene] ${this.scene}`)
      this.scene.background = new THREE.Color(0xb0b0b0);

      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1,  30000);
      this.camera.position.set(0, 0, 1000);

      let group = new THREE.Group();
      this.scene.add(group);

      let directionalLight = new THREE.DirectionalLight( 0xfffffff, 0.6);
      directionalLight.position.set(0.75, 0.75, 1.0).normalize();
      this.scene.add(directionalLight);

      let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
      this.scene.add(ambientLight);

      let helper = new THREE.GridHelper(10000, 100);
      helper.rotation.x = Math.PI / 2;
      group.add(helper);

      let obj = await initSVGObject();
      addGeoObject(this.d3g, group, obj);

      this.renderer = new THREE.WebGLRenderer({antialias: false});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      let controls = new OrbitControls(this.camera, this.renderer.domElement)

      container.appendChild(this.renderer.domElement)
      window.addEventListener( 'resize', this.onWindowResize, false );
      requestAnimationFrame(this.animate)
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped lang='scss'>
#container {
  overflow: hidden;
}
</style>
<style>
canvas { 
     height: 100%; 
     width: 100%; 
     display: block;
     background: #222;
    } 
 
</style>
