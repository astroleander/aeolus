import Vue from 'vue';
import App from './AppVue.vue';

import './styles/common.scss'
import "#res/styles/index.scss";
import "#res/main.css";
import "@/modules/utils/general_bash"

import router from './router'

import "@babel/polyfill";

new Vue({
  el: '#laboratory-vue',
  router,
  render: h => h(App)
})
  
  