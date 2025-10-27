import { Component, inject } from '@angular/core';
// Formularios reactivos -> cada cosa que el usuario escriba sea reconocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  private _loginservice = inject(LoginService);

  loginForm = new FormGroup({
    emailLogin: new FormControl(''),
    passwordLogin: new FormControl('')
  });

  handleSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return; // poder agregar estilos 
    }

    const credenciales: Credencials = {
      emaillogin: this.loginForm.value.emailLogin || "",
      passwordlogin: this.loginForm.value.passwordLogin || ""

    }

    console.log("credenciales de Ingreso", credenciales);
    this._loginservice.login(credenciales).subscribe({
      next: (res: any) => {
        console.log(res);


        if (res) {
          // guardar el token en el local storage
          localStorage.setItem("token", res.token);
       
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true
          });

          this._loginservice.redirecTo();
        }
      },
      error: (err: any) => {
        Swal.fire({
            title: "Stop!",
            text: err.error.mensaje,
            icon: "error",
            draggable: true
          });
      },
    })




  }
}
