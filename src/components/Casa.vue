<template>
  
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
        getClass(){
            if(this.linha + this.coluna % 2 == 0)
                return "branco";
            return "preto";
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
</style>