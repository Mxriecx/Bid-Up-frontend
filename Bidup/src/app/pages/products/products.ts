import { Component,inject,OnInit } from '@angular/core';
import { Productservice } from '../../services/products';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { BidService } from '../../services/bids';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
 _productService = inject(Productservice);
   _bidService = inject(BidService);
  _loginService = inject(LoginService);

  allProducts : Product[]=[];
  baseUrl: string = environment.appUrl;
  showProducts(){
    
  this._productService.getProducts().subscribe({
    next:(response : any)=>{
      this.allProducts =response.data;
      console.log(this.allProducts)
    }, 
    

    error:(error : any)=>{
      console.error(error);
    } 
    
 
  })
  }

  
pujar(productId: string) {
  Swal.fire({
    title: '💰 Ingresa tu puja',
    input: 'number',
    inputLabel: 'Valor de la puja',
    showCancelButton: true,
    confirmButtonText: 'Enviar puja',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value || Number(value) <= 0) {
        return 'Por favor ingresa un valor válido';
      }
      return null;
    }
  }).then(result => {
    if (result.isConfirmed) {
      const valor = Number(result.value);
      console.log("Puja enviada para producto:", productId, "valor:", valor);
      // aquí iría el postBid()
    }
  });
}
ngOnInit(): void {
  this.showProducts()
}
}
