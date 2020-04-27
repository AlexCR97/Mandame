import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  direcciones: any[];

  constructor() { }

  ngOnInit() {
    this.direcciones = [
      {
        casa: "Nombre de la Casa",
        direccion: "Calle Lorem Ipsun #00 Colonia"

      },
      {
        casa: "Nombre de la Casa",
        direccion: "Calle Lorem Ipsun #00 Colonia"
      }
    ]
  }

}
