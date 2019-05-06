import Vue from 'vue';
import Alive from './alive.vue';

import '@/main.css'
import '@/alive/style/main.scss'

import router from './router';
import store from 'vuex';

new Vue({
  el: '#alive',
  router,
  // store,
  // i18n,
  render: h => h(Alive)
})

