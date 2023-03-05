
const routes = [
  {
    path: '/',
    // component: () => import('pages/IndexPage.vue')
    // component: () => import('layouts/MainLayout.vue')
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/form/:key',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FormPage.vue') }
    ]
  },
  {
    path: '/dateCounter/:key',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DateCounterPage.vue') }
    ]
  }
]

export default routes
