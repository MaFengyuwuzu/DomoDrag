import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( /* webpackChunkName: "about" */ '../views/root/index.vue'),
    meta: {
      keepAlive: true // 该路由会被缓存
    }
    // component: (resolve) => require(['@/views/drag/drag'], resolve)
  },
  { 
    path: '/preview',
    hidden: true,
    component: () => import('@/views/preview/index'),
    name: 'preview',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
