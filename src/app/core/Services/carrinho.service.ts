import { Injectable, signal, computed } from "@angular/core"

    @Injectable ({
    providedIn: 'root'
})
export class CarrinhoService{

    //! Estado Global - Criado com Sucesso
    private carrinho = signal<{nome: string; preco:number}[]>([]);
    //? Seleção
    itens = computed (() => this.carrinho());
    QuantidadeItens = computed (() => this.carrinho().length);
    TotalItens = computed(() => 
    this.carrinho().reduce((total, item) => total + item.preco,0));

    // Todo: Ações
    adicionar(produto:{nome:string; preco: number}){
        this.carrinho.update(lista => [...lista, produto]);
        }
        //Todo: Ação de faxina
        limpar() {
            this.carrinho.set([]);
        }
}
