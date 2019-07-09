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
import '#res/styles/page-nav.scss'
import '#res/main.css';
import '#res/prerender.css';

console.log(`I'm a silly entry`);
console.log(`HtmlWebpackPlugin 里配置 chunks 来实现按需加载 js`);

if (process.env.NODE_ENV !== 'production') {
  console.log('Dev Mode!')
}

animateBubble()
animateWater()

function animateBubble() {
  let e = document.getElementsByClassName('bubble-in-flask')
  for (let index = 0; index < e.length; index++) {
    let el = e[index]
    let speed = 1 / el.r.baseVal.value
    setInterval(()=>{
      // 30 差不多在瓶口
      el.cy.baseVal.value < 30 ? 
        el.cy.baseVal.value = 100 : el.cy.baseVal.value -= speed
    }, 10)
  
  }
 }
 function animateWater() {
   let p = document.getElementsByClassName('waterline-in-flask')
 }