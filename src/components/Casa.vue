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
        possiveisMovimentos: Array,
        index: Number,
        tabuleiro: Object,
        automatico: Boolean

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
            if(this.possiveisMovimentos.find(movimento => {
                if(movimento.diagonalPeao && !this.pecaAtual)
                    return false;
                if(movimento.destino == this.index && !this.pecaAtual)
                    return true;
                if(movimento.destino == this.index && this.pecaAtual && this.pecaAtual.cor != movimento.pecaOrigem.cor)
                    return true;
                return false;
            }))
                return true;
            return false;
        }
    },
    methods: {
        selecionaCasa(){
            if(this.pecaAtual && this.pecaAtual.cor == "preto" && this.automatico)
                return;
            if(this.ePossivelMovimento){
                this.$parent.mover({index: this.casaSelecionada.index, coord: this.casaSelecionada.coord}, {index: this.index, coord: this.coord});
            }
            else if(this.pecaAtual && this.pecaAtual.cor == this.tabuleiro.vez){
                this.$parent.selecionaCasa(this.coord, this.index);
            }
        }

    },
    watch: {
        pecaAtual(peca){
            if(this.linha == 8 && peca && peca.cor == "branco" && peca.nome == "Peão")
                this.$emit("modalEvolucao", this.index, "branco");
            if(this.linha == 1 && peca && peca.cor == "preto" && peca.nome == "Peão")
                this.$emit("modalEvolucao", this.index, "preto");
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
        width: 75px;
        height: 75px;
        float: left;
        color: red;
    }
</style>