import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import firebase from 'firebase/compat/app'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/App.vue')
	},
	{
		path: '/login',
		name: 'login',
		meta: { auth: false, layout: 'module-layout' },
		component: () => import('@/views/BaseLogin.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: { auth: false, layout: 'module-layout' },
		component: () => import('@/views/BaseRegister.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseProfile.vue')
	},
	{
		path: '/tasks',
		name: 'tasks',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseTasks.vue')
	},
	{
		path: '/crm',
		name: 'crm',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseCRM.vue')
	},
	{
		path: '/deals',
		name: 'deals',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseDeals.vue')
	},
	{
		path: '/deals/create',
		name: 'create-deal',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/CreateDeals.vue')
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
