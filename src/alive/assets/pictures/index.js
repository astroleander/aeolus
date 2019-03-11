import { resolve } from "url";

// console.log(allFiles)
// import s from './moepig/1.jpg';
// import './moepig/2.jpg';

// const moepig = []
// let index = 0
// while (index < 12) {
//   moepig.push(require('./moepig/'+ (index + 1) +'.jpg' ))
//   index++
// }
// console.log(moepig)
// export default moepig;

/**
 * 一次载入12张图片会极大拖慢主页载入速度，所以我觉得这里用按需引用的方式更好
 */
const date = new Date(Date.now());

const moe_path = './moepig/'

const file = date.getMonth() + 1
const fileReg = new RegExp(file)

/**
 * @see https://webpack.js.org/guides/dependency-management/
 * 
 * 但是 tmd 提示我 not a function .... 似乎是需要配置 .babelrc
 * 
 * @see https://stackoverflow.com/questions/52755685/import-multiple-files-in-folder-in-react-nextjs
 * 似乎需要另外引入一个包
 */
// const imgs = require.context(moe_path, false, fileReg);
// console.log(imgs);

const img = require('./moepig/' + file + '.jpg');


// console.log(img);
export default img;
