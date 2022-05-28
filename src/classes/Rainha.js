export default class Rainha {
    constructor(cor){
        this.imagem = `/assets/pecas/rainha_${cor}.png`;
        this.cor = cor;
        this.nome = "Rainha";
        this.deslizante = true;
        this.peso = 4;
    }
}