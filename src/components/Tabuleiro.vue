<template>
    <div class="tabuleiro">
        <div v-for="linha in linhas" :key="'linha:'+linha" class="linha">
            <casa v-for="(coluna, index) in colunas" :key="'coluna:'+coluna" :coluna="index" :linha="linha" :coord="coluna+linha" />
        </div>
    </div>
</template>

<script>
import Casa from './Casa.vue'
export default {
  components: { Casa },
  data(){
      return {
          linhas: [8, 7, 6, 5, 4, 3, 2, 1],
          colunas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      }
  }

}
</script>

<style scoped>
    .linha {
        width: 400px;
    }

    .tabuleiro {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        border: 1px solid black;
    }
</style>