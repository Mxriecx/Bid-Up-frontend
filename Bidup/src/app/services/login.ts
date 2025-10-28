import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencials } from '../interfaces/credencials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // para decodificar el token y poder saber si inicio sesion un admin o no 
import { Router } from '@angular/router'; //redireccionar a otras paginas al iniciar sesion
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Login {
  
     
  private _httpClient =inject(HttpClient);
  private _router =inject(Router);
  private apiURL = environment.appUrl;
// señal para el estado de inicio de sesión
  isLoggedInSignal = signal<boolean>(false);
  isAdminSignal = signal<boolean>(false);


login(credencialesIngreso :Credencials){
  return this._httpClient.post(this.apiURL+ "/login",credencialesIngreso)
}

getToken(){
  //viene del localstorage - almacenamiento temporal

  return localStorage.getItem("token");
}

isAdmin(){
  const token =this.getToken();
  if(token){
    const decoded : any = jwtDecode(token);
    
    return decoded.admin === true ? true : false;

  }else{
    console.log("no se encontro token");
    return  false;
  }

}

redirecTo(){
  if(this.isAdmin()){
    this._router.navigate(["/admin"]);

  }else{
    this._router.navigate(["/"])

  }
  }

  // 2.5 el cierre de sesión
  logout(){
    localStorage.removeItem('token');
    alert('Cierre de sesión exitoso, Vuelve pronto!');
    this._router.navigate(['/login']);
  }

  //2.6 Validar si el usuario ya inició sesión
  isLoggedIn(){
    return this.getToken() ? true : false;
  }//si no hay token, no esta logueado, si sí lo hay, entonces sí inició sesión
  

}