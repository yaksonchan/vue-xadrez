<template>
  <div :class="cor" class="casa">
      <peca v-if="pecaAtual" :peca="pecaAtual" />
  </div>
</template>

<script>
import Peca from './Peca.vue';
export default {
  components: { Peca },
    props: {
        coord: String,
        linha: Number,
        coluna: Number,
        pecaAtual: Object
    },
    computed: {
        cor(){
            if((this.linha + this.coluna) % 2 == 0)
                return "preto";
            return "branco";
        }
    }
}
</script>

<style scoped>
    .branco {
        background-color: #FFFFFF;
    }
    .preto {
        background-color: #474747;
    }
    .casa {
        width: 60px;
        height: 60px;
        float: left;
        color: red;
    }
</style>