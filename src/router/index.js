import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      title: 'Главная страница',
      sale: true
    },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/items',
    name: 'Items-link',
    redirect: { name: 'Home' },
  },
  {
    path: '/items/:parentId',
    name: 'Items-catLink',
    redirect: { name: 'Home' },
  },
  {
    path: '/items/:parentId/:catId',
    name: 'Items',
    meta: { layout: 'main' },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/item/:id',
    name: 'Item',
    meta: { layout: 'main' },
    component: () => import('@/views/Item.vue')
  },
  // {
  //   path: '/sale',
  //   name: 'Sale',
  //   meta: {
  //     layout: 'main',
  //     title: 'Акции',
  //     sale: true
  //   },
  //   component: () => import('@/views/Items.vue')
  // },
  {
    path: '/search',
    name: 'Search',
    meta: {
      layout: 'main',
      title: 'Результаты поиска',
      search: true
    },
    component: () => import('@/views/Items.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty',
      is_guest: true,
      title: 'Авторизация'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Register',
    meta: {
      layout: 'empty',
      is_guest: true,
      title: 'Регистрация'
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main',
      is_auth: true,
      title: 'Профиль'
    },
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/admin',
    redirect: { name: 'AdminDashboard' },
    name: 'Admin',
    meta: {
      layout: 'main',
      sidelayout: 'admin',
      is_admin: true
    },
    component: () => import('@/views/Admin/Admin.vue'),
    children: [
      {
        path: ' ',
        name: 'AdminDashboard',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Информация'
        },
        component: () => import('@/views/Admin/AdminDashboard.vue'),
      },
      {
        path: 'items',
        name: 'AdminItems',
        redirect: { name: 'AdminDashboard' }
      },
      {
        path: 'items/add',
        name: 'AdminItemsAdd',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Добавление товара'
        },
        component: () => import('@/views/Admin/AdminItemsAdd.vue')
      },
      {
        path: 'items/edit',
        name: 'AdminItemsEdit',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Редактирование товара'
        },
        component: () => import('@/views/Admin/AdminItemsEdit.vue')
      },
      {
        path: 'items/catsEdit',
        name: 'AdminCatsEdit',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Редактирование категорий'
        },
        component: () => import('@/views/Admin/AdminCatsEdit.vue')
      },
      {
        path: 'items/brandsEdit',
        name: 'AdminBrandsEdit',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Редактирование брэндов'
        },
        component: () => import('@/views/Admin/AdminBrandsEdit.vue')
      },
      {
        path: 'order',
        name: 'AdminOrder',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Управление заказами'
        },
        component: () => import('@/views/Admin/AdminOrder.vue')
      },
      {
        path: 'order/:id',
        name: 'AdminOrderDetail',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Информация о заказе'
        },
        component: () => import('@/views/Admin/AdminOrderDetail.vue')
      },
      {
        path: 'roles',
        name: 'AdminRoles',
        meta: {
          layout: 'main',
          sidelayout: 'admin',
          is_admin: true,
          title: 'Управление доступом'
        },
        component: () => import('@/views/Admin/AdminRoles.vue')
      },
      {
        path: '*',
        redirect: { name: 'AdminDashboard' },
      }
    ]
  },
  {
    path: '*',
    redirect: { name: 'Home' },
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
