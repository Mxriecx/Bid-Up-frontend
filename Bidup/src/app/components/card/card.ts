import { Component,inject,OnInit } from '@angular/core';
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

  allProducts : Product[]=[];
  baseUrl: string = environment.appUrl;
  showProducts(){
    
  this._productService.getProducts().subscribe({
    next:(response : any)=>{
      this.allProducts =response.data;
      console.log(this.allProducts)
    }, 
    
    //respuestas positivas del back

    error:(error : any)=>{
      console.error(error);
    } //respuestas negativas del back (errores)
  })
  }
ngOnInit(): void {
  this.showProducts()
}
}
