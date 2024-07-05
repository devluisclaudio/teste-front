import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dash',
    component: DashboardView
  }
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
