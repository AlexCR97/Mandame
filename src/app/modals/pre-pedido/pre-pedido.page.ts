import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-pedido',
  templateUrl: './pre-pedido.page.html',
  styleUrls: ['./pre-pedido.page.scss'],
})
export class PrePedidoPage implements OnInit {

  nombreNegocio = "Domino's Pizza"

  complementoItems = [
    {
      desc: 'Complemento 1',
      imgSrc: '../../../assets/img/b1.svg',
      precio: 15.5,
    },
    {
      desc: 'Complemento 2',
      imgSrc: '../../../assets/img/b2.svg',
      precio: 15.5,
    },
    {
      desc: 'Complemento 3',
      imgSrc: '../../../assets/img/b3.svg',
      precio: 15.5,
    },
    {
      desc: 'Complemento 4',
      imgSrc: '../../../assets/img/b4.svg',
      precio: 15.5,
    },
    {
      desc: 'Complemento 5',
      imgSrc: '../../../assets/img/b5.svg',
      precio: 15.5,
    },
    {
      desc: 'Complemento 6',
      imgSrc: '../../../assets/img/b1.svg',
      precio: 15.5,
    },
  ];

  ordenItems = [
    {
      desc: 'Pizza Hawaiana',
      precio: 100.50,
      cantidad: 2
    },
    {
      desc: 'Pizza Carnes Frias',
      precio: 150.25,
      cantidad: 1
    },
    {
      desc: 'Pizza Hawaiana',
      precio: 100.50,
      cantidad: 2
    },
    {
      desc: 'Pizza Carnes Frias',
      precio: 150.25,
      cantidad: 1
    },
  ];

  direccionEntrega = {
    nombreCasa: 'Nombre de casa',
    direccion: 'Calle Lorem Ipsum #000 Colonia',
  };

  costoEnvio = 45.00;
  subTotal = 0;
  total = 0;

  constructor() {
    console.log('constructor call');
    this.calcularTotal();
  }

  ngOnInit() { }

  calcularTotal() {
    console.log('CalcularTotal():');

    this.complementoItems.forEach(c => {
      this.subTotal += c.precio;
      console.log(c);
    });

    this.ordenItems.forEach(o => {
      console.log(o);
      this.subTotal += o.precio * o.cantidad;
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
