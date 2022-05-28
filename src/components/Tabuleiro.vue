<template>
    <div class="tabuleiro">
        <div v-for="linha in linhas" :key="'linha:'+linha" class="linha">
            <casa :ref="'casa:'+((linha-1)*8+index)" v-for="(coluna, index) in colunas" :key="'coluna:'+coluna" :index="(linha-1)*8+index" :linha="linha" :coluna="index" :coord="coluna+linha" :pecaAtual="tabuleiro.casas[(linha-1)*8+index]"
            :casaSelecionada="casaSelecionada" :possiveisMovimentos="possiveisMovimentos" :tabuleiro="tabuleiro"/>
        </div>
        <textarea :value="logs.join('\n')" style="margin-top:10px; width: 480px; height: 200px;" disabled/>
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
import MovimentacaoUtils from '../classes/MovimentacaoUtils'
export default {
  components: { Casa },
  data(){
      return {
          linhas: [8, 7, 6, 5, 4, 3, 2, 1],
          colunas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          logs: [],
          casaSelecionada: { coord: null, index: null },
          tabuleiro: {vez: "branco", casas: new Array(64)},
          utils: new MovimentacaoUtils()
      }
  },
  computed: {
      possiveisMovimentos(){
        if(this.casaSelecionada.index)
            return this.utils.movimentosPossiveis.filter(movimento => movimento.origem == this.casaSelecionada.index);
        return [];
      }
  },
  created(){
      this.iniciarJogo();
  },
  methods: {
      iniciarJogo(){
          this.zerarTabuleiro();
          this.preencherPecasIniciais();
          this.utils.gerarMovimentos(this.tabuleiro);
      },
      zerarTabuleiro(){
          this.tabuleiro.casas = new Array(64);
      },
      preencherPecasIniciais(){
          this.colunas.forEach((coluna, i) => {
              this.tabuleiro.casas[i+8] = new Peao('branco');
              this.tabuleiro.casas[i+48] =new Peao('preto');

              if(coluna == "a" || coluna == "h"){
                this.tabuleiro.casas[i] = new Torre('branco');
                this.tabuleiro.casas[i+56] = new Torre('preto');
              }

              if(coluna == "b" || coluna == "g"){
                this.tabuleiro.casas[i] = new Cavalo('branco');
                this.tabuleiro.casas[i+56] = new Cavalo('preto');
              }

              if(coluna == "c" || coluna == "f"){
                this.tabuleiro.casas[i] = new Bispo('branco');
                this.tabuleiro.casas[i+56] = new Bispo('preto');
              }

              if(coluna == "d"){
                this.tabuleiro.casas[i] = new Rainha('branco');
                this.tabuleiro.casas[i+56] = new Rainha('preto');
              }

              if(coluna == "e"){
                this.tabuleiro.casas[i] = new Rei('branco');
                this.tabuleiro.casas[i+56] = new Rei('preto');
              }
          });
      },
      mover(de, para){
          var peca = this.tabuleiro.casas[de.index];
          if(peca.nome){
            this.logs.push("Moveu " + peca.nome + " " + peca.cor  +" de " + de.coord + " para " + para.coord);
            if(this.tabuleiro.casas[para.index])
                this.logs.push(this.tabuleiro.casas[para.index].nome +" " + this.tabuleiro.casas[para.index].cor + " eliminado");
            this.tabuleiro.casas[de.index] = null;
            this.tabuleiro.casas[para.index] = peca;
            peca.primeiroMovimento = false;
          }
         this.trocarVez();
         this.utils.gerarMovimentos(this.tabuleiro);
         this.limpaSelecao();
      },
      trocarVez(){
        if(this.tabuleiro.vez == "branco"){
            this.tabuleiro.vez = "preto";
            this.moverPretoAleatorio();
        }
        else
            this.tabuleiro.vez = "branco";
      },
      limpaSelecao(){
          this.casaSelecionada = {coord: null, index: null};
      },
      selecionaCasa(coord, index){
          this.casaSelecionada.coord = coord;
          this.casaSelecionada.index = index;
      },
      getMelhorMovimentoAleatorio(){
        var maiorPeso = Math.max(...this.utils.movimentosPossiveis.map(mov => mov.peso));
        var movimentosDeMaiorPeso = this.utils.movimentosPossiveis.filter(mov => mov.peso == maiorPeso);
        var indexRandom = Math.floor(Math.random()*movimentosDeMaiorPeso.length);
        return movimentosDeMaiorPeso[indexRandom];
      },
      moverPretoAleatorio(){
          setTimeout(() => {
              var movimento = this.getMelhorMovimentoAleatorio();
              var de = { index: movimento.origem, coord: this.$refs['casa:'+movimento.origem][0].coord};
              var para = { index: movimento.destino, coord: this.$refs['casa:'+movimento.destino][0].coord};
              this.mover(de, para);
          }, 2000);
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