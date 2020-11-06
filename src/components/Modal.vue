<template>
  <div class="modal">
    <span @click="closeModal(false, false, undefined)">X</span>
    <loading  v-if="load"/>
    <div>
      <h1 v-if="nameType"> Pokémons tipo {{ nameType }} </h1>
      <h1 v-else> Resultados para busca: </h1>
      <ul>
        <li v-for="(pokemon, index) in getter_list"
         :key="index"
         @click="closeModal(false, false, pokemon)">
          <i class="fas fa-info-circle"></i> {{ pokemon  }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

import loading from '@/components/Loading.vue'
const { mapGetters } = createNamespacedHelpers('pokedex')
export default {
  name: 'Modal',
  props: {
    nameType: {
      type: String
    },
    load: {
      type: Boolean
    }
  },
  components: {
    loading
  },
  computed: {
    ...mapGetters(['getter_list'])
  },
  watch: {
    getter_list () {
      if (this.getter_list !== undefined) this.closeModal(true, false, undefined)
    }
  },
  methods: {
    closeModal (stateModal, stateLoad, pokemon) {
      this.$emit('closeModal', { modal: stateModal, load: stateLoad, pokemon })
    }
  }
}
</script>
