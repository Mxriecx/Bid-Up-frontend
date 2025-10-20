import { Injectable , inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencials } from '../interfaces/credencials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; // para decodificar el token y poder saber si inicio sesion un admin o no 
import { Router } from '@angular/router'; //redireccionar a otras paginas al iniciar sesion


@Injectable({
  providedIn: 'root'
})
export class Login {
    
  private _httpClient =inject(HttpClient);
  private _router =inject(Router);
  private apiURL = environment.appUrl;

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

  salirLogout(){
  localStorage.removeItem("token");
  alert("cierre de sesion exitoso");
  this._router.navigate(["/login"]);
}

isLoggedIn(){
  return this.getToken() ? true : false;

  //si no hay token no esta logueado, sisi lo hay inicio de sesion
}
}
