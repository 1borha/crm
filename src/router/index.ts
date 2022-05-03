import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import firebase from 'firebase/compat/app'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		meta: { auth: true },
		component: () => import('@/App.vue')
	},
	{
		path: '/login',
		name: 'login',
		meta: { auth: false },
		component: () => import('@/views/BaseLogin.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: { auth: false },
		component: () => import('@/views/BaseRegister.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { auth: true },
		component: () => import('@/views/BaseProfile.vue')
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/',
		meta: { auth: true }
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser
	const requireAuth = to.matched.some(record => record.meta.auth)

	if (requireAuth && !currentUser) {
		next('/login')
	} else {
		next()
	}
})

export default router
