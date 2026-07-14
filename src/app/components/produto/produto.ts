import { Component } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
//criar classe Produto com as propriedades produto,preco
export class Produto {
  produto = 'Notebook Gamer';
  preco = 5000;
  mostrarProduto = true;
  mostrarPreco = true;
  produtos =[
  {nome: 'mouse' , preco: 29.99},
  {nome: 'teclado' , preco: 49.99},
  {nome: 'Monitor' , preco: 149.99}  
  ]
}