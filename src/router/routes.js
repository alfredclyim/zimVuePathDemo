
const routes = [
	{
		path: '/preparation',
		component: () => import('pages/puzzle/preparation.vue')
	},
	{
		path: '/playmode',
		component: () => import('pages/puzzle/playmode.vue')
	},
	{
		path: '/',
		component: () => import('pages/index.vue')
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
