import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'index',
    path: '/',
    component: ()=>import('@pages/landing.vue'),
    meta:{
      title: "Főoldal"
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
