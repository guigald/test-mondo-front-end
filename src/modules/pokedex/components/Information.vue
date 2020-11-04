<template>
  <div class="information">
    <h1>Pesquise sobre os Pokémons e aprenda mais!</h1>
    <p>Entre de cabeça nesse Universo, pesquise por <span>nome, cor, espécie ou localidade</span> e em poucos minutos se torne um mestre Pokémon. </p>
    <form>
      <div class="informationSelect">
        <label for="selectType">Critério de busca: </label>
        <select name="selectType" id="selectType" v-model="search.selected">
          <option  v-for="(type, index) in search.typesList" :key="index" v-bind:value="type.value"> {{type.text}} </option>
        </select>
      </div>
      <div class="informationSearch" >
        <label for="fieldSearch">Pesquisar: </label>
        <span>
          <input id="fieldSearch" type="search" placeholder="Encontre um Pokémon" v-model.trim="search.pokemon">
          <input type="submit" value="Buscar" @click.prevent.stop="handleClick">
        </span>
      </div>
    </form>
    <div class="contentLists">
      <PokemonList />
    </div>
    <div class="error" v-if="search.error">
      <p>{{search.error}}</p>
    </div>
  </div>
</template>
<script>
import PokemonList from './../components/PokemonList'
import register from '@/modules/pokedex/_store/register'
import { createNamespacedHelpers } from 'vuex'

import apiClient from '@/modules/pokedex/_store/_services/PokedexService'
const { mapActions } = createNamespacedHelpers('pokedex')
export default {
  name: 'Information',
  data: () => ({
    search: {
      typesList: [
        { text: 'Nome', value: 'name' },
        { text: 'Cor', value: 'color' },
        { text: 'Espécie', value: 'species' },
        { text: 'Localidade', value: 'locale' }
      ],
      selected: 'name',
      pokemon: undefined,
      error: false
    }
  }),
  components: {
    PokemonList
  },
  methods: {
    ...mapActions(['getPokemon']),
    handleClick () {
      if (this.search.pokemon === undefined) {
        this.search.error = 'O campo de pesquisa não pode ser nulo.'
        this.removeModal(2000)
      } else {
        this.getTypeSelected(this.search.selected)
      }
    },
    getTypeSelected (type) {
      if (type === 'name') {
        try {
          this.getServices(this.search.pokemon.toLowerCase())
        } catch (error) {
          this.search.error = 'Serviço indisponível no momento. Por favor tente novamente em alguns instantes!'
        } finally {
          this.removeModal(2000)
        }
      }
    },
    async getServices (itemToSearch) {
      const response = await apiClient.getByName(itemToSearch)
      this.getPokemon({ pokemon: response.data })
    },
    removeModal (time) {
      setTimeout(() => {
        this.search.error = false
      }, `${time}`)
    }
  },
  created () {
    register(this.$store)
  }
}
</script>
