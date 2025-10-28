import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";
import { Login } from './services/login';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _login = inject(Login);
  isInvisible = computed(()=>this._login.isAdminSignal());
  // Si es administrador isInvisible = true
  // Si no es administrador isInvisible = false

  protected readonly title = signal('Bidup');
}
