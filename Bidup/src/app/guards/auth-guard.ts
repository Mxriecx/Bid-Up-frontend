// Los guards -> proteger contenido del front
// CanActivate -> protector de rutas  -> true o  false
// true -> que SI SE PUEDE MOSTRAR ESE CONTENIDO
// false -> que NO SE PUEDE MOSTRAR ESE CONTENIDO

import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  // 1. VALIDACIÓN 1: Ya inició sesión?
  if(!_loginService.isLoggedIn()){
    // redireccione a inicio de sesiòn 
    alert('No has iniciado sesión');
    _router.navigate(['/login']);
    return false;
  }

  // 2. VALIDACIÓN 2: Es administrador?
  if(!_loginService.isAdmin()){
    alert('No tienes permitido acceder a esta página, serás redireccionado al inicio');
    _router.navigate(['/']);
    return false;
  }

  return true;
};
