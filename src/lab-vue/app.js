import Vue from 'vue';
import App from './AppVue.vue';

import '@v/style/common.scss'
import router from './router'

import "@babel/polyfill";

new Vue({
  el: '#laboratory-vue',
  router,
  render: h => h(App)
})
  
  