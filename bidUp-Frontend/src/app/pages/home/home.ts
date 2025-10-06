import { Component } from '@angular/core';
// 1. Importar la clase del componente y agregarlo a los imports
import { Navbar } from '../../components/navbar/navbar';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  imports: [Navbar, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}