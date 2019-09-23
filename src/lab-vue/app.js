import Vue from 'vue';
import App from './AppVue.vue';

import './styles/common.scss'

import router from './router'

import "@babel/polyfill";

/**
 * 注意, 我们在这里指定的元素是 #laboratory-vue, 
 * 整个过程是顺利完成了的, 但是最后我们在浏览器中是找不到 id 为 laboratory-vue 的元素的
 * 
 * 接下来会发生这样的事情:
 * 1. 新建 Vue 对象
 * 2. 按照 Vue 对象的设置, 将指定的 .vue 模板注入 .html 模板中
 * 3. article#laboratory-vue 被替换为 router-view
 *      <div>
 *        <router-view />
 *      </div>
 * 4. router-view 按照 url 分发, '' 匹配到 NavLayout, 
 * 5. 重定向到 /app, 此时的路径是 /lab-vue/index.html#/app
 * 6. 渲染 NavLayout, 又遇到 router-view, 
 *      <div>
 *        <header>...</header>
 *        <router-view />
 *      </div>
 * 7. 继续按照分发规则, 加载 children 匹配上的也是唯一一个的 index.vue
 * 8. index.vue 为 
 *      <div>
 *        <header>...</header>
 *        <article id='dashboard'>...</article>
 *      </div>
 * 
 * 如果要实现顶级元素自定义的话可以参考 build 里两个不同的 vue 实例的注入，
 * 默认情况下 vue 注入是会在顶部自建一个没有标识位的 div 的
 */
new Vue({
  el: '#laboratory-vue',
  router,
  render: h => h(App)
})
  
  