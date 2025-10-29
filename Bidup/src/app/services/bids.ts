import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bids } from '../interfaces/bids';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  
  postBid(newBid: Bids) {
    return this._httpClient.post(this.apiUrl + '/bids/crear', newBid);
  }

  
  enviarPuja(productId: string, amount: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = { productId, amount };

    return this._httpClient.post(this.apiUrl + '/bids/crear', body, { headers });
  }

  
  getProducts() {
    return this._httpClient.get(this.apiUrl + '/bids/mostrar');
  }

  
  putProducts(modifyBid: Bids, id: string) {
    return this._httpClient.put(this.apiUrl + '/bids/actualizar/' + id, modifyBid);
  }

  
  deleteProducts(id: string) {
    return this._httpClient.delete(this.apiUrl + '/bids/borrar/' + id);
  }
}
