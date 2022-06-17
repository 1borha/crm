import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import firebase from 'firebase/compat/app'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/BaseFeed.vue')
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
		component: () => import('@/views/tasks/BaseTasks.vue')
	},
	{
		path: '/tasks/create',
		name: 'create-task',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/tasks/CreateTasks.vue')
	},
	{
		path: '/my-tasks',
		name: 'my-tasks',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/tasks/MyTasks.vue')
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
		component: () => import('@/views/companies/BaseCompanies.vue')
	},
	{
		path: '/companies/create',
		name: 'create-company',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/companies/CreateCompanies.vue')
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
		path: '/projects',
		name: 'projects',
		meta: { auth: true, layout: 'page-layout' },
		component: () => import('@/views/projects/BaseProjects.vue')
	},
	{
		path: '/projects/create',
		name: 'create-project',
		meta: { auth: true, layout: 'module-layout' },
		component: () => import('@/views/projects/CreateProjects.vue')
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
