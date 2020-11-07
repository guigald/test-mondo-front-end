<template>
  <div class="information">
    <div class="informationHead">
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
          <label for="fieldSearch">Pesquisar(palavras em Inglês): </label>
          <span>
            <input id="fieldSearch" type="search" placeholder="Encontre um Pokémon" v-model.trim="search.pokemon">
            <input type="submit" value="Buscar" @click.prevent.stop="handleClick">
          </span>
        </div>
      </form>
    </div>
    <div class="contentLists">
      <PokemonList
      v-on:clickPhase="clickPhase"
      v-on:selectedByType="selectedByType"
      v-on:setError="setError" />
      <PokemonsDemos />
    </div>
    <div class="error" v-if="search.error">
      <p>{{search.error}}</p>
    </div>
  </div>
</template>
<script>
import PokemonList from './../components/PokemonList'
import PokemonsDemos from './../components/PokemonsDemos'
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
        { text: 'Habitat', value: 'locale' }
      ],
      selected: 'name',
      pokemon: undefined,
      error: false
    }
  }),
  components: {
    PokemonList,
    PokemonsDemos
  },
  methods: {
    ...mapActions([
      'getPokemon',
      'getList'
    ]),
    handleClick () {
      if (this.search.pokemon === undefined) {
        this.search.error = 'O campo de pesquisa não pode ser nulo.'
        this.search.pokemon = undefined
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
          this.search.pokemon = undefined
          this.removeModal(3000)
        }
      }
      if (type === 'color') {
        this.getServicesColor(this.search.pokemon.toLowerCase())
        this.search.selected = 'name'
      }
      if (type === 'species') {
        this.getServicesEggGroup(this.search.pokemon.toLowerCase())
        this.search.selected = 'name'
      }
      if (type === 'locale') {
        this.getServicesLocale(this.search.pokemon.toLowerCase())
        this.search.selected = 'name'
      }
    },
    async getServices (itemToSearch) {
      try {
        const response = await apiClient.getByName(itemToSearch)
        this.getPokemon({ pokemon: response.data })
      } catch (error) {
        this.search.error = 'Não encontrado, corriga o campo de busca.'
      } finally {
        this.search.pokemon = undefined
        this.removeModal(3000)
      }
    },
    async getServicesColor (itemToSearch) {
      try {
        const response = await apiClient.getPokemonsByColors(itemToSearch)
        const data = response.data.pokemon_species
        const names = []
        data.forEach(pokemon => {
          names.push(pokemon.name)
        })
        this.getList({ list: names })
      } catch (error) {
        this.search.error = 'Ops solicitação inválida, verifique o valor ou tente novamente mais tarde.'
      } finally {
        this.search.pokemon = undefined
        this.removeModal(3000)
      }
    },
    async getServicesEggGroup (itemToSearch) {
      try {
        const response = await apiClient.getPokemonsByEggGroup(itemToSearch)
        const data = response.data.pokemon_species
        const names = []
        data.forEach(pokemon => {
          names.push(pokemon.name)
        })
        this.getList({ list: names })
      } catch (error) {
        this.search.error = 'Não encontrado, corriga o campo de busca.'
      } finally {
        this.search.pokemon = undefined
        this.removeModal(3000)
      }
    },
    async getServicesLocale (itemToSearch) {
      try {
        const response = await apiClient.getPokemonsByLocale(itemToSearch)
        const data = response.data.pokemon_species
        const names = []
        data.forEach(pokemon => {
          names.push(pokemon.name)
        })
        this.getList({ list: names })
      } catch (error) {
        this.search.error = 'Não encontrado, corriga o campo de busca.'
      } finally {
        this.search.pokemon = undefined
        this.removeModal(3000)
      }
    },
    removeModal (time) {
      setTimeout(() => {
        this.search.error = false
      }, `${time}`)
    },
    clickPhase (e) {
      this.search.pokemon = e.name
      this.handleClick()
    },
    selectedByType (e) {
      if (e !== undefined) {
        this.search.pokemon = e
        this.handleClick()
      }
    },
    setError (e) {
      this.search.error = e
      this.removeModal(3000)
    }
  },
  created () {
    register(this.$store)
    this.search.pokemon = 'bulbasaur'
    this.handleClick()
    this.search.pokemon = undefined
  }
}
</script>
