import { Component } from '@angular/core';
import { Carrusel } from '../../components/carrusel/carrusel';
import { Card } from '../../components/card/card';


@Component({
  selector: 'app-home',
  imports: [Carrusel,Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
