import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@pages/landing.vue'

const routes = [
  {
    name: 'index',
    path: '/',
    component: LandingPage,
    meta: {
      title: 'Főoldal',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
