<template>
  <div :class="cor" class="casa" @click="selecionaCasa">
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
        pecaAtual: Object,
        casaSelecionada: Object,
        possiveisMovimentos: Array

    },
    computed: {
        cor(){
            if((this.linha + this.coluna) % 2 == 0){
                if(this.ePossivelMovimento || this.estaSelecionada)
                    return "preto-amarelo";
                return "preto";
            }
            if(this.ePossivelMovimento || this.estaSelecionada)
                return "branco-amarelo";
            return "branco";
        },
        estaSelecionada(){
            if(this.coord == this.casaSelecionada.coord)
                return true;
            return false;
        },
        ePossivelMovimento(){
            if(this.possiveisMovimentos.includes(this.coord))
                return true;
            return false;
        }
    },
    methods: {
        selecionaCasa(){
            if(this.ePossivelMovimento)
                this.$parent.mover(this.casaSelecionada.coord, this.coord);
            if(this.pecaAtual && this.pecaAtual.cor == "branco"){
                this.casaSelecionada.coord = this.coord;
                this.emitePossiveisMovimentos();
            }
        },
        emitePossiveisMovimentos(){
            var possiveisMovimentos = this.pecaAtual.getMovimentos(this.coord);
            this.$emit('possiveisMovimentos', possiveisMovimentos);
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
    .preto-amarelo {
        background-color: #8b8c4e;
    }
    .branco-amarelo {
        background-color: #ECEF88;
    }
    .casa {
        width: 60px;
        height: 60px;
        float: left;
        color: red;
    }
</style>