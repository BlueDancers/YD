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
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
