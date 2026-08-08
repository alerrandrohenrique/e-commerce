import { Component } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../core/Services/carrinho.service'; 
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink,  MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Mercado Aleatorio';
  private carrinhoService = inject(CarrinhoService);
  quantidadeHeader = this.carrinhoService.QuantidadeItens
}
