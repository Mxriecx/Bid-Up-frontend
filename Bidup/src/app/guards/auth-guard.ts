import { CanActivateFn } from '@angular/router';
import { Login } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
const _loginService = inject(Login);
  const _router = inject(Router);

  // validacion 1: inicio sesion?
  if (!_loginService.isLoggedIn()) {
    //redireccione a inicio de sesion
    alert("no has iniciado sesion");
    _router.navigate(['/login']);
    return false;
  }

  // validacion 2: es admin?

  if (!_loginService.isAdmin()) {
    alert("no tienes permitido no eres admin");
    _router.navigate(['/']);
    return false;
  }

  return true;
};
