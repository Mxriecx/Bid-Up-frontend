
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);


  if (!_loginService.isLoggedIn()) {

    Swal.fire({
      title: "No has iniciado sesion",
      icon: "error",
      draggable: true
    });
    _router.navigate(['/login']);
    return false;
  }


  if (!_loginService.isAdmin()) {
    Swal.fire({
      title: "No tienes permitido acceder a esta página, serás redireccionado al inicio",
      icon: "error",
      draggable: true
    });
   
    _router.navigate(['/']);
    return false;
  }

  return true;
};
