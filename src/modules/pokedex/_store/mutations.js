import {
  POKEMON_BY_NAME,
  POKEMONS_TYPES,
  RESET_POKEMONS_TYPES,
  SET_ERROR
} from './mutations-types'

export default {
  [POKEMON_BY_NAME]: (state, { pokemon }) => {
    state.pokemonByName = pokemon
  },
  [POKEMONS_TYPES]: (state, { listTypes }) => {
    state.pokemonsList = listTypes
  },
  [RESET_POKEMONS_TYPES]: (state) => {
    state.pokemonsList = undefined
  },
  [SET_ERROR]: (state, { error }) => {
    state.error = error
  }
}
