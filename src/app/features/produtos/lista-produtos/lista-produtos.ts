import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core'
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos { 
  //lista de produtos de dados - array
  produtos = signal([
    {nome:'Processador Intel Core', preco: 7299.99},
    {nome:'Celular Xiaomi', preco: 2499.99},
    {nome:'Fone Gamer', preco: 499.99},
    {nome:'Placa de video', preco: 2700.99},
    {nome:'Processador Ryzen', preco: 1499.99}
  ]);
  //!funçao para exibir produtos selecionados pelo usuario console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
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
  constructor() {
    //! metodo para monitorar alterações em tempo real usando metodo effect()
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
  //! metodo para criar um estado de seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
  //! metodo para criar um estado para carrinho com signal
  carrinho = signal <{nome: string; preco: number}[]> ([]);
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
