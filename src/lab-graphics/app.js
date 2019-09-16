console.log('[graphics][load]', '...');

import Vue from 'vue';
import router from './router'

import App from './AppGraphics.vue';

import './styles/common.scss'
import "@babel/polyfill";

new Vue({
  el: '#laboratory-graphics',
  router,
  render: h => h(App)
})