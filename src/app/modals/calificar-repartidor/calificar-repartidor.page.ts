import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificar-repartidor',
  templateUrl: './calificar-repartidor.page.html',
  styleUrls: ['./calificar-repartidor.page.scss'],
})
export class CalificarRepartidorPage implements OnInit {

  nombre:string;
  foto:string;
  comentario:string;

  constructor() { }

  ngOnInit() {
    this.nombre = "Edgar";
    this.foto = "../../../assets/img/fotodegary.jpg";
  }

}
