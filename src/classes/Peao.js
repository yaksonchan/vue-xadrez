export default class Peao {
    constructor(cor){
        this.imagem = `/assets/pecas/peao_${cor}.png`;
        this.cor = cor;
        this.nome = "Peão"
        this.primeiroMovimento = true;
    }
}