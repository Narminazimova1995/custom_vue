import { createRouter, createWebHistory } from 'vue-router'
// import FlightEdit from '@/pages/flights/Edit.vue'
// import FlightCreate from '@/pages/flights/Create.vue'

const routes = [

  {
    path: '/Home',
    name: 'Home', component: () => import(/* webpackChunkName: "Home.vue" */ '@/pages/custom/Home.vue'),
  },
  { path: '/', name: 'dashboard', redirect: { name: 'Home' }
  },
]

const router = createRouter({
  history: createWebHistory(), routes, linkActiveClass: 'menu-item-active',
})

export default router
