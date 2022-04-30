<template>
    <div class="tabuleiro">
        <div v-for="linha in linhas" :key="'linha:'+linha" class="linha">
            <casa v-for="(coluna, index) in colunas" :key="'coluna:'+coluna" :coluna="index" :linha="linha" :coord="coluna+linha" :pecaAtual="jogoAtual.get(coluna+linha)" />
        </div>
        <button @click="mover('a2', 'a7')">mover</button>
        <textarea :value="logs" style="width: 480px; height: 200px;" disabled/>
    </div>
</template>

<script>
import Casa from './Casa.vue'
import Peao from '../classes/Peao'
import Torre from '../classes/Torre'
import Cavalo from '../classes/Cavalo'
import Bispo from '../classes/Bispo'
import Rainha from '../classes/Rainha'
import Rei from '../classes/Rei'
export default {
  components: { Casa },
  data(){
      return {
          linhas: [8, 7, 6, 5, 4, 3, 2, 1],
          colunas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          jogoAtual: new Map(),
          peao: new Peao('branco'),
          logs: [],
          vez: "humano"
      }
  },
  created(){
      this.iniciarJogo();
  },
  methods: {
      iniciarJogo(){
          this.zerarTabuleiro();
          this.preencherPecasIniciais();
      },
      zerarTabuleiro(){
          this.jogoAtual = new Map();
          this.linhas.forEach(linha => {
              this.colunas.forEach(coluna => {
                  this.jogoAtual.set(coluna+linha, null);
              })
          });
      },
      preencherPecasIniciais(){
          this.colunas.forEach(coluna => {
              this.jogoAtual.set(coluna+2, new Peao('branco'));
              this.jogoAtual.set(coluna+7, new Peao('preto'));

              if(coluna == "a" || coluna == "h"){
                this.jogoAtual.set(coluna+1, new Torre('branco'));
                this.jogoAtual.set(coluna+8, new Torre('preto'));
              }

              if(coluna == "b" || coluna == "g"){
                this.jogoAtual.set(coluna+1, new Cavalo('branco'));
                this.jogoAtual.set(coluna+8, new Cavalo('preto'));
              }

              if(coluna == "c" || coluna == "f"){
                this.jogoAtual.set(coluna+1, new Bispo('branco'));
                this.jogoAtual.set(coluna+8, new Bispo('preto'));
              }

              if(coluna == "d"){
                this.jogoAtual.set(coluna+1, new Rainha('branco'));
                this.jogoAtual.set(coluna+8, new Rainha('preto'));
              }

              if(coluna == "e"){
                this.jogoAtual.set(coluna+1, new Rei('branco'));
                this.jogoAtual.set(coluna+8, new Rei('preto'));
              }
          });
      },
      mover(de, para){
          var peca = this.jogoAtual.get(de);
          if(peca.nome)
            this.jogoAtual.set(de, null);
            this.jogoAtual.set(para, peca);
            this.logs.push("Moveu " + peca.nome +" de " + de + " para " + para);
      },
      trocarVez(){
        if(this.vez == "humano")
            this.vez = "pc";
        else
            this.vez = "humano";

      }

  }

}
</script>

<style scoped>
    .linha {
        width: 480px;
    }

    .tabuleiro {
        width: 480px;
        height: 480px;
        margin: 0 auto;
        border: 1px solid black;
    }
</style>