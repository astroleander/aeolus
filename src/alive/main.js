import Vue from 'vue';
import router from 'vue-router';
import store from 'vuex';

import Alive from './alive.vue';

import './style/main.scss'

new Vue({
  el: '#alive',
  // router,
  // store,
  // i18n,
  render: h => h(Alive)
})

