import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';
import { LoginService } from '../../services/login';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  private _loginservice = inject(LoginService);


  LoginForm = new FormGroup({
    emailLogin: new FormControl("",[Validators.required,Validators.email]),
    passwordLogin: new FormControl("",[Validators.required, Validators.minLength(3)])
  })

  // manejo de eventos
  handleSubmit() {

    //const email =this.LoginForm.value.emailLogin;
    //const password = this.LoginForm.value.passwordLogin;
    //console.log(email,password);

    if(this.LoginForm.invalid){
      this.LoginForm.markAllAsTouched();
      return; // poder agregar estilos 
    }

    const credenciales: Credencials = {
      emaillogin: this.LoginForm.value.emailLogin || "",
      passwordlogin: this.LoginForm.value.passwordLogin || ""

    }

    console.log("credenciales de ingreso", credenciales);
    //logica de la peticion del backend para el incio de sesion

    this._loginservice.login(credenciales).subscribe({
      next: (res: any) => {
        console.log(res);


        if (res) {
          // guardar el token en el local storage
          localStorage.setItem("token", res.token);
       
          Swal.fire({
            title: "Bienvenido a tu cuenta!",
            icon: "success",
            draggable: true
          });

          this._loginservice.redirecTo();
        }
      },
      error: (err: any) => {
        Swal.fire({
            title: "Usuario o contrasena incorrecta",
            text: err.error.mensaje,
            icon: "error",
            draggable: true
          });
      },
    })




  }

}