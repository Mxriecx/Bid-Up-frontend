import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/products';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { BidService } from '../../services/bids';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  _productService = inject(Productservice);
  _bidService = inject(BidService);

  allProducts: Product[] = [];
  baseUrl: string = environment.appUrl;
  ultimoValorPujado: { [productId: string]: number } = {};

  ngOnInit(): void {
    this.showProducts();

    const guardadas = localStorage.getItem('ultimoValorPujado');
    if (guardadas) {
      this.ultimoValorPujado = JSON.parse(guardadas);
    }
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

  pujar(productId: string) {
    const producto = this.allProducts.find(p => p._id === productId);
    if (!producto) return;

    const precioActual = producto.initialPrice;

    Swal.fire({
      title: '💰 Ingresa tu puja',
      input: 'number',
      inputLabel: `El valor actual es COP ${precioActual.toLocaleString('es-CO')}`,
      showCancelButton: true,
      confirmButtonText: 'Enviar puja',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        const valorNum = Number(value);
        if (!value || valorNum <= 0) {
          return 'Por favor ingresa un valor válido';
        }
        if (valorNum <= precioActual) {
          return `Tu puja debe ser mayor que el valor actual (${precioActual.toLocaleString('es-CO')})`;
        }
        return undefined;
      }
    }).then(result => {
      if (result.isConfirmed) {
        const valor = Number(result.value);

        // ✅ Guarda la última puja
        this.ultimoValorPujado[productId] = valor;
        localStorage.setItem('ultimoValorPujado', JSON.stringify(this.ultimoValorPujado));

        // ✅ Actualiza el precio del producto
        producto.initialPrice = valor;

        // ✅ Mensaje visual
        Swal.fire({
          icon: 'success',
          title: 'Puja enviada ✅',
          text: `Has pujado COP ${valor.toLocaleString('es-CO')}`,
          timer: 2000,
          showConfirmButton: false
        });

   
      }
    });
  }
}
