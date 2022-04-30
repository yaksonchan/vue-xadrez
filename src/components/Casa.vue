<template>
  <div :class="cor" class="casa">
      {{coord}}
  </div>
</template>

<script>
export default {
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
        background-color: #000000;
    }
    .casa {
        width: 50px;
        height: 50px;
        float: left;
        color: red;
    }
</style>