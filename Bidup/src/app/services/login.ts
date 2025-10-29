import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencials } from '../interfaces/credencials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; //para decodificar el token y poder saber si inicio sesion un admin o no
import { Router } from '@angular/router'; //para redireccionar a otras paginas al iniciar sesiòn
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // 1.Inyectar y definir variables
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appUrl;
  // señal para el estado de inicio de sesión
  isLoggedInSignal = signal<boolean>(false);  //Las señales son reactivas notifican los cambios de estado
  isAdminSignal = signal<boolean>(false);

  // 2. desarrollar la lógica del servicio
  // 2.1 La petición POST
  login(loginCredentials : Credencials){
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredentials);
  }


  // 2.2 Decirle al navegador de donde va a obtener el token
  getToken(){
    // viene del localStorage -> almacenamiento temporal
    return localStorage.getItem('token'); //obtenemos el token del navegador
    
  }

  // 2.3 Validar si es rol de administrador o no
  // este método retorna TRUE o FALSE -> dependiendo de si es administrador o no
  isAdmin(){
    // primero necesito obtener el token
    const token = this.getToken();
    // En caso de que sí haya token, decodifiquelo
    if(token){
      const decoded : any = jwtDecode(token);
      this.isAdminSignal.set(decoded.admin === true ? true : false);
      return decoded.admin === true ? true : false;
    }else{
      console.log('No se encontró token');
      this.isAdminSignal.set(false);
      return false;
    }
  }

  // 2.4 redireccion una vez que ya inició sesión
  redirectTo(){
    // si es administrador, que redireccione a /admin
    if(this.isAdmin()){
      this._router.navigate(['/dashboard']);
    }else{
      this._router.navigate(['/']);
    }
  }

  // 2.5 el cierre de sesión
  logout(){
    localStorage.removeItem('token');
    this.isLoggedInSignal.set(false);
    this.isAdminSignal.set(false);
    alert('Cierre de sesión exitoso, Vuelve pronto!');
    this._router.navigate(['/login']);
  }

  //2.6 Validar si el usuario ya inició sesión
  isLoggedIn(){
    if(this.getToken()){
      this.isLoggedInSignal.set(true);  
      return true;
    } else{
      this.isLoggedInSignal.set(false);
      return false;
    }

    //return this.getToken() ? true : false;
  }//si no hay token, no esta logueado, si sí lo hay, entonces sí inició sesión
}
