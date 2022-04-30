export default class Torre {
    constructor(cor){
        this.imagem = `/assets/pecas/torre_${cor}.png`;
        this.cor = cor;
        this.nome = "Torre"
    }
}