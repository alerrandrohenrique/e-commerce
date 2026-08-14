import { Injectable, signal, computed } from "@angular/core"

type ItemCarrinho ={
    nome: string;
    preco: number;
}
    @Injectable ({
    providedIn: 'root'
})
export class CarrinhoService{

    //! Estado Global - Criado com Sucesso
    private carrinho = signal<ItemCarrinho[]>([]);
    //? Seleção
    itens = computed (() => this.carrinho());
    QuantidadeItens = computed (() => this.carrinho().length);
    TotalItens = computed(() => 
    this.carrinho().reduce((total, item) => total + item.preco,0));
    carrinhoVazio = computed(() => this.carrinho().length ===0);

    // Todo: Ações
    adicionar(produto: ItemCarrinho
        
    ){
        this.carrinho.update(lista => [...lista, produto]);
        }
        //Todo: Ação de faxina
        limpar() {
            this.carrinho.set([]);
        }
}
