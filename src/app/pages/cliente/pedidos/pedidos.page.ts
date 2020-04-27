import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any[];

  constructor() { }

  ngOnInit() {
    this.pedidos = [
      {
        img: "../../../assets/img/pizzah.jpg",
        estado: 1,
        titulo: "Pizza Hawaiana",
        negocio: "Domino's Pizza",
        repartidor: "Edgar Vazquez"
      },
      {
        img: "../../../assets/img/pizzah.jpg",
        estado: 3,
        titulo: "Pizza Pepperoni",
        negocio: "Domino's Pizza",
        repartidor: "Rie Takahashi"
      }
    ]
  }

}
