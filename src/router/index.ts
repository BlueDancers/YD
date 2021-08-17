import { message } from 'ant-design-vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../src/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../src/login/index.vue'),
  },
  {
    path: '/registory',
    name: 'registory',
    component: () => import('../src/registory/index.vue'),
  },
  {
    path: '/pageList',
    name: 'pageList',
    component: () => import('../src/pageList/index.vue'),
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../src/content/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
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
      message.warn('登录失效,请重新登录')
      next('/login')
    }
  }
})
