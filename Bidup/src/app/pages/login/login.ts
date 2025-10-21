import { Component } from '@angular/core';
// Formularios reactivos -> cada cosa que el usuario escriba sea reconocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credencials } from '../../interfaces/credencials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm = new FormGroup({
    emailLogin: new FormControl('' ),
    passwordLogin: new FormControl('')
  });

  handleSubmit(): void {
    if (this.loginForm.invalid) {
            return;
    }

    const email = this.loginForm.value.emailLogin;
    const password = this.loginForm.value.passwordLogin;
    console.log(email, password);
  }
}
