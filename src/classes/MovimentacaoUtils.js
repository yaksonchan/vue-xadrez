import Movimento from "./Movimento";

export default class MovimentacaoUtils {
    constructor(){
        this.direcoes = [8,-8,-1,1,7,-7,9,-9];
        this.distanciaAteABorda = this.gerarDistanciaAteABorda();
        this.movimentosPossiveis = [];
    }

    gerarMovimentos(tabuleiro){
        this.movimentosPossiveis = [];
        for (let inicio = 0; inicio < 64; inicio++) {
            var peca = tabuleiro.casas[inicio];
            if(peca && peca.cor == tabuleiro.vez){
                if(peca.deslizante){
                    this.gerarDeslizantes(inicio, peca, tabuleiro);
                } else {
                    if(peca.nome == "Peão"){
                        this.gerarMovimentosPeao(inicio, peca, tabuleiro);
                    }
                    if(peca.nome == "Rei"){
                        this.gerarMovimentosRei(inicio, peca, tabuleiro);
                    }
                    if(peca.nome == "Cavalo"){
                        this.gerarMovimentosCavalo(inicio, peca, tabuleiro);
                    }
                }
            }
        }
    }


    gerarMovimentosRei(inicio, peca, tabuleiro){
        for (let indexDirecao = 0; indexDirecao < this.direcoes.length; indexDirecao++) {
            var casaAlvo = inicio + this.direcoes[indexDirecao];
            var pecaNoAlvo = tabuleiro.casas[casaAlvo];
            
            // Se a distancia pro oeste for 0 então todas pula todas as direções oeste
            if(this.distanciaAteABorda[inicio][2] == 0){
                if([2, 4, 7].includes(indexDirecao))
                    continue
            }

            // Se a distancia pro leste for 0 então todas pula todas as direções leste
            if(this.distanciaAteABorda[inicio][3] == 0){
                if([3, 5, 6].includes(indexDirecao))
                    continue
            }

            if(pecaNoAlvo && pecaNoAlvo.cor != peca.cor)
                this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo, pecaNoAlvo.peso));
            else if(!pecaNoAlvo)
                this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo));
        }
    }

    gerarMovimentosPeao(inicio, peca, tabuleiro){
        var direcao = peca.cor == "branco" ? 8 : -8;

        var casaAlvo = inicio + direcao;
        var pecaNoAlvo = tabuleiro.casas[casaAlvo];

        // So testa diagonal se a distancia pro oeste não for 0
        if(this.distanciaAteABorda[inicio][2] != 0){
            var casaAtaqueOeste = casaAlvo - 1;
            var pecaCasaAtaqueOeste = tabuleiro.casas[casaAtaqueOeste];
            if(pecaCasaAtaqueOeste && pecaCasaAtaqueOeste.cor != peca.cor)
                this.movimentosPossiveis.push(new Movimento(inicio, casaAtaqueOeste, pecaCasaAtaqueOeste.peso));
        }
        // So testa diagonal se a distancia pro leste não for 0
        if(this.distanciaAteABorda[inicio][3] != 0){
            var casaAtaqueLeste = casaAlvo + 1;
            var pecaCasaAtaqueLeste = tabuleiro.casas[casaAtaqueLeste];
            if(pecaCasaAtaqueLeste && pecaCasaAtaqueLeste.cor != peca.cor)
                this.movimentosPossiveis.push(new Movimento(inicio, casaAtaqueLeste, pecaCasaAtaqueLeste.peso));
        }

        if(pecaNoAlvo)
            return;
        
        this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo));

        if(peca.primeiroMovimento){
            casaAlvo = inicio + direcao * 2;
            pecaNoAlvo = tabuleiro.casas[casaAlvo];
            
            if(pecaNoAlvo && pecaNoAlvo.cor == peca.cor)
            return;
        
            this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo));
        }


        
    }

    gerarMovimentosCavalo(inicio, peca, tabuleiro){
        var movimentos = [15, 17, -17, -15, 10, -6, 6, -10];

        for(let i = 0; i < movimentos.length; i++){
            var casaAlvo = inicio + movimentos[i];
            if(casaAlvo >= 0 && casaAlvo < 64 
            && this.distanciaAteABorda[inicio][2] >= this.distanciaAteABorda[casaAlvo][2] - 2 
            && this.distanciaAteABorda[inicio][3] <= this.distanciaAteABorda[casaAlvo][3] + 2){
                var pecaNoAlvo = tabuleiro.casas[casaAlvo];
                if(!pecaNoAlvo)
                    this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo));
                else if(pecaNoAlvo.cor != peca.cor)
                    this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo, pecaNoAlvo.peso));
            }
        }
    }

    gerarDeslizantes(inicio, peca, tabuleiro){
        var startIndexDirecao = peca.nome == "Bispo" ? 4 : 0;
        var endIndexDirecao = peca.nome == "Torre" ? 4 : 8;

        for (let indexDirecao = startIndexDirecao; indexDirecao < endIndexDirecao; indexDirecao++) {
            for (let n = 0; n < this.distanciaAteABorda[inicio][indexDirecao]; n++) {
                
                var casaAlvo = inicio + this.direcoes[indexDirecao] * (n + 1);
                var pecaNoAlvo = tabuleiro.casas[casaAlvo];

                if(pecaNoAlvo && pecaNoAlvo.cor == peca.cor){
                    break;
                }

                if(pecaNoAlvo){
                    this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo, pecaNoAlvo.peso));
                    break;
                } else
                    this.movimentosPossiveis.push(new Movimento(inicio, casaAlvo));

                
            }
            
        }
    }

    gerarDistanciaAteABorda(){
        var distanciaAteABorda = new Array(64);
        for (let coluna = 0; coluna < 8; coluna++) {
            for (let linha = 0; linha < 8; linha++) {

                var numNorte = 7 - linha;
                var numSul = linha;
                var numOeste = coluna;
                var numLeste = 7 - coluna;

                var indiceQuadrado = linha * 8 + coluna;

                distanciaAteABorda[indiceQuadrado] = [
                    numNorte,
                    numSul,
                    numOeste,
                    numLeste,
                    Math.min(numNorte, numOeste),
                    Math.min(numSul, numLeste),
                    Math.min(numNorte, numLeste),
                    Math.min(numSul, numOeste)
                ];
            }
        }
        return distanciaAteABorda;
    }
}