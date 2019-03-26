/**
 * 如果不设置入口文件的话,
 * webpack 会自动查找设置 <code>./src/index.js</code> 作为入口文件，
 * 并在 <code>./dist/main.js</code> 吐出 bundle,
 * 
 * 这是 webpack 4 的 zero configuration 特色，
 * 但是注意其只限于
 * 1. 默认入口 在 ./src/index.js
 * 2. 默认输出 到 ./dist/main.js
 * 3. 默认 production 和 development 模式
 */
import style from './main.css';

console.log(`I'm a silly entry`);
console.log(`HtmlWebpackPlugin 里配置 chunks 来实现按需加载 js`);
// console.log(`非常烦躁的一点是, 不管进入的是哪一个文件, 多个入口文件不论在哪个页面都会加载, 多个页面不应该这样去引入入口文件`);

if (process.env.NODE_ENV !== 'production') {
  console.log('Dev Mode!')
}