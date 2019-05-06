import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '',
    redirect: 'dashboard',
    component: () => import('@/alive/alive.vue'),
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