import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { RegistroService } from 'src/app/services/registro.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { SafeDocsService } from 'src/app/services/safe-docs.service';

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
    entreCalle1: '',
    entreCalle2: '',
    numeroExterior: undefined as number,
    numeroInterior: undefined as number,
    colonia: '',
  };

  fotoPorDefecto = '../../../../assets/img/perfil_prueba.JPG';
  usuario: Usuario = CacheUsuario.usuario;

  cargandoDialog;

  constructor(
    private guiUtils: GuiUtilsService,
    private imagenService: ImagenesService,
    private registroService: RegistroService,
    private router: Router,
    private safeDocs: SafeDocsService,
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

    let direccionSafe = this.safeDocs.direccion(this.direccion);

    this.registroService.completarPerfilUsuario(this.usuario, direccionSafe)
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

  onCambiarImagenClick() {
    console.log('onCambiarImagenClick()');
    document.getElementById('inputCambiarImagen').click();
  }

  async onInputCambiarImagen(archivos: FileList) {
    console.log('onInputCambiarImagen()');

    if (archivos.length == 0) {
      console.log('Ningun archivo seleccionado :(');
      return;
    }

    console.log('El archivo seleccionado es:');
    console.log(archivos.item(0));

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Eligiendo imagen...');
    this.imagenService.subirImagen(archivos.item(0), `perfil-usuarios/${this.usuario.uid}`,
      porcentaje => {
        console.log('Porcentaje: ' + porcentaje);
      },
      url => {
        console.log('Url: ' + url);
        console.log('Actualizando foto del usuario en la base de datos...');

        this.imagenService.actualizarImagenUsuario(this.usuario.uid, url)
        .then(() => {
          console.log('Foto actualizada! :D');

          CacheUsuario.usuario.foto = url;
          this.usuario = CacheUsuario.usuario;

          this.guiUtils.cerrarCargando(this.cargandoDialog);
        })
        .catch(error => {
          console.error('Error al actualizar la foto del usuario :(');
          console.error(error);

          this.guiUtils.cerrarCargando(this.cargandoDialog);
          this.guiUtils.mostrarToast('Error al actualizar la foto del usuario :(', 3000, 'danger');
        });
      },
      error => {
        console.error('Error al subir la imagen :(');
        console.error(error);

        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.guiUtils.mostrarToast('No se pudo actualizar to foto :(', 3000, 'danger');
      }
    );
  }
}
