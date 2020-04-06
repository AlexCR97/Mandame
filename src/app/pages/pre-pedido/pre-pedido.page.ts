import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-pedido',
  templateUrl: './pre-pedido.page.html',
  styleUrls: ['./pre-pedido.page.scss'],
})
export class PrePedidoPage implements OnInit {

  complementos: any[] = [
    {
      Nombre: 'Complemento 1',
      Imagen: 'b1.svg',
      Precio: 15.5
    },
    {
      Nombre: 'Complemento 2',
      Imagen: 'b2.svg',
      Precio: 7.5
    },
    {
      Nombre: 'Complemento 3',
      Imagen: 'b3.svg',
      Precio: 12.3
    },
    {
      Nombre: 'Complemento 4',
      Imagen: 'b4.svg',
      Precio: 10.0
    },
    {
      Nombre: 'Complemento 5',
      Imagen: 'b5.svg',
      Precio: 25.5
    },
    {
      Nombre: 'Complemento 1',
      Imagen: 'b1.svg',
      Precio: 10.0
    },
    {
      Nombre: 'Complemento 2',
      Imagen: 'b2.svg',
      Precio: 11.0
    },
    {
      Nombre: 'Complemento 3',
      Imagen: 'b3.svg',
      Precio: 10.0
    },
    {
      Nombre: 'Complemento 4',
      Imagen: 'b4.svg',
      Precio: 12.0
    }
  ];
  ordenes: any[] = [
    {
      Nombre: 'Pizza Hawaiana',
      Precio: 100.50,
      Cantidad: 2
    },
    {
      Nombre: 'Pizza Carnes Frias',
      Precio: 150.25,
      Cantidad: 1
    }
  ];
  direccionEntrega: any;

  costoEnvio = 45.0;
  subTotal = 0;
  total = 0;

  constructor() {
    console.log('constructor call');
    this.calcularTotal();
  }

  ngOnInit() {
  }

  calcularTotal() {
    console.log('CalcularTotal():');

    this.complementos.forEach(c => {
      this.subTotal += c.Precio;
      console.log(c);
    });

    this.ordenes.forEach(o => {
      console.log(o);
      this.subTotal += o.Precio * o.Cantidad;
    });

    this.total += this.subTotal + this.costoEnvio;
  }

  increase() {
    console.log('Increasing!');
  }

  decrease() {
    console.log('Decreasing!');
  }
}
