// import PokedexService from './_services/PokedexService'

import * as types from './mutations-types'

export default {

  getPokemon: async ({ commit }, { pokemon }) => {
    commit(types.POKEMON_BY_NAME, { pokemon })
  },

  setError: ({ commit }, { error }) => {
    commit(types.SET_ERROR, { error })
  }

}
