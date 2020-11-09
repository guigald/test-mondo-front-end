<template>
  <div v-if="getter_pokemon" class="pokemonListByName">
    <h1>Pesquisa Pokémons</h1>
    <img :src="getter_pokemon.sprites.other.dream_world.front_default" alt="Foto do Pokemon">
    <div class="containerButtons">
      <button @click="handleClickDetails" :class="details ? 'buttonActive' : ''"> {{ detailsMessage }} </button>
      <button @click="handleClickEvolutions(getter_pokemon.id)" :class="evolutions ? 'buttonActive' : ''" > {{ detailsEvolutions }} </button>
    </div>
    <div class="pokemonListContent">
      <div class="detailsInfos">
        <div>
          <p><b>Nome:</b> {{getter_pokemon.name | name }} </p>
          <p><b>Registro:</b> {{getter_pokemon.id}} </p>
          <p><b>Peso: </b> {{getter_pokemon.weight  / 10}} kg </p>
          <p><b>Altura: </b> {{getter_pokemon.height   / 10}} m </p>
          <div class="types">
            <p><b>Tipo:</b></p>
            <ul>
              <li v-for="(types, index) in getter_pokemon.types" :key="index" @click="clickTypes(types.type.name)"> - <i class="fas fa-info-circle"></i> {{ types.type.name }} </li>
            </ul>
          </div>
          <img :src="getter_pokemon.sprites.back_default" alt="Foto do Pokemon">
        </div>
      </div>
      <div v-if="details" class="details">
        <div>
          <div>
            <p><b>Estatísticas:</b></p>
          <ul>
            <li v-for="(stats, index) in getter_pokemon.stats" :key="index"> -<b>{{ stats.stat.name }}: </b>
              {{ stats.base_stat }}
            </li>
          </ul>
        </div>
        <div class="habilidades">
          <p><b>Habilidades:</b></p>
          <div class="infosAbilities">
            <Loading  v-if="load"/>
            <p v-if="!load"> <i class="fas fa-info">-</i> {{ shortEffectMessage }} </p>
          </div>
          <ul v-for="(abilities, index) in getter_pokemon.abilities" :key="index">
              <li @click="changeInfosAbilities(abilities.ability.url)"> - <i class="fas fa-info-circle"></i> {{ abilities.ability.name }} </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="evolutions" class="evolutions">
        <div>
          <p><b>Evoluções:</b></p>
        <div v-if="load">
          <Loading />
        </div>
          <ul v-if="!load">
            <li v-if="localEvolutionsApi.phaseOne" @click="clickPhase(localEvolutionsApi.phaseOne.name)">
              -<b>1° <span>Estágio</span>: </b><i class="fas fa-info-circle"></i> {{localEvolutionsApi.phaseOne.name | name }}
            </li>
            <li v-if="localEvolutionsApi.phaseTwo" @click="clickPhase(localEvolutionsApi.phaseTwo.name)">
              -<b>2° <span>Estágio</span>: </b><i class="fas fa-info-circle"></i> {{localEvolutionsApi.phaseTwo.name | name }}
            </li>
            <li v-if="localEvolutionsApi.phaseThree" @click="clickPhase(localEvolutionsApi.phaseThree.name)">
              -<b>3° <span>Estágio</span>: </b><i class="fas fa-info-circle"></i> {{localEvolutionsApi.phaseThree.name |name }}
            </li>
          </ul>
        </div>
      </div>
      <Modal
        v-if="showModal"
        :nameType="nameType"
        :load="load"
        v-on:closeModal="closeModal"
      > </Modal>
    </div>
  </div>
</template>
<script>
import register from '@/modules/pokedex/_store/register'
import { createNamespacedHelpers } from 'vuex'

