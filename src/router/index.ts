import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/App.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/BaseLogin.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/BaseRegister.vue')
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
