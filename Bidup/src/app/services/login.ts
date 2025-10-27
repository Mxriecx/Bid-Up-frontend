
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencials } from '../interfaces/credencials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // para decodificar el token y poder saber si inicio sesion un admin o no 
import { Router } from '@angular/router';
import { signal } from '@angular/core'; //redireccionar a otras paginas al iniciar sesion



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiURL = environment.appUrl;

  //senal para inicio de sesion (para que vuelva a salir el navbar)
  isLoggedInSignal = signal<boolean>(false);
  isAdminSignal = signal<boolean>(false);


  login(credencialesIngreso: Credencials) {
    return this._httpClient.post(this.apiURL + "/login", credencialesIngreso)
  }

  getToken() {
    //viene del localstorage - almacenamiento temporal

    return localStorage.getItem("token");
  }

  isAdmin() {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.isAdminSignal.set(decoded.admin === true ? true : false);
      return decoded.admin === true ? true : false;

    } else {
      console.log("no se encontro token");
      this.isAdminSignal.set(false);
      return false;
    }
  }

  redirecTo() {
    if (this.isAdmin()) {
      this._router.navigate(["/admin"]);

    } else {
      this._router.navigate(["/"])

    }
  }

  salirLogout() {
    localStorage.removeItem("token");
    this.isLoggedInSignal.set(false);
    this.isAdminSignal.set(false);
    alert("cierre de sesion exitoso");
    this._router.navigate(["/login"]);
  }

  isLoggedIn() {
    //this.isLoggedInSignal.set(this.getToken()? true : false)
    if (this.getToken()) {

      this.isLoggedInSignal.set(true);

    } else {
      this.isLoggedInSignal.set(false);
    }
    return this.getToken() ? true : false;

    //si no hay token no esta logueado, sisi lo hay inicio de sesion

    //si no hay token no esta logueado, sisi lo hay inicio de sesion
  }
}
