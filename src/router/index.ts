import { message } from 'ant-design-vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/app/home',
  },
  {
    path: '/app',
    redirect: '/app/home',
    component: () => import('../src/main/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../src/main/home/index.vue'),
      },
      {
        path: 'pageList',
        name: 'pageList',
        component: () => import('../src/main/pageList/index.vue'),
      },
    ],
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
    path: '/content',
    name: 'content',
    component: () => import('../src/content/index'),
  },
  // {
  //   path: '/content1',
  //   name: 'content1',
  //   component: () => import('../src/content1/index.vue'),
  // },
]

export const router = createRouter({
  history: createWebHistory('/yc/'),
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
      message.warn('登录失效,请重新登录')
      next('/login')
    }
  }
})
