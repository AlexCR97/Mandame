import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { CacheUsuario } from 'src/app/cache/cache-usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario = CacheUsuario.usuario;

  anchorToolbar = false;
  showTitle = false;

  private segmentSuperior = 'ofertas';
  private segmentCentral = 'comida';
  private segmentInferior = 'todos';

  private menuPrincipal;
  private menuOpciones;
  private menuCuenta;

  private ofertasItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  private masVendidosItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  private proximamenteItems = [
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
    {
      imgSrc: '../../../assets/img/banner-inicio.png',
    },
  ];

  comidaItems = [
    {
      imgSrc: '../../../assets/img/burger_king.png',
      desc: 'Burger King',
    },
    {
      imgSrc: '../../../assets/img/burger_king.png',
      desc: 'Burger King',
    },
    {
      imgSrc: '../../../assets/img/burger_king.png',
      desc: 'Burger King',
    },
    {
      imgSrc: '../../../assets/img/burger_king.png',
      desc: 'Burger King',
    },
    {
      imgSrc: '../../../assets/img/burger_king.png',
      desc: 'Burger King',
    },
  ];

  ordenTodosItems = [
    {
      imgSrc: '../../../assets/img/pizzah.jpg',
      desc: 'Pizza de pepperoni',
      empresa: "Domino's",
      precio: 125.00,
      tiempo: '30 - 60 min.',
    },
    {
      imgSrc: '../../../assets/img/pizzah.jpg',
      desc: 'Hamburguesa con papas',
      empresa: "La Palapa",
      precio: 100.00,
      tiempo: '30 - 60 min.',
    },
    {
      imgSrc: '../../../assets/img/pizzah.jpg',
      desc: 'Pizza de pepperoni',
      empresa: "Domino's",
      precio: 125.00,
      tiempo: '30 - 60 min.',
    },
    {
      imgSrc: '../../../assets/img/pizzah.jpg',
      desc: 'Hamburguesa con papas',
      empresa: "La Palapa",
      precio: 100.00,
      tiempo: '30 - 60 min.',
    },
    {
      imgSrc: '../../../assets/img/pizzah.jpg',
      desc: 'Hamburguesa con papas',
      empresa: "La Palapa",
      precio: 100.00,
      tiempo: '30 - 60 min.',
    },
  ];

  constructor() { }

  ngOnInit() { }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.anchorToolbar = scrollTop >= 70;
      this.showTitle = scrollTop >= 70;
    }
  }
}
