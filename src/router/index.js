import Vue from 'vue'
import VueRouter from 'vue-router'

import PokedexRoutes from '@/modules/pokedex/router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...PokedexRoutes,
    { path: '', redirect: '/pokemon' }
  ]
})

export default router
