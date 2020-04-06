import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  private segmentSuperior = 'ofertas';
  private segmentCentral = 'comida';
  private segmentInferior = 'todos';

  private menuPrincipal;
  private menuOpciones;
  private menuCuenta;


  constructor() { }

  ngOnInit() {
  }

}
