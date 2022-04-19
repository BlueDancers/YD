import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/app/home',
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
    path: '/app',
    redirect: '/app/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
      },
      {
        path: 'pageList/:groupId',
        name: 'pageList',
        component: () => import('@/pages/pageList/index.vue'),
      },
    ],
  },
  {
    path: '/main/:id',
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
      next('/login')
    }
  }
})
