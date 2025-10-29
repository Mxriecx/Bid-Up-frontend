import { Component , inject } from '@angular/core';
// Formularios reactivos -> cada cosa que el usuario escriba sea reconocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2'; //libreria para mostrar alertas bonitas

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Variables e injeccion de servicios
  private _loginService = inject(LoginService);

  // validadores con Angular
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  // manejo de eventos
  handleSubmit() {
    // const email = this.loginForm.value.emailLogin
    // const password = this.loginForm.value.passwordLogin
    // console.log(email, password)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); //poder agregar estilos -> marcamos todos los inputs como activados
      return;//pare acá y no siga
    }

    const credenciales: Credencials = {
      emaillogin: this.loginForm.value.emailLogin || "",
      passwordlogin: this.loginForm.value.passwordLogin || ""

    }

    console.log('Credenciales para Login', credenciales);

    this._loginService.login(credenciales).subscribe({
      // manejo de la respuesta o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          // guardar el token en el local Storage
          localStorage.setItem('token', res.token);

          // mensaje de respuesta
          Swal.fire({
            title: "Bien!",
            text: res.mensaje,
            icon: "success",
            draggable: true
          });
          // redireción
          this._loginService.redirectTo();
        }
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
        Swal.fire({
          title: "Oops!",
          text: err.error.mensaje,
          icon: "error",
          draggable: true
        });
      }
    });
  }
}