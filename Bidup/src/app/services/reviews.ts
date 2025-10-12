import { Injectable ,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reviews } from '../interfaces/reviews';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReviewSite {

  private _httpClient = inject(HttpClient);

  private apiUrl =  environment.appUrl

  postReview (newReview : Reviews) {
    return this._httpClient.post(this.apiUrl + "/reviews/crear", newReview);
  }

  // metodo GET

  getReview(){
    return this._httpClient.get(this.apiUrl + "/reviews/mostrar");
  }
  // metodo PUT

  putReview(modifyReview : Reviews , id : string){

    return this._httpClient.put(this.apiUrl + "/reviews/actualizar" + id ,modifyReview);
    // return this._httpClient.put(`${this.apiUrl}/users/`,userToUpdate,{params:{id , color , age}});
  }

  // metodo Delete
 
  deleteReview ( id : string){
    return this._httpClient.delete(this.apiUrl + "/reviews/borrar/" + id );
  }
  
}
