import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Regist from '@/page/regist'
import Index from '@/page/index'
import Edit from '@/page/edit'
import Evection from '@/page/evection'
import Test from '@/page/test'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/Login',
			name: 'Login',
			component: Login
		},
		{
			path: '/Regist',
			name: 'Regist',
			component: Regist
		},
		{
			path: '/Index',
			name: 'Index',
			component: Index
		},
		{
			path: '/Edit',
			name: 'Edit',
			component: Edit
		},
		{
			path: '/Evection',
			name: 'Evection',
			component: Evection
		},
		{
			path: '/Test',
			name: 'Test',
			component: Test
		}
	]
})
