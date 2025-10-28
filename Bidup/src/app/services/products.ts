import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Productservice {


  private _httpClient = inject(HttpClient);



  private apiUrl =  environment.appUrl;

 

  postProduct(newProduct : Product){

    return this._httpClient.post(this.apiUrl + '/products/crear',newProduct)

  }


  getProducts (){
    return this._httpClient.get(this.apiUrl + '/products/mostrar');
  }


  putProducts (modifyProduct : Product, id : string){
    return this._httpClient.put(this.apiUrl + '/products/actualizar/' + id , modifyProduct )
  }



  deleteProducts (id : string){
    return this._httpClient.delete(this.apiUrl + '/products/eliminar/' + id)
  }

updateProduct(id: string, data: any) {
  return this._httpClient.put(`${this.apiUrl}/products/actualizar/${id}`, data);
}



  
}
