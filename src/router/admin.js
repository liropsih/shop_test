import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty',
      is_guest: true
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'Admin',
    meta: {
      layout: 'admin',
      // is_auth: true,
      // is_admin: true
    },
    component: () => import('@/views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'admin',
  routes
})

router.beforeEach((to, from, next) => {
  //   // if (!store.getters.user.name && store.getters.isLoggedIn) {
  //     // store.dispatch('getUser')
  //     // console.log(store.getters.user)
  //   // }
  //   // const token = {token: localStorage.getItem('token')}
  //   // const post = axios({ url: '/getuser', data: token, method: 'POST' })
  //   // console.log(post.data.user)
  const meta_auth = to.matched.some(record => record.meta.is_auth)
  const meta_guest = to.matched.some(record => record.meta.is_guest)
  // const meta_admin = to.matched.some(record => record.meta.is_admin)
  const isLoggedIn = store.getters.isLoggedIn
  // const status = store.getters.status
  if (meta_auth && !isLoggedIn) {
    next('/login?message=login')
  // } else if (meta_admin && (status != 1 && status != 2)) {
  //   next('/dashboard')
  } else if (meta_guest && isLoggedIn) {
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