import apiClient from '@/modules/pokedex/_store/_services/PokedexService'
import Loading from '@/components/Loading.vue'
import Modal from '@/components/Modal.vue'
const { mapGetters, mapActions, mapState } = createNamespacedHelpers('pokedex')
export default {
  name: 'PokemonList',
  data: () => ({
    details: true,
    evolutions: false,
    pokemonId: undefined,
    nameType: undefined,
    chainId: undefined,
    evolutionsApi: {},
    load: false,
    showModal: false,
    shortEffect: 'As habilidades ou movimentos, são os poderes que os pokémons possuem para combate. Elas se dividem em 3 tipos: Físicos, Especiais e Efeito.',
    shortEffectMessage: undefined
  }),
  components: {
    Loading,
    Modal
  },
  computed: {
    ...mapState(['pokemonByName']),
    ...mapGetters([
      'getter_pokemon',
      'getter_list'
    ]),
    detailsMessage () {
      return this.details
        ? '- detalhes'
        : '+ detalhes'
    },
    detailsEvolutions () {
      return this.evolutions
        ? '- evoluções'
        : '+ evoluções'
    },
    localEvolutionsApi () {
      return this.evolutionsApi
    }
  },
  filters: {
    name (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  watch: {
    getter_pokemon () {
      this.shortEffectMessage = this.shortEffect
      this.evolutionsApi = {}
      this.evolutions = false
      this.details = true
    },
    getter_list (newValue) {
      if (newValue !== undefined) {
        this.showModal = true
      }
    }
  },
  methods: {
    ...mapActions([
      'getList',
      'resetlist'
    ]),
    handleClickDetails () {
      this.details = !this.details
      if (this.details) this.evolutions = false
    },
    async changeInfosAbilities (ability) {
      this.load = true
      const abilityId = ability.replace('v2', 'vv').replace(/[^\d]/g, '')
      try {
        const response = await apiClient.getAbility(abilityId)
        this.shortEffectMessage = response.data.effect_entries[1].short_effect
      } catch (error) {
        this.setError('Erro no servidor, tente novamente')
      } finally {
        this.load = false
      }
    },
    handleClickEvolutions (id) {
      this.evolutions = !this.evolutions
      if (this.evolutions) {
        this.details = false
        this.load = true
        this.evolutionChain(id)
      }
    },
    async evolutionChain (id) {
      try {
        const response = await apiClient.getSpecies(id)
        this.chainId = response.data.evolution_chain.url.replace('v2', 'vv').replace(/[^\d]/g, '')
        try {
          const dataEvolutions = await apiClient.getEvolutionChain(this.chainId)
          this.evolutionsApi.phaseOne = { ...dataEvolutions.data.chain.species }
          if (dataEvolutions.data.chain.evolves_to && dataEvolutions.data.chain.evolves_to.length > 0) {
            this.evolutionsApi.phaseTwo = { ...dataEvolutions.data.chain.evolves_to[0].species }
            if (dataEvolutions.data.chain.evolves_to[0] && dataEvolutions.data.chain.evolves_to[0].evolves_to.length > 0) this.evolutionsApi.phaseThree = { ...dataEvolutions.data.chain.evolves_to[0].evolves_to[0].species }
          }
          this.load = false
        } catch (error) {
          this.setError('Erro no servidor, tente novamente')
        }
      } catch (error) {
        this.setError('Erro no servidor, tente novamente')
      }
    },
    clickPhase (name) {
      this.$emit('clickPhase', { name })
    },
    async clickTypes (type) {
      this.nameType = type
      this.showModal = true
      this.load = true
      try {
        const response = await apiClient.getPokemonsByTypes(type)
        const payload = [...response.data.pokemon]
        const names = []
        payload.forEach((element, index) => {
          names.push(element.pokemon.name)
        })
        this.getList({ list: names })
      } catch (error) {
        this.setError('Erro no servidor, tente novamente')
      }
    },
    closeModal (e) {
      this.showModal = e.modal
      this.load = e.load
      if (!this.showModal) {
        this.resetlist({})
        this.nameType = undefined
      }
      this.selectedByType(e.pokemon)
    },
    selectedByType (pokemon) {
      this.$emit('selectedByType', pokemon)
    },
    setError (msg) {
      this.$emit('setError', msg)
    }
  },
  created () {
    register(this.$store)
    this.shortEffectMessage = this.shortEffect
  }
}
</script>
