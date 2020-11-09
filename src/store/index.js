import Vue from 'vue'
import Vuex from 'vuex'

import pokedex from '@/modules/pokedex/_store/index'

Vue.use(Vuex)

const modules = {
  pokedex
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})
