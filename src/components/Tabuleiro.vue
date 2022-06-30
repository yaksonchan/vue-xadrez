<template>
  <div class="container" style="min-width: 615px;">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="tabuleiro">
            <div v-for="linha in linhas" :key="'linha:'+linha" class="linha">
                <casa :ref="'casa:'+((linha-1)*8+index)" v-for="(coluna, index) in colunas" :key="'coluna:'+coluna" :index="(linha-1)*8+index" :linha="linha" :coluna="index" :coord="coluna+linha" :pecaAtual="tabuleiro.casas[(linha-1)*8+index]"
                :casaSelecionada="casaSelecionada" :possiveisMovimentos="possiveisMovimentos" :tabuleiro="tabuleiro"
                @modalEvolucao="abrirModalEvolucao" :automatico="automatico"/>
            </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row mt-3">
          <div class="col">
            <h2 style="text-align:center;">Vue Xadrez</h2>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col">Bem vindo ao Vue Xadrez, um jogo criado totalmente em Vue JS e feito por alunos da Universidade Federal Fluminense no ano de 2022. O jogo segue todas as regras conhecidas e as jogadas do computador são meramente aleatórias com prioridade em eliminar peças do oponente.</div>
        </div>
        <hr />
        <div class="row justify-content-end">
          <div class="col"></div>
          <div class="col" v-if="!jogoIniciado">
            Selecione o modo:
          </div>
        </div>
        <div class="row align-items-end justify-content-between">
          <div class="col">
            <button v-if="!jogoIniciado" type="button" class="btn btn-primary btn-lg btn-block" @click="iniciarJogo()">Iniciar jogo</button>
            <button v-if="jogoIniciado" type="button" class="btn btn-primary btn-lg btn-block" @click="reiniciarJogo()">Reiniciar jogo</button>
            <button v-if="jogoIniciado" type="button" class="btn btn-danger btn-lg btn-block" @click="pararJogo()">Parar jogo</button>
          </div>
          <div class="col">
            <div v-if="!jogoIniciado" class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-secondary active">
                <input type="radio" name="options" @click="automatico = true" autocomplete="off" checked> Computador
              </label>
              <label class="btn btn-secondary">
                <input type="radio" name="options" @click="automatico = false" autocomplete="off"> Humano
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <textarea :value="logs.join('\n')" style="margin-top:10px; width: 100%; height: 300px;" disabled/>
          </div>
        </div>
      </div>
    </div>
    <modal-evolucao ref="evolucao" @escolheu="evoluiu" :automatico="automatico" />
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
import ModalEvolucao from './ModalEvolucao.vue'
export default {
  components: { Casa, ModalEvolucao },
  data(){
      return {
          linhas: [8, 7, 6, 5, 4, 3, 2, 1],
          colunas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          logs: [],
          casaSelecionada: { coord: null, index: null },
          tabuleiro: {vez: "branco", casas: new Array(64)},
          utils: new MovimentacaoUtils(),
          automatico: true,
          jogoIniciado: false
      }
  },
  computed: {
      possiveisMovimentos(){
        if(this.casaSelecionada.index != null){
            return this.utils.movimentosPossiveis.filter(movimento => movimento.origem == this.casaSelecionada.index);
        }
        return [];
      }
  },
  created(){
      //this.iniciarJogo();
  },
  methods: {
      iniciarJogo(){
          this.jogoIniciado = true;
          this.zerarTabuleiro();
          this.preencherPecasIniciais();
          this.utils.logs = this.logs;
          this.utils.gerarMovimentos(this.tabuleiro);
      },
      reiniciarJogo(){
        this.logs = [];
        this.iniciarJogo();
      },
      pararJogo(){
        this.logs = [];
        this.zerarTabuleiro();
        this.jogoIniciado = false;
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
            if(this.automatico)
              this.moverAleatorioTimeout();
        }
        else
            this.tabuleiro.vez = "branco";
      },
      limpaSelecao(){
          this.casaSelecionada = {coord: null, index: null};
      },
      selecionaCasa(coord, index){
        if(coord == this.casaSelecionada.coord)
            this.limpaSelecao();
        else { 
          this.casaSelecionada.coord = coord;
          this.casaSelecionada.index = index;
        }
      },
      getMelhorMovimentoAleatorio(){
        var movimentos = this.utils.movimentosPossiveis.filter(mov => !mov.pecaDestinoEAmigo() && mov.pecaOrigem.cor == this.tabuleiro.vez && !(mov.diagonalPeao && !mov.pecaDestino));
        var maiorPeso = Math.max(...movimentos.map(mov => mov.getPeso()));
        var movimentosDeMaiorPeso = movimentos.filter(mov => mov.getPeso() == maiorPeso);
        var indexRandom = Math.floor(Math.random()*movimentosDeMaiorPeso.length);
        return movimentosDeMaiorPeso[indexRandom];
      },
      moverAleatorioTimeout(){
        setTimeout(() => this.moverAleatorio(), 2000);
      },
      moverAleatorio(){
        var movimento = this.getMelhorMovimentoAleatorio();
        console.log(movimento);
        var de = { index: movimento.origem, coord: this.$refs['casa:'+movimento.origem][0].coord};
        var para = { index: movimento.destino, coord: this.$refs['casa:'+movimento.destino][0].coord};
        this.mover(de, para);
      },
      jogarSozinho(){
        setInterval(() => this.moverAleatorio(), 1000);
      },
      evoluiu(casaIndex, peca){
        this.logs.push(`Evoluiu ${this.tabuleiro.casas[casaIndex].nome} ${this.tabuleiro.casas[casaIndex].cor} para ${peca.nome}`);
        this.tabuleiro.casas[casaIndex] = peca;
        this.utils.gerarMovimentos(this.tabuleiro);
      },
      abrirModalEvolucao(casaIndex, cor){
        this.$refs.evolucao.abrirModal(casaIndex, cor);
      }

  }

}
</script>

<style scoped>
    .linha {
        width: 600px;
    }

    .tabuleiro {
        width: 600px;
        height: 600px;
        margin-top: 10px;
        outline:4px solid black;
    }
</style>