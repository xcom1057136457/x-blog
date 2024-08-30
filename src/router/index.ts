import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    alias: '',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
    },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'blogs',
        name: 'Blogs',
        component: () => import('@/views/blogs/index.vue'),
        meta: {
          title: '博客',
        },
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/projects/index.vue'),
        meta: {
          title: '项目列表',
        },
      },
      {
        path: 'introduce',
        name: 'Introduce',
        component: () => import('@/views/introduce/index.vue'),
        meta: {
          title: '个人介绍',
        },
      },
      {
        path: 'blog/preview/:name',
        name: 'BlogPreview',
        component: () => import('@/views/blogs/preview.vue'),
        meta: {
          activeMenu: '/blogs',
          noCache: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
