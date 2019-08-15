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

function initSVGObject() {
  let obj = {};
  obj.paths = importSvg();
  obj.colors = Array(obj.paths.length).fill(0x21212130);
  obj.colors = obj.colors.map(each => Number.parseInt(`0x${Math.floor(256 * Math.random()).toString(8)}2121`),16)

  obj.center = { x: 350, y: 300};
  obj.depths = Array(obj.paths.length).fill(0)
  obj.depths = obj.depths.map(each => 10 + 30 * Math.random())

  // obj.paths = [
  //   // beijing
  //   "m 546.67752,258.03016 -0.26,0.25 -1.01,-0.38 0.13,0.49 -1.39,-0.68 -0.39,0.15 -1.13,1.24 -1.03,0.49 0.64,1.18 -1.41,-0.16 -1.17,-0.87 -0.16,-0.83 -0.62,-0.38 -0.74,0.24 -1.79,-0.43 -0.31,0.39 -0.48,-0.51 -0.23,0.56 -0.88,0.27 -0.36,0.58 -0.67,0 -0.86,-1.44 -1.53,0.04 -1.07,-0.92 0.1,-1.41 -0.84,-0.56 1.84,-0.66 -0.64,-0.47 -0.05,-1.13 -1.16,-0.67 0.3,-1.2 2.09,-1.53 1.75,-0.28 0.4,-0.7 0.75,0.64 0.5,-1.32 1.01,-0.69 -0.62,-1.53 -0.5,-0.07 -1.27,-1.42 0.06,-0.77 -0.52,-0.18 0.29,-0.65 1.92,-1.26 0.95,0.63 1.49,-0.59 1.7,-2.86 0.71,0.52 1.47,-0.49 0.57,0.29 0.06,-0.37 -1.61,-1.83 0.04,-0.49 0.39,-0.17 0.4,0.61 0.91,0.15 -0.26,-1.36 1.81,-0.03 0.17,-1.1 0.45,-0.25 0.64,0.43 -0.25,0.93 0.61,1.26 0.96,0.97 0.69,0.17 1.87,2.32 1.85,-0.14 2.09,0.79 1.21,-0.43 1.19,0.24 -0.01,0.48 -0.67,-0.26 -0.22,0.32 0.17,0.91 -1.75,0.01 -0.81,0.51 0.14,0.53 -0.65,0.29 0.44,1.01 -0.16,1.01 1.6,2.37 0.45,0.07 0,0 0,0.93 -2.34,1.45 0,0 -1.74,0.34 -0.75,0.54 -0.7,-0.3 -2.07,0.32 -0.28,1.01 0.3,1.04 1.7,0.86 0.4,1.11 -0.58,0.45 -0.07,0.97 0,0 0.06,0.3 -0.65,0.25 z",
  //   // hebei
  //   "m 497.03752,520.64016 -0.91,1.14 0.21,0.44 -0.34,0.5 0.28,0.42 -0.55,0.29 -0.51,-0.62 0.7,-0.85 -0.66,0.11 -0.34,-0.44 1.25,-0.94 0.87,-0.05 z m 4.55,-1.58 0.7,-0.1 -0.21,-0.71 -0.51,0.12 0.02,0.69 z m -34.08,10.81 0.42,-0.04 0.67,-1.56 -1.21,0.23 -0.19,0.73 0.31,0.64 z m 0.34,2.97 0.59,0.06 0.41,-0.93 -0.54,-0.28 -0.6,0.72 0.14,0.43 z m 24.78,-9.7 0.43,-0.05 -0.23,-0.22 0.33,-0.21 0.65,0.2 0.53,-0.37 -0.34,-0.25 0.43,-0.54 -0.21,-0.29 -0.76,0.31 -0.83,1.42 z m 55.67,-27.31 0.75,-0.46 0.41,0.23 0.56,-0.49 0.22,1.42 1.32,-1.04 0,0 -1.81,-1.24 -0.35,-1.66 -0.64,-0.99 0.14,-1.31 -0.7,-1.21 0.87,-1.29 -0.74,-0.59 -0.29,-1.93 -0.88,-0.91 0.08,-0.63 -1.16,-0.95 0.73,-1.36 -0.21,-0.47 -2.51,0.39 -1,0.56 -0.38,-1.43 -0.89,-0.37 0.03,-0.42 -0.58,-0.44 0.53,-0.54 -0.3,-0.47 -0.48,0.08 -0.6,0.91 -0.82,0.14 0.09,-0.46 -0.68,-0.54 -1.59,0.17 -0.59,-0.69 -1.8,-0.46 0,0 0.23,0.8 -1.06,-0.34 -0.76,2.17 0.58,0.8 -0.45,0.32 0.88,1.38 -1.5,0.34 -0.54,-0.8 -1.3,-0.33 -1.18,-1.89 -0.79,-0.3 -0.58,0.09 -0.14,0.48 -0.94,-0.2 -2.17,1.26 -0.56,-0.59 -1.58,0.77 -0.42,-0.18 -0.52,1.42 -1.57,-0.73 -0.46,1.16 -0.64,-0.67 -0.84,0.6 -0.76,-0.26 -1.28,0.93 -0.94,-1.39 -0.62,0.21 -0.36,-0.77 -1.33,-0.62 1.98,-1.04 0.03,-0.82 0.84,-0.98 -0.06,-1.03 1.75,-0.98 0.36,-0.87 1.09,0.11 0.33,-0.47 0.71,-0.12 -0.16,-0.57 -0.46,-0.17 0.76,-0.97 -0.06,-0.52 -0.44,-0.55 -0.89,-0.14 -1.23,-1.24 -0.48,0.52 -0.75,-0.03 -0.64,0.91 -1.05,-0.21 0.06,0.44 -0.94,0.15 -1.41,-0.3 -1.13,0.8 -0.21,-0.43 0.28,-1.08 -0.68,-0.52 0.14,-0.49 -0.41,-0.3 0,0 -0.95,0.29 -0.83,1.47 -0.7,0.03 -0.16,-0.48 0,0 -2.23,0.69 0,0 -0.01,-0.44 -0.48,-0.29 -1.22,0.06 -0.93,-0.54 -0.17,-0.54 -0.62,-0.11 -0.13,-1.02 -0.2,0.29 -0.61,-0.22 -0.92,0.38 -0.4,1.05 -0.35,-0.07 -1.07,0.98 -0.9,0.1 -0.2,0.46 -0.86,-0.38 0.08,1.19 1.41,-0.09 0.68,0.82 -0.85,0.53 0.58,1.01 -0.44,0.81 0.46,0.64 -0.09,0.68 -1.84,0.46 -1.03,0 0.02,-0.61 -0.48,-0.29 -0.03,-0.54 -0.47,-0.14 0.25,-0.69 -0.84,-0.99 -1.46,0.06 -1,-0.31 -0.22,-0.45 -0.6,0.55 -0.44,-0.69 -1.29,0.45 -0.65,-0.59 -0.73,2.55 -0.44,0.48 0.72,0.96 -0.23,1.05 -0.65,0.11 -1.03,1.27 0,0 -0.8,0.33 -0.4,1.18 0.95,1.13 -0.2,1.11 0.94,1.54 -1.03,1.34 -0.32,-0.11 -1.05,0.77 0.06,1.67 0.66,1.68 -0.95,0.25 0.12,0.41 -0.64,0.43 -0.09,1.01 -1.32,-0.37 -0.69,0.3 -0.38,1.21 0.62,0.24 -0.62,0.95 -1.62,0.18 -0.1,1.16 -0.99,1.05 -0.52,1.81 0.29,0.36 -0.34,0.34 0.52,1.64 -0.25,0.99 0.66,0.77 -0.89,1.01 0.22,0.43 -0.25,0.55 -1.77,1.94 -2,0.26 0.4,0.47 -0.43,0.58 -1.24,0.15 -0.14,0.41 -1.6,0.38 -0.21,0.34 -0.44,-0.31 -0.32,1.56 -0.74,-0.05 0.33,0.37 0.01,1.06 0.37,0.03 0.58,1.09 -0.74,-0.17 -0.39,0.27 -0.58,0.6 0.33,0.62 -0.49,0.5 -0.85,-0.61 -0.8,0.64 -1.1,-0.82 -0.55,0.55 -0.45,-0.34 -0.2,0.39 0.52,0.48 -0.16,1.91 0.36,0.39 -0.06,0.97 -0.63,0.01 -0.37,-0.38 -0.67,0.5 -1.57,-0.29 -0.79,0.47 -0.97,-0.21 -0.55,0.71 -0.46,2.3 -1.29,0.24 -0.36,-0.47 -0.25,1.39 0,0 0.66,1.45 1.23,0.1 0.1,0.37 0.46,-0.19 -0.45,0.38 0.08,0.74 -1.95,0.15 0.15,1.74 -1.22,1.34 0.46,0.79 -0.58,2.17 1.32,2.6 -0.35,1 0.67,0.07 0.4,0.64 0.04,1.05 0.9,0.14 0.96,0.73 0.51,-0.1 -0.48,0.82 -0.94,-0.7 -0.15,0.43 -0.48,-0.03 0.91,0.9 -0.09,1.56 0.85,-0.96 0.31,0.38 0.58,-0.36 0.92,0.67 0.66,0.06 0.16,-0.48 1.39,0.21 1.68,-0.94 1.19,-1.99 -0.53,-1.14 -0.35,-1.52 -0.75,0.2 -0.63,-0.37 -0.24,-0.14 -0.08,-0.56 0.74,0.4 -0.01,-1.48 -0.76,-0.46 -1.65,-0.09 -0.4,-1.67 0.6,-0.84 0.41,0.28 0.64,-0.92 0.07,0.42 -1.22,1.2 0,0.41 1.84,-0.69 1.47,0 0.76,0.93 0.29,-1.9 -1.46,0.21 -0.43,-0.58 -0.88,0.29 0.01,-0.42 1.11,-1.19 1.04,-0.41 0.37,0.22 1.32,-0.28 1.78,-2.28 1.45,0.17 2.45,-1.08 -0.32,-0.32 -0.54,0.18 -0.16,-0.36 0.39,-0.34 0.55,0.2 0.32,0.71 2.36,-0.42 -0.38,1.04 2.4,-1.99 0.34,0.78 1.55,-0.39 0.62,0.24 0.59,-1.1 1.14,-0.83 0.06,-0.72 -1.19,-0.55 0.05,-0.3 1.21,-0.07 0.81,1.48 0.68,-0.28 -0.25,0.6 -0.68,-0.06 0.19,0.53 -0.52,0.69 0.62,-0.04 0.66,-0.59 1.33,-0.38 -0.37,-0.33 -0.74,0.08 -0.23,-0.53 0.24,-0.34 2.38,-1.14 0.98,0.06 0.13,0.68 0.71,0.59 1.77,-0.47 0.24,-1.23 1.76,0.88 0.61,-0.05 2.28,-2.46 0.99,0.27 -0.02,0.47 0.72,0.51 1.33,-1.29 -0.29,-2.04 0.99,-0.92 0.02,-0.75 0.38,1.02 -0.13,1.05 1.04,1.58 0.8,-0.69 -0.11,-0.5 0.34,-0.21 0.45,0.73 0.81,0.18 0.56,-1.07 -0.46,-0.27 -0.01,-0.61 0.46,-0.37 -0.2,-0.39 0.23,-0.12 1.04,1.71 0.6,-0.54 -0.39,-0.79 0.91,-0.96 -0.25,-0.81 0.49,-0.27 -0.2,-0.46 0.44,-0.3 -1.03,-0.23 0.01,-0.5 1.43,-2.35 -1.24,-1.82 0.74,-0.32 -0.35,-0.42 0.25,-0.21 0.69,0.39 0.04,0.44 0.55,-0.16 0.54,0.31 1.16,2.4 0.69,0.35 -0.49,0.46 0.31,0.56 0.63,-0.9 1.33,0.25 0,0 1.51,-0.77 0.82,0.23 0,0 0.61,-0.6 1.53,-0.34 1.13,1.06 0.2,1.17 1.38,-0.65 -0.15,-0.59 -0.67,-0.42 -0.59,0.23 0.13,-0.53 0.49,-0.05 0.6,-0.78 -1.2,0.09 0.26,-0.82 0.65,0.27 -0.08,-0.75 1.61,-0.69 0.9,0.1 0.2,-0.7 0.54,0.64 -1.03,0.65 -0.04,1.84 1.8,0.2 0.02,0.66 0.43,-0.23 -0.06,-0.97 0.69,-0.74 -0.61,-0.52 -0.43,0.19 -0.32,-0.78 0.6,0.26 0.44,-0.28 0.46,1.1 0.61,-0.25 -0.16,-0.31 0.48,-0.81 1.2,-0.34 0.39,0.49 -0.01,-0.64 0.44,-0.13 0.53,0.15 -0.32,0.56 2.41,-0.07 -0.3,0.54 -0.61,-0.16 0.04,0.64 0.37,0.31 1.1,-0.2 1.26,0.74 -0.1,-0.73 0.53,-0.66 -0.6,-0.02 -0.12,0.56 -0.37,-0.6 1.51,-1.57 0.7,-0.08 0.08,0.36 0.75,0.06 0.73,1.43 0.87,-0.82 0.26,0.16 1.12,-0.62 1.04,-0.19 0.25,0.4 0.53,-0.26 1.87,-1.63 1.13,0.4 1.54,-0.13 0.78,-1.2 -0.34,-1.32 0.3,-0.55 0.35,-0.33 0.84,0.28 0.81,-1.07 0.98,0.44 0.21,-0.38 -0.38,-0.04 -0.35,-1.37 1.34,-1.23 0.35,-1.68 1,0.11 -0.34,-0.57 z m 1.07,2.14 -0.44,-0.32 -0.48,0.49 2.31,0.49 0.35,-0.76 -0.33,-0.53 -1.41,0.63 z",
  //   "m 551.66752,250.28016 0.21,0.2 -0.43,0.35 0.04,1.16 -0.61,0.93 0.28,0.73 1.29,0.51 -1.29,0.41 0.5,0.82 -0.41,0.61 -0.11,1.75 -1.56,-0.44 -0.7,0.19 -0.32,-1.11 -0.68,0.23 0,0 0.07,-0.96 0.58,-0.46 -0.39,-1.11 -1.71,-0.86 -0.29,-1.04 0.27,-1.01 2.08,-0.32 0.7,0.3 0.74,-0.54 1.74,-0.34 z m -38.75,-10.8 -1.16,-1.48 0.39,-0.51 -1.27,-2.1 -1.94,-1.91 0.74,-0.3 0.46,-0.91 0.88,-0.16 0.4,-0.87 -1.19,-0.87 -0.2,-0.5 0.42,-1.14 -0.83,-0.45 -0.05,-0.5 1.97,-1.38 2.82,0.22 -0.34,-0.69 0.25,-0.61 -0.39,-3.62 1.58,-2.07 2.02,-0.75 -0.24,-1.44 0.38,-0.98 0.82,-0.42 2.36,0.49 0.41,-0.97 0.4,-0.05 0.62,0.73 -0.61,1.23 0.99,0.94 0.58,2.77 -0.92,0.53 0.36,1.84 -0.5,1.65 1.04,-0.37 1.44,0.2 0.69,-0.46 1.62,0.86 0.47,-0.8 0.33,0.5 0.76,-0.33 -0.68,-0.97 0.28,-0.61 1.19,-0.33 2.77,-1.63 0.44,-0.68 0.49,-0.02 0.13,-0.43 0.42,0.05 0.8,-0.81 1.16,-0.09 0.99,2.05 -0.06,0.67 0.74,0.15 0.65,-0.25 0.07,-1.12 1.09,-0.18 0.28,-1.14 0.97,-0.56 0.41,-0.69 1.03,0.2 -0.16,0.88 0.72,-0.07 0.54,-0.57 0.72,0.86 1.42,-0.32 0.82,0.22 0.18,-0.81 0.79,0.05 0.92,-0.67 0.06,-1.56 -1.25,-1.47 1.63,0 -0.25,-2.2 0.34,-1.36 2.16,-1.32 3.59,0.36 1.13,-1.13 0.1,-0.98 0.78,0.04 0.19,-0.45 0.7,0.76 2.46,-0.81 0.02,0.56 2.74,3.16 -0.13,0.83 0.64,0.83 -1.15,0.95 1.73,1.2 -0.18,1.06 0.8,0.48 -0.49,0.75 1.06,0.07 0.16,-0.81 0.62,-0.08 0.34,0.84 -0.64,0.23 0.87,0.73 -0.56,1 0.94,1.21 -0.69,1.41 -0.45,-0.14 -0.21,-0.64 -0.74,-0.04 -0.53,1.22 0.36,1.12 0.69,0.57 0.09,0.9 1.15,0.38 0.04,0.91 -0.58,0.62 1,0.79 0.21,1.78 0.43,0.19 0.39,-0.46 1.24,-0.28 1.88,0.08 0.98,0.42 0.19,-0.46 0.93,-0.36 0.59,1.24 0.74,-0.29 3.17,0.6 0.49,-0.54 0,0 -0.05,1.01 -0.88,0.57 0.23,0.62 -1.3,0.86 -0.13,0.81 -1.61,0.31 -0.1,0.57 1.06,0.53 -0.39,0.7 -1.19,-0.04 -0.59,2.67 2.58,2.23 1.56,-0.44 -0.33,1.46 1.02,-0.03 -0.13,0.58 0.71,0.56 3.75,-0.06 -0.28,0.48 0.68,0.9 -0.1,1.85 0.66,1.22 -0.27,0.6 1.51,0.7 0.36,2.37 0.86,-0.05 0,0.95 0,0 -0.73,0.63 -2.72,0.75 -0.46,0.33 0.01,1.23 -0.81,-0.04 -1.33,1.12 -1.3,3.64 0.62,1.64 -0.53,0.89 -0.37,0.16 -0.24,-0.14 0.47,-0.29 -0.66,0.09 -1.49,2.1 -1.08,0.86 -3.19,0.96 -1.78,-0.53 -3.42,2.35 -1.42,-0.54 -0.75,-1.49 -1.2,-1.16 0,0 -0.72,-2.29 -0.87,-0.7 -0.89,0.16 -0.02,-0.87 0.8,-2.08 -0.73,-0.36 -1.39,0.01 -0.67,0.94 -0.23,-0.66 -0.91,-0.22 0.56,-1.18 -1.49,-1.75 0.2,-0.5 -0.65,-1.35 0.38,-1.59 0.57,-0.21 0.71,0.4 0.84,-0.27 0.7,0.44 0.45,-0.32 -0.1,-0.49 -0.7,-0.17 0.06,-0.9 -1.3,-0.4 0.02,-0.56 -0.73,-0.49 -0.54,-1.1 -1.22,-0.27 -0.82,0.3 0,0 -0.46,-0.08 -1.6,-2.37 0.16,-1.01 -0.44,-1.01 0.65,-0.29 -0.14,-0.53 0.81,-0.51 1.74,-0.01 -0.17,-0.91 0.22,-0.32 0.67,0.26 0.01,-0.47 -1.19,-0.24 -1.21,0.43 -2.09,-0.79 -1.85,0.15 -1.87,-2.33 -0.69,-0.16 -0.96,-0.97 -0.62,-1.26 0.26,-0.93 -0.65,-0.43 -0.44,0.25 -0.17,1.09 -1.8,0.04 0.25,1.36 -0.91,-0.15 -0.39,-0.61 -0.39,0.16 -0.05,0.49 1.61,1.83 -0.06,0.37 -0.57,-0.29 -1.47,0.48 -0.71,-0.52 -1.71,2.86 -1.49,0.59 -0.95,-0.62 -1.92,1.25 -0.29,0.65 0.52,0.18 -0.05,0.76 1.27,1.43 0.5,0.06 0.62,1.53 -1.01,0.69 -0.5,1.32 -0.74,-0.64 -0.4,0.7 -1.75,0.29 -2.09,1.52 -0.31,1.21 1.16,0.67 0.06,1.13 0.64,0.47 -1.84,0.66 0.85,0.56 -0.11,1.42 1.08,0.92 1.52,-0.04 0.87,1.44 0.67,0 0.36,-0.58 0.88,-0.27 0.23,-0.56 0.48,0.51 0.31,-0.39 1.79,0.43 0.74,-0.24 0.63,0.39 0.16,0.83 1.17,0.86 1.41,0.16 -0.64,-1.17 1.03,-0.49 1.13,-1.24 0.39,-0.15 1.38,0.68 -0.13,-0.49 1.01,0.38 0.26,-0.25 0,0 -0.08,0.97 0.33,0.37 -0.28,1.14 0.75,0.5 -0.39,1.39 0.43,-0.3 0.36,0.46 -0.36,0.74 0.32,0.84 -0.39,0.54 0.13,0.59 0.68,0.09 0.15,0.37 -0.36,1.17 -1.84,0.6 -0.62,1.53 0.56,3.12 1.08,0 1.01,0.8 1.3,-0.18 1.05,1.86 1.57,-0.66 0.31,0.3 -0.26,0.48 0.32,0.17 2.46,-0.77 1.23,0.13 0.21,-0.75 0,0 0.73,2.6 1.02,1.78 2.05,1.98 0,0 -0.62,0.59 -0.24,1.05 -0.37,0.05 -0.86,1.24 -1.59,0.15 -1.81,3.51 -8.05,0.28 -0.64,1.23 -0.88,0.54 -0.85,1.48 -1.95,1.81 -0.22,0.66 -0.92,-1.43 -0.48,-0.21 -0.52,0.47 -0.14,0.49 0.33,0.26 -0.31,0.53 -0.6,-0.13 0.01,0.74 0.67,0.41 -0.51,0.62 -1.02,-0.29 -2.27,0.72 -0.25,1.64 -0.72,0.5 -0.49,1.99 -1.12,1.25 0.16,0.48 -1.1,1.34 -0.24,0.97 -2.54,0.84 -0.45,1.02 -1.37,1.32 -0.73,1.86 0.19,1.29 0.51,0.22 0.36,0.87 -0.09,0.5 0.77,-0.2 0.61,1.03 0.11,1.38 0,0 -1.89,1.29 -1.05,-1.59 -1.51,-0.35 -0.21,0.62 -0.65,0.03 -0.59,1.52 -1.11,0.41 -0.29,-0.22 0.24,-0.59 -0.3,-0.6 -1.47,0.15 -0.42,-0.29 -1.86,0.4 -2.4,-1.63 -1.84,-0.61 -0.87,0.18 -0.7,-0.42 -0.9,0.09 -0.63,-1.26 -0.57,-0.04 0.07,0.58 -0.29,-0.59 -0.39,0.33 -0.93,-0.32 -0.09,0.37 -1.13,-0.65 -0.29,0.22 0,0 -0.28,-0.99 -1.44,-0.54 -0.5,-0.6 0.42,-1.04 -0.61,-0.49 0.06,-0.46 -0.83,-0.27 0.35,-1.01 -0.53,-0.04 0.32,-0.47 0.58,0.08 1.83,-0.91 0.2,-1.45 0.42,-0.06 0.25,0.53 0.52,-0.36 -0.37,-1.27 0.42,-0.61 -0.29,-0.34 0.21,-0.68 -0.38,-0.25 0.12,-1.09 0.82,-0.36 0.69,-1.13 0.22,-1.21 0.7,-0.53 0.18,-0.86 0.51,-0.34 0.28,-1.1 1.03,-1.53 0.27,-1.35 -0.91,-0.73 -0.94,0.23 0.65,-1.04 -0.91,-0.8 -0.21,-1.43 -1.01,-1.48 0.03,-0.96 -0.8,-0.82 0.23,-0.7 -1.3,-0.24 0.06,-0.37 -1.18,-0.55 -0.76,0.04 -0.48,-0.66 0.16,-1.17 -0.4,-0.63 0.74,-1.33 -0.27,-1.48 0.56,-0.55 0.08,-0.86 1.22,-0.15 0.05,-0.87 0.63,0.13 0.5,-1 0.46,0.08 0.2,-1.14 -1.01,-0.91 -0.09,-1.37 1.51,-1.53 0.53,0.02 0.24,-0.5 0.58,-0.02 0.61,-0.68 0.83,1.38 1.12,0.03 1.05,-1.17 0.89,0.56 0.36,-1.31 0.69,-0.14 0.32,-0.55 -0.57,-0.49 0.05,-0.91 0.64,-0.88 0.03,-0.91 1.02,-2.28 -0.71,-0.97 -0.81,-0.1 -0.3,-0.61 0.03,-1.87 0.35,-0.45 -0.57,-1.23 -2.17,0.01 -0.32,-0.41 -1.73,-0.44 -0.47,-1.23 -1.4,-0.29 0.76,-0.52 0.3,-1.39 0.5,1.14 0.57,-0.25 -0.01,-1.85 0.63,0.2 1.33,-0.36 0.27,-0.67 2.47,-0.38 0.99,-1.19 -1.05,-0.69 -0.7,0.36 -0.97,-0.31 -0.57,-1.94 0.17,-1.72 -1.03,-0.59 0.06,-0.43 -0.85,-1.47 z",
  //   // henan

  // ];
  // obj.depths = [ 100, 50, 25 ];
  // obj.colors = [ 0xC07000, 0xC08000, 0xC0A000 ];
  // obj.center = { x: 365, y: 150 };
  return obj;
}

function importSvg() {
  console.log('[import map]')
  let arr = []
  let svgParser = new DOMParser();
  let doc = svgParser.parseFromString(map, "image/svg+xml");
  let provinceList = doc.children[0].children
  console.log(provinceList)
  provinceList = Array.from(provinceList).filter(e => e.tagName === 'path')
  for (const province of provinceList) {
    arr.push(province.attributes.d.nodeValue)
  }
  return arr
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
    init() {
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

      let obj = initSVGObject();
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
</style>
