import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  error: undefined,
  pokemonByName: undefined
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
