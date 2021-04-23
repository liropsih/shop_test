import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/items',
    name: 'Items',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Items.vue')
  },
  {
    path: '/sale',
    name: 'Sale',
    meta: { layout: 'main', auth: true },
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
      requiresAuth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      requiresAuth: true,
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        }
        else {
          next({ name: 'Dashboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'Dashboard' })
    }
  } else {
    next()
  }
})

export default router
