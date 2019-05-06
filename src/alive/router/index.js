import Vue from 'vue'
import Router from 'vue-router'

import index from '@/alive/views/index'

Vue.use(Router)

export const routes = [
  {
    path: '',
    name: 'app',
    redirect: 'dashboard',
    component: index,
    // component: () => import('@/alive/alive.vue'),
    children: [{
      name: 'dashboard',
      path: 'dashboard',
      component: () => import('@/alive/views/dashboard.vue')
    }]
  }
]

export default new Router({
  // mode: 'history', // require service suppo                                                 rt
  scrollBehavior: () => ({ y: 0 }),
  routes,
})