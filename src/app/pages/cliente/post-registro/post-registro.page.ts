import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { RegistroService } from 'src/app/services/registro.service';

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

  direccion: Direccion = {
    calle: '',
    numeroExterior: 0,
    colonia: '',
  };

  usuario: Usuario = CacheUsuario.usuario;

  constructor(
    public registroService: RegistroService,
  ) { }

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

    console.log(this.usuario);
    console.log(this.direccion);

    this.registroService.completarPerfilUsuario(this.usuario, this.direccion)
    .then(result => {
      console.log('El perfil del usuario ha sido actualizado con exito :)');

      CacheUsuario.usuario = this.usuario;

      this.testDireccionesDelUsuario();
    })
    .catch(error => {
      console.log('Error al completar el perfil del usuario :(');
      console.log(error);
    });
  }

  private testDireccionesDelUsuario() {
    console.log('Obteniendo direcciones del usuario...');

    this.registroService.getDireccionesUsuario(this.usuario.uid,
      direcciones => {
        console.log('Direcciones del usuario obtenidas :D');
        direcciones.forEach(direccion => console.log(direccion));
      }
    );
  }
}
