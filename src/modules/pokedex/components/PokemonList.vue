<template>
  <div v-if="getter_pokemon" class="pokemonListByName">
    <div>
      <p><b>Nome:</b> {{getter_pokemon.name | name }} </p>
      <p><b>ID:</b> {{getter_pokemon.id}} </p>
      <p><b>Peso: </b> {{getter_pokemon.weight  / 10}} kg </p>
      <p><b>Altura: </b> {{getter_pokemon.height   / 10}} m </p>
      <div>
        <p><b>Tipo: </b></p>
        <ul v-for="(types, index) in getter_pokemon.types" :key="index">
        <li> -{{ types.type.name }} </li>
      </ul>
      </div>
      <button @click="details = !details"> {{ detailsMessage }} </button>
      <div v-if="details">
        <div>
          <p><b>Habilidades: </b></p>
          <ul v-for="(abilities, index) in getter_pokemon.abilities" :key="index">
          <li> -{{ abilities.ability.name }} </li>
        </ul>
        </div>
        <div>
          <p><b>estatísticas: </b></p>
          <ul v-for="(stats, index) in getter_pokemon.stats" :key="index">
            <li> -<b> {{ stats.stat.name }}: </b> {{stats.base_stat}} </li>
          </ul>
        </div>
      </div>
    </div>
    <img :src="getter_pokemon.sprites.other.dream_world.front_default" alt="Foto do Pokemon">
  </div>
</template>
<script>
import register from '@/modules/pokedex/_store/register'
import { createNamespacedHelpers } from 'vuex'

// import apiClient from '@/modules/pokedex/_store/_services/PokedexService'
const { mapGetters, mapState } = createNamespacedHelpers('pokedex')
export default {
  name: 'PokemonList',
  data: () => ({
    details: false
  }),
  computed: {
    ...mapState(['pokemonByName']),
    ...mapGetters(['getter_pokemon']),
    detailsMessage () {
      return this.details ? 'Ocultar detalhes' : 'Exibir detalhes'
    }
  },
  filters: {
    name (name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  },
  created () {
    register(this.$store)
  }
}
</script>
