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
      is_guest: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Register',
    meta: {
      layout: 'empty',
      is_guest: true
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      layout: 'main',
      is_auth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      is_auth: true,
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
  const meta_auth = to.matched.some(record => record.meta.is_auth)
  const meta_guest = to.matched.some(record => record.meta.is_guest)
  const meta_admin = to.matched.some(record => record.meta.is_admin)
  const isLogin = store.getters.isLoggedIn
  const status = store.getters.user.status
  console.log(isLogin, status)
  if (meta_auth && !isLogin) {
    next('/login?message=login')
  } else if (meta_admin && (status != 1)) {
    next('/dashboard')
  } else if (meta_guest && isLogin) {
    next('/dashboard')
  } else {
    next()
  }
})
// if (to.matched.some(record => record.meta.auth)) {
//   if (store.getters.isLoggedIn) {

//   console.log(store.getters.user)
//     next()
//     return
//   }
//   next('/login?message=login')
// } else if (to.matched.some(record => record.meta.is_admin)) {
//   // console.log(store.getters.user.is_admin)
//   if (store.getters.user.is_admin == 1) {
//     // console.log('is_admin = true')
//     next()
//     return
//   }
//   console.log('is_admin = false')
//   next('/dashboard')
// } else if (to.matched.some(record => record.meta.is_guest)) {
//   if (!store.getters.isLoggedIn) {
//     next()
//     return
//   }
//   next('/dashboard')
// } else {
//   next()
// }
// })

export default router
