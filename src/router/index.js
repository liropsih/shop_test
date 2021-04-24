import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/items',
    name: 'Items',
    meta: { layout: 'main' },
    component: () => import('../views/Items.vue')
  },
  {
    path: '/sale',
    name: 'Sale',
    meta: { layout: 'main' },
    component: () => import('../views/Sale.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty',
      guest: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Register',
    meta: {
      layout: 'empty',
      guest: true
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      auth: true,
      is_admin: true
    },
    component: () => import('../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login?message=login') 
  } else if (to.matched.some(record => record.meta.is_admin)) {
    if (store.getters.is_admin == 1) {
      next()
      return
    }
    next('/dashboard') 
  } else if (to.matched.some(record => record.meta.is_guest)) {
    if (store.getters.authStatus == null) {
      next()
      return
    }
    next('/dashboard') 
  } else {
    next() 
  }
})

export default router
