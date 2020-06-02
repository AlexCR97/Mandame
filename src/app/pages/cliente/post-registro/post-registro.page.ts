import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { RegistroService } from 'src/app/services/registro.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-registro',
  templateUrl: './post-registro.page.html',
  styleUrls: ['./post-registro.page.scss'],
})
export class PostRegistroPage implements OnInit {

  private segments = {
    segment1: 'Tu perfil',
    segment2: 'Número de teléfono',
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

  cargandoDialog;

  constructor(
    public guiUtils: GuiUtilsService,
    public registroService: RegistroService,
    public router: Router,
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

  async intentarActualizacion() {
    console.log('Intentar actualizacion del perfil del usuario');

    console.log(this.usuario);
    console.log(this.direccion);

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Actualizando perfil de usuario...');

    this.registroService.completarPerfilUsuario(this.usuario, this.direccion)
    .then(result => {
      console.log('El perfil del usuario ha sido actualizado con exito :)');
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('¡Perfil actualizado!', 3000, 'success');

      CacheUsuario.usuario = this.usuario;

      this.router.navigateByUrl('/inicio');
    })
    .catch(error => {
      console.log('Error al completar el perfil del usuario :(');
      console.log(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('No se pudo actualizar tu perfil', 3000, 'danger');
    });
  }
}
