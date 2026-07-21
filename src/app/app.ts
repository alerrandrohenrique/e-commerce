import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router'; //remove a importação, pois não é necessario no momento para este componente
//import {Produto} from './components/produto/produto'; //importando a classe Produto do arquivo produto.ts do componente app
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'Mercado aleatorio'
}
