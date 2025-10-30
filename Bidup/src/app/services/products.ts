import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
//inyeccion de dependencias y/o directivas de Angular

  private _httpClient = inject(HttpClient);

  // Definir la ruta de acceso al backend

  private apiUrl =  environment.appUrl;

  // metodos para hacer las peticiones :

  // 1. peticion post

  postProduct(productToCreate: FormData | Product) {
    return this._httpClient.post(this.apiUrl + '/products/crear', productToCreate);
  }


  // peticion get
  getProducts (){
    return this._httpClient.get(this.apiUrl + '/products/mostrar');
  }

  //peticion put
  putProducts (modifyProduct :FormData | Product, id : string){
    return this._httpClient.put(this.apiUrl + '/products/actualizar/' + id , modifyProduct )
  }


  //peticion delete
  deleteProducts (id : string){
    return this._httpClient.delete(this.apiUrl + '/products/eliminar/' + id)
  }




  
}
