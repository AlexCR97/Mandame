import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-pedidos',
  templateUrl: './tab-pedidos.page.html',
  styleUrls: ['./tab-pedidos.page.scss'],
})
export class TabPedidosPage implements OnInit {

  pedidosEnTransito = [
    {
      imgSrc: '../../../../assets/img/carls_jr.jpeg',
      descripcion: "Carl's Jr",
    },
    {
      imgSrc: '../../../../assets/img/churchs.jfif',
      descripcion: "Church's",
    },
  ];

  pedidosPendientes = [
    {
      imgSrc: '../../../../assets/img/dominos.png',
      descripcion: "Domino's Pizza",
    },
    {
      imgSrc: '../../../../assets/img/burger_king.png',
      descripcion: "Burger King",
    },
  ];

  pedidosConcluidos = [
    {
      imgSrc: '../../../../assets/img/carls_jr.jpeg',
      descripcion: "Carl's Jr",
    },
    {
      imgSrc: '../../../../assets/img/dominos.png',
      descripcion: "Domino's Pizza",
    },
    {
      imgSrc: '../../../../assets/img/churchs.jfif',
      descripcion: "Church's",
    },
    {
      imgSrc: '../../../../assets/img/burger_king.png',
      descripcion: "Burger King",
    },
  ];

  constructor() { }

  ngOnInit() { }

}
