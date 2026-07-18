import { Component, Input, Output, EventEmitter} from '@angular/core';
import {UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from  '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
//criar classe Produto com as propriedades produto,preco
export class Produto{
  //Entrada de dados da lista Produtos em Lista-produtos
  @Input() nome: string ='';
  @Input() preco: number=0;
  //Saida de dados de Produtos selecionados para lista-produtos
  @Output () produtoSelecionado = new EventEmitter<string>(); 
  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }
}