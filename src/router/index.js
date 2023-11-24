import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'login' } },
  { path: "*", redirect: { name: 'error-404' } },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/ErrorView.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/new-employee-request-form',
    name: 'new-employee-request-form',
    component: () => import('@/views/apps/beranda/Forms/Permintaan/FormPermintaan.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: false,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/apps/beranda/BerandaView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dashboard',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: true,
          href: '/',
        },
      ]
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/auth/ProfileView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Profile',
      breadscrum: [
        {
          text: 'Profile',
          disabled: true,
          href: '/',
        },
      ]
    },
  },
  {
    path: '/users-info/:id',
    name: 'users-info',
    component: () => import('@/views/apps/beranda/Tools/UserInfoView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Users Info',
      breadscrum: [
        {
          text: 'Beranda',
          disabled: false,
          href: '/',
        },
        {
          text: 'Users Info',
          disabled: true,
          href: '/users-info',
        },
      ]
    },
  },
  {
    path: '/master-data-pengguna',
    component: () => import('@/views/apps/Masterdata/pengguna/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Pengguna',
    },
    children: [
      {
        path: '',
        name: 'master-data-pengguna.data',
        component: () => import('@/views/apps/Masterdata/pengguna/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-pengguna.add',
        component: () => import('@/views/apps/Masterdata/pengguna/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
            {
              text: 'Tambah Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-pengguna.show',
        component: () => import('@/views/apps/Masterdata/pengguna/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Pengguna',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna',
            },
            {
              text: 'Lihat Data Pengguna',
              disabled: true,
              href: '/master-data-pengguna/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-role',
    component: () => import('@/views/apps/Masterdata/role/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Role',
    },
    children: [
      {
        path: '',
        name: 'master-data-role.data',
        component: () => import('@/views/apps/Masterdata/role/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-role.add',
        component: () => import('@/views/apps/Masterdata/role/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Tambah Data Role',
              disabled: true,
              href: '/master-data-role/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-role.show',
        component: () => import('@/views/apps/Masterdata/role/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Role',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Role',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Lihat Data Role',
              disabled: true,
              href: '/master-data-role/show/:id',
            },
          ]
        }
      },
      {
        path: 'setrole/:id',
        name: 'master-data-role.setrole',
        component: () => import('@/views/apps/Masterdata/role/SetroleView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Set Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Set Akses',
              disabled: true,
              href: '/master-data-role',
            },
            {
              text: 'Lihat Data Set Akses',
              disabled: true,
              href: '/master-data-role/setrole/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-akses',
    component: () => import('@/views/apps/Masterdata/akses/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Akses',
    },
    children: [
      {
        path: '',
        name: 'master-data-akses.data',
        component: () => import('@/views/apps/Masterdata/akses/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-akses.add',
        component: () => import('@/views/apps/Masterdata/akses/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
            {
              text: 'Tambah Data Akses',
              disabled: true,
              href: '/master-data-akses/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-akses.show',
        component: () => import('@/views/apps/Masterdata/akses/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Akses',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Akses',
              disabled: true,
              href: '/master-data-akses',
            },
            {
              text: 'Lihat Data Akses',
              disabled: true,
              href: '/master-data-akses/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/master-data-dept',
    component: () => import('@/views/apps/Masterdata/dept/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Master Data Departement',
    },
    children: [
      {
        path: '',
        name: 'master-data-dept.data',
        component: () => import('@/views/apps/Masterdata/dept/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'master-data-dept.add',
        component: () => import('@/views/apps/Masterdata/dept/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
            {
              text: 'Tambah Data Departement',
              disabled: true,
              href: '/master-data-dept/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'master-data-dept.show',
        component: () => import('@/views/apps/Masterdata/dept/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Departement',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Master Data Departement',
              disabled: true,
              href: '/master-data-dept',
            },
            {
              text: 'Lihat Data Departement',
              disabled: true,
              href: '/master-data-dept/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/form-permintaan',
    component: () => import('@/views/apps/Form/FormPermintaan/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Form Permintaan',
    },
    children: [
      {
        path: '',
        name: 'form-permintaan.data',
        component: () => import('@/views/apps/Form/FormPermintaan/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Permintaan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Permintaan',
              disabled: true,
              href: '/form-permintaan',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'form-permintaan.add',
        component: () => import('@/views/apps/Form/FormPermintaan/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Permintaan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Permintaan',
              disabled: true,
              href: '/form-permintaan',
            },
            {
              text: 'Tambah Data Permintaan',
              disabled: true,
              href: '/form-permintaan/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'form-permintaan.show',
        component: () => import('@/views/apps/Form/FormPermintaan/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Permintaan',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Permintaan',
              disabled: true,
              href: '/form-permintaan',
            },
            {
              text: 'Lihat Data Permintaan',
              disabled: true,
              href: '/form-permintaan/show/:id',
            },
          ]
        }
      },
    ]
  },
  {
    path: '/dokumentasi',
    component: () => import('@/views/apps/Informasi/Dokumentasi/IndexView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      title: 'Dokumentasi',
    },
    children: [
      {
        path: '',
        name: 'dokumentasi.data',
        component: () => import('@/views/apps/Informasi/Dokumentasi/DataView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Kelola Dokumentasi',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Dokumentasi',
              disabled: true,
              href: '/dokumentasi',
            },
          ]
        }
      },
      {
        path: 'add',
        name: 'dokumentasi.add',
        component: () => import('@/views/apps/Informasi/Dokumentasi/AddView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Tambah data Dokumentasi',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Dokumentasi',
              disabled: true,
              href: '/dokumentasi',
            },
            {
              text: 'Tambah Data Dokumentasi',
              disabled: true,
              href: '/dokumentasi/add',
            },
          ]
        }
      },
      {
        path: 'show/:id',
        name: 'dokumentasi.show',
        component: () => import('@/views/apps/Informasi/Dokumentasi/ShowView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Detail/Update Dokumentasi',
          breadscrum: [
            {
              text: 'Beranda',
              disabled: false,
              href: '/',
            },
            {
              text: 'Data Dokumentasi',
              disabled: true,
              href: '/dokumentasi',
            },
            {
              text: 'Lihat Data Dokumentasi',
              disabled: true,
              href: '/dokumentasi/show/:id',
            },
          ]
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const matchAuth = to.matched.some(record => record.meta.requiresAuth)
  if (matchAuth) {
    const auth = store.getters.isAuth
    if (!auth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
