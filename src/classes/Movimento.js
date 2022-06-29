export default class Movimento {
    constructor(origem, destino, pecaOrigem, pecaDestino, diagonalPeao){
        this.origem = origem;
        this.destino = destino;
        this.pecaOrigem = pecaOrigem;
        this.pecaDestino = pecaDestino;
        this.diagonalPeao = diagonalPeao;
    }

    getPeso(){
        return this.pecaDestino ? this.pecaDestino.peso : 0;
    }

    pecaDestinoEAmigo(){
        return this.pecaDestino ? this.pecaOrigem.cor == this.pecaDestino.cor : false;
    }
}