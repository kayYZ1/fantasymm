export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/Map.vue'),
  },
]
