import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app',
    component: () => import('../App.vue'),
    redirect: '/index',
    children: [
      {
        path: 'i/:pid/:cid',
        name: 'i',
        component: () => import('../pages/index/index.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// router.beforeEach((to, from, next) => {})
