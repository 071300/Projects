import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/Home.vue'
import OriginView from '../Views/origin.vue'
import FeaturesView from '../Views/features.vue'
import PerformancesView from '../Views/performances.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/origin',
      name: 'origin',
      component: OriginView
    }, {
      path: '/features',
      name: 'features',
      component: FeaturesView
    }, {
      path: '/performances',
      name: 'performances',
      component: PerformancesView
    }
  ],
})

export default router
