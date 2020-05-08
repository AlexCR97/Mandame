import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-comida-seleccionada',
  templateUrl: './detalles-comida-seleccionada.page.html',
  styleUrls: ['./detalles-comida-seleccionada.page.scss'],
})
export class DetallesComidaSeleccionadaPage implements OnInit {

  adicionales = [];

  constructor() {
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this.adicionales.push(
      {
        nombre: "Adicional 2",
        precio: 1.50
      }
    );
    this.adicionales.push({
      nombre: "Adicional 1",
      precio: 15.25
    });
  }
}
