import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { Carrusel } from '../../components/carrusel/carrusel';


@Component({
  selector: 'app-home',
  imports: [Carrusel,Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
