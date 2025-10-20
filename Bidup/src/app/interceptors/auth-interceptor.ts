import { HttpInterceptorFn } from '@angular/common/http';
import { Login } from '../services/login';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

 const _loginService =inject(Login);
  const token = _loginService.getToken();

  const request = token ? req.clone({setHeaders:{Authorization: "bearer" + token}}) : req;



  return next(req);


  return next(req);
};