// import PokedexService from './_services/PokedexService'

import * as types from './mutations-types'

export default {

  getPokemon: async ({ commit }, { pokemon }) => {
    commit(types.POKEMON_BY_NAME, { pokemon })
  },
  getList: async ({ commit }, { list }) => {
    commit(types.POKEMONS_TYPES, { list })
  },
  resetlist: ({ commit }) => {
    commit(types.RESET_POKEMONS_TYPES, {})
  },
  setError: ({ commit }, { error }) => {
    commit(types.SET_ERROR, { error })
  }

}
