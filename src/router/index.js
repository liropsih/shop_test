import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/items',
    name: 'Item-link',
    meta: { layout: 'main' },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/items/:id',
    name: 'Items-catLink',
    meta: { layout: 'main' },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/items/:id/:subId',
    name: 'Items-subCatLink',
    meta: { layout: 'main' },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/sale',
    name: 'Sale',
    meta: { layout: 'main' },
    component: () => import('@/views/Sale.vue')
  },
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
    path: '/registration',
    name: 'Register',
    meta: {
      layout: 'empty',
      is_guest: true
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main',
      is_auth: true
    },
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      layout: 'main',
      sidelayout: 'admin',
      is_admin: true
    },
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: 'items/add',
        name: 'AdminItemsAdd',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true
        },
        component: () => import('@/views/AdminItemsAdd.vue')
      },
      {
        path: 'items/edit',
        name: 'AdminItemsEdit',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true
        },
        component: () => import('@/views/AdminItemsEdit.vue')
      },
      {
        path: 'order',
        name: 'AdminOrder',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true
        },
        component: () => import('@/views/AdminOrder.vue'),
        children: [
          {
            path: 'detail',
            name: 'AdminOrderDetail',
            meta: {
              layout: 'main',
              sidelayout: 'admin',
              is_admin: true
            },
            component: () => import('@/views/AdminOrderDetail.vue')
          }
        ]
      },
      {
        path: 'roles',
        name: 'AdminRoles',
        children: [
          {
            path: 'user',
            name: 'AdminRolesUser',
            meta: {
              layout: 'main',
              sidelayout: 'admin',
              is_admin: true
            },
            component: () => import('@/views/AdminRolesUser.vue')
          },
          {
            path: 'edit',
            name: 'AdminRolesEdit',
            meta: {
              layout: 'main',
              sidelayout: 'admin',
              is_admin: true
            },
            component: () => import('@/views/AdminRolesEdit.vue')
          }
        ]
      }
    ]
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
  const isLoggedIn = store.getters.isLoggedIn
  const isAdmin = store.getters.isAdmin
  if (meta_admin && !isAdmin) {
    next('/')
  } else if (meta_auth && !isLoggedIn) {
    next('/login?message=login')
  } else if (meta_guest && isLoggedIn) {
    next('/profile')
  } else {
    next()
  }
})

export default router
