import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/products';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {

  _productService = inject(Productservice);
  allProducts: Product[] = [];
  baseUrl: string = environment.appUrl;

  // 👇 Nuevo: cantidad máxima de productos que se muestran
  maxProducts = 4;

  // 👇 Getter que devuelve solo los primeros N productos
  get limitedProducts(): Product[] {
    return this.allProducts.slice(0, this.maxProducts);
  }

  showProducts() {
    this._productService.getProducts().subscribe({
      next: (response: any) => {
        this.allProducts = response.data;
        console.log(this.allProducts);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.showProducts();
  }
}
