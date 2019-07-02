import Vue from 'vue';
import App from './VueApp.vue';

import '@/main.css'
import '@lv/style/common.scss'
import router from './router'

import "@babel/polyfill";

new Vue({
  el: '#vue-app',
  router,
  render: h => h(App)
})
  
  