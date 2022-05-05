<template>
  <div class="scale">
    <tabuleiro />
  </div>
</template>

<script>
import Tabuleiro from './components/Tabuleiro.vue'

export default {
  name: 'App',
  components: {
    Tabuleiro
  }
}
</script>

<style scoped>
.scale {
  min-height: 1000px;
}
</style>
