import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/Home',
      component: () => import('../view/home/Home.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import('../view/other/test.vue'),
          meta: { title: '系统首页嘿嘿嘿' }
        },
        {
          path: '/table',
          component: () => import('../view/other/test.vue')
        },
        {
          path: '/editor',
          component: () => import('../view/other/test.vue')
        },
        {
          path: '/category',
          component: () => import('../view/petcategory/CategoryShow.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../view/home/login.vue')
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})
