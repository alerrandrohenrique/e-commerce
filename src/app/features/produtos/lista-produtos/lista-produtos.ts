import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core'
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produtos.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos { 
 //! signal
  produtos = signal <{nome: string; preco: number}[]>([]);
  carregando = signal (true);
  produtoSelecionado = signal <string | null>(null);
  carrinho = signal<{nome: string; preco: number}[]>([]);

  erro = signal < string | null>(null);
  
  //!funçao para exibir produtos selecionados pelo usuario console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
//** inject */
private produtosService = inject(produtosService);

  //! função que adiciona produtos usando metodo update()
  adicionarProduto(){
    this.produtos.update(listaAtual =>[
      ...listaAtual,
      {nome: 'Playstation 5', preco: 4463.07},
    ]);
  }
  //! função que contabiliza a quantidade de produtos na lista
  totalProdutos = computed(() => this.produtos().length);
  //!função que calcula o valor total do produtos usando computed()
  valorTotal = computed(()=>
  {return this.produtos().reduce((total, item) =>
    total + item.preco,0
   )});
  //!função para substituir a lista atual usando o metodo atual
  substituirProdutos(){
    this.produtos.set([
      {nome: 'Processador Intel Core', preco:930.00 },
      {nome: 'Celular Xiaomi', preco: 340.99 },
      {nome: 'Celular Xiaomi', preco: 2000.99 },
      {nome: 'Placa de video', preco: 3000.99 },
      {nome: 'Processador Ryzen', preco: 2800.99 }
    ]);
  }
    carregarProdutos(){
      this.erro.set(null); //! limpar o erro antes de fazer a requisitação
   this.carregando.set(true);
    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProduto(dados);
        this.produtos.set(produtos)
        this.carregando.set(false);
      },
      error: (error) => {
      console.error('Erro ao carregar produtos', );
      this.erro.set('Erro ao carregar esta pagina. Tente novamente mais tarde')
      this.carregando.set(false);
      }
    }); 
  }
  constructor () {
    //! carrega a API
    this.carregarProdutos();
    //! esffects continuam iguais
    effect(() =>{
      console.log('Lista de Produtos Alterados: ',this.produtos());
    });
     effect(() =>{
      console.log('Valor Total Atualizado ',this.valorTotal());
    });
     effect(() =>{
      if (typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja do emotivo`;
      }
     });
  } 
  adicionarAoCarrinho (produto: {nome: string; preco: number}){
    this.carrinho.update(listaAtual => [
    ...listaAtual, produto]
  );
     }
   //! totalProdutos = computed (() => this.produtos().length;
   //metodo para calcular a quantidade total de itens no carrinho
   quantidadeCarrinho = computed (() => this.carrinho().length)
  //metodo para calcular o valor total dos itens do carrinho
  totalCarrinho = computed (() =>{
    return this.carrinho().reduce((total, item) =>
    total + item.preco,0

  )});

}
