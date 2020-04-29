import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';

@Component({
  selector: 'app-post-registro',
  templateUrl: './post-registro.page.html',
  styleUrls: ['./post-registro.page.scss'],
})
export class PostRegistroPage implements OnInit {

  private segments = {
    segment1: 'Tu perfil',
    segment2: 'Numero de telefono',
    segment3: 'Domicilio',
  };

  segmentId = 'segment1';
  segmentTitulo = this.segments[this.segmentId];

  // segment tu pefil
  foto: string;
  nombre: string;

  // segment numero de telefono
  telefono: string;

  // segment domicilio
  direccion: Direccion = {
    calle: '',
    numeroExterior: 0,
    colonia: '',
  };

  constructor() { }

  ngOnInit() { }

  cambiarSegment(segmentId: string) {
    this.segmentId = segmentId;
    this.segmentTitulo = this.segments[segmentId];
  }

  cambiarSegmentAnterior(segmentId: string) {
    switch (segmentId) {
      case 'segment2': {
        this.cambiarSegment('segment1');
        break;
      }
      case 'segment3': {
        this.cambiarSegment('segment2');
        break;
      }
    }
  }

  intentarActualizacion() {
    console.log('Intentar actualizacion del perfil del usuario');

    console.log(this.direccion);
  }
}
