<template>
  <modal :show="showModal" @close="fecharModal">
      <template #header>
        <h3>Escolha uma peça</h3>
      </template>
      <template #body>
        <img v-for="peca in pecas" :key="peca.nome" :src="peca.imagem" @click="selecionaPeca(peca)"/>
      </template>
      <template #footer>
        É obrigatório que escolha uma peça
      </template>
    </modal>
</template>

<script>
import Modal from './Modal.vue'
import Cavalo from '../classes/Cavalo'
import Torre from '../classes/Torre'
import Rainha from '../classes/Rainha'
import Bispo from '../classes/Bispo'
export default {
    props: ['automatico'],
    components: {
        Modal
    },
    data() {
        return {
            showModal: false,
            casaIndex: null
        }
    },
    methods: {
        abrirModal(casaIndex, cor){
            this.casaIndex = casaIndex;
            this.pecas = [new Cavalo(cor), new Torre(cor), new Rainha(cor), new Bispo(cor)];
            if(this.automatico){
                this.selecionaPeca(this.pecas[Math.floor(Math.random()*4)]);
            } else {
                this.showModal = true;
            }
        },
        selecionaPeca(peca){
            this.$emit("escolheu", this.casaIndex, peca);
            this.fecharModal();
        },
        fecharModal(){
            this.casaIndex = null;
            this.showModal = false;
            this.pecas = [];
        }
    }
}
</script>

<style>

</style>