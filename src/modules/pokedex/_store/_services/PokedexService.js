import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getByName (name) {
    return apiClient.get(`/pokemon/${name}`)
  },
  getSpecies (id) {
    return apiClient.get(`/pokemon-species/${id}`)
  },
  getEvolutionChain (id) {
    return apiClient.get(`/evolution-chain/${id}`)
  },
  getAbility (id) {
    return apiClient.get(`/ability/${id}`)
  },
  getPokemonsByTypes (type) {
    return apiClient.get(`/type/${type}`)
  },
  getPokemonsByColors (color) {
    return apiClient.get(`/pokemon-color/${color}`)
  },
  getPokemonsByEggGroup (group) {
    return apiClient.get(`/egg-group/${group}`)
  },
  getPokemonsByLocale (locale) {
    return apiClient.get(`/pokemon-habitat/${locale}`)
  }
}
