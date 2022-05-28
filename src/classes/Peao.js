export default class Peao {
    constructor(cor){
        this.imagem = `/assets/pecas/peao_${cor}.png`;
        this.cor = cor;
        this.nome = "Peão"
        this.primeiroMovimento = true;
        this.peso = 1;
    }

    getMovimentos(posicaoAtual){
        var movimentos = [];
        var colunaAtual = posicaoAtual[0];
        var linhaAtual = parseInt(posicaoAtual[1]);
        movimentos.push(colunaAtual+(linhaAtual+1));
        if(this.primeiroMovimento)
            movimentos.push(colunaAtual+(linhaAtual+2));
        return movimentos;
    }
}