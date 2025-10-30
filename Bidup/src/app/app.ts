import { Component, inject ,computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";
import { LoginService } from './services/login';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 private _loginService =inject(LoginService);

 admin = computed(()=> this._loginService.isAdminSignal());

}