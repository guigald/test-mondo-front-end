<template>
  <div class="pokedexMain">
    <Presentation />
    <History />
    <Information />
  </div>
</template>
<script>
import Presentation from './../components/Presentation'
import History from './../components/History'
import Information from './../components/Information'
export default {
  name: 'Pokedex',
  components: {
    Presentation,
    History,
    Information
  }
}
</script>
