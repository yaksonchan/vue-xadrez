export default class Bispo {
    constructor(cor){
        this.imagem = `/assets/pecas/bispo_${cor}.png`;
        this.cor = cor;
        this.nome = "Bispo";
        this.deslizante = true;
        this.peso = 3;
    }
}