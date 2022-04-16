import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/registory',
    name: 'registory',
    component: () => import('@/pages/registory/index.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/main/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('loginStatus') == 'true') {
    if (to.name == 'login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.name == 'login' || to.name == 'registory') {
      next()
    } else {
      ElMessage({
        message: '登录失效,请重新登录',
        type: 'warning',
      })
      next('/login')
    }
  }
})
