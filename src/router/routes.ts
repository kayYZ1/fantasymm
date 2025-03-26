export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/MapView.vue'),
  },
]
