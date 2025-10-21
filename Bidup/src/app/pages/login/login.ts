import { Component } from '@angular/core';
import { ReactiveFormsModule , FormControl , FormGroup , Validators } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 LoginForm = new FormGroup({
    emailLogin : new FormControl(""),
    passwordLogin : new FormControl("")
  })

  // manejo de eventos
  handleSubmit(){

    const email =this.LoginForm.value.emailLogin;
    const password = this.LoginForm.value.passwordLogin;

    console.log(email,password);
  }
}
