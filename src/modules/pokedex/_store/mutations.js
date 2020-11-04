import {
  POKEMON_BY_NAME,
  SET_ERROR
} from './mutations-types'

export default {
  [POKEMON_BY_NAME]: (state, { pokemon }) => {
    state.pokemonByName = pokemon
  },
  [SET_ERROR]: (state, { error }) => {
    state.error = error
  }
}
