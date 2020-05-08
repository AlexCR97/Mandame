import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-repartidores',
  templateUrl: './tab-repartidores.page.html',
  styleUrls: ['./tab-repartidores.page.scss'],
})
export class TabRepartidoresPage implements OnInit {

  repartidores = [
    {
      imgSrc: '../../../../assets/img/foto-perfil-01.jpg',
      usuario: 'Barbara Blade',
      estado: 'Disponible',
    },
    {
      imgSrc: '../../../../assets/img/foto-perfil-02.jpg',
      usuario: 'Eloyito Guemez',
      estado: 'Disponible',
    },
    {
      imgSrc: '../../../../assets/img/foto-perfil-03.jpg',
      usuario: 'Armando Casas',
      estado: 'Entregando',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
