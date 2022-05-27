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
		path: '/deals',
		name: 'deals',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/deals/BaseDeals.vue')
	},
	{
		path: '/deals/:id',
		name: 'card-deal',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/deals/CardDeals.vue')
	},
	{
		path: '/deals/create',
		name: 'create-deal',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/deals/CreateDeals.vue')
	},
	{
		path: '/companies',
		name: 'companies',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseCompanies.vue')
	},
	{
		path: '/companies/create',
		name: 'create-company',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/CreateCompanies.vue')
	},
	{
		path: '/contacts',
		name: 'contacts',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseContacts.vue')
	},
	{
		path: '/archive-deals',
		name: 'archive-deals',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/deals/ArchiveDeals.vue')
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
