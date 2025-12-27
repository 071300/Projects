import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../Views/Home.vue')
    }, {
      path: '/origin',
      name: 'origin',
      component: () => import('../Views/origin.vue')
    }, {
      path: '/features',
      name: 'features',
      component: () => import('../Views/features.vue')
    }, {
      path: '/performances',
      name: 'performances',
      component: () => import('../Views/performances.vue')
    }
  ],
})

export default router
