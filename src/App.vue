<template>
  <div id="app">
    <TheHeader />
    <router-view/>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/modules/header/components/TheHeader'
import TheFooter from '@/modules/footer/components/TheFooter'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
