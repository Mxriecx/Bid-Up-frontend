import { Injectable , inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bids } from '../interfaces/bids';


@Injectable({
  providedIn: 'root'
})
export class Bid {
  
  private _httpClient = inject(HttpClient);

  // Definir la ruta de acceso al backend

  private apiUrl =  environment.appUrl;


  // metodos para hacer las peticiones :

  // 1. peticion post

  postBid(newBid : Bids){

    return this._httpClient.post(this.apiUrl + '/bids/crear',newBid)

  }

  // peticion get
  getProducts (){
    return this._httpClient.get(this.apiUrl + '/bids/mostrar');
  }

  //peticion put
  putProducts (modifyBid : Bids, id : string){
    return this._httpClient.put(this.apiUrl + '/bids/actualizar/' + id , modifyBid )
  }


  //peticion delete
  deleteProducts (id : string){
    return this._httpClient.delete(this.apiUrl + '/bids/borrar/' + id)
  }




 
}
