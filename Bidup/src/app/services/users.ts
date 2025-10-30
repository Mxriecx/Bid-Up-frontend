
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  postUser(newUser: User) {
    return this._httpClient.post(this.apiUrl + "/users/crear", newUser);
  }

  getUser() {
    return this._httpClient.get(this.apiUrl + "/users/mostrar");
  }

  putUser(modifyUser: User, id: string) {

    return this._httpClient.put(this.apiUrl + "/users/actualizar" + id, modifyUser);
    // return this._httpClient.put(`${this.apiUrl}/users/`,userToUpdate,{params:{id , color , age}});
  }

  deleteUser(id: string) {
    return this._httpClient.delete(this.apiUrl + "/users/borrar/" + id);
  }

  updateUser(id: string, data: any) {
    return this._httpClient.put(`${this.apiUrl}/users/${id}`, data);
  }
}
