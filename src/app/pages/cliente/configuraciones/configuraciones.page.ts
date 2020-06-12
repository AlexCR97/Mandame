import { Component, OnInit } from '@angular/core';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Usuario } from 'src/app/dbdocs/usuario';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {

  cargandoDialog;
  fotoPorDefecto = '../../../../assets/img/perfil_prueba.JPG';
  usuario: Usuario = CacheUsuario.usuario;

  constructor(
    public guiUtils: GuiUtilsService,
    public imagenesService: ImagenesService,
  ) { }

  ngOnInit() {
    console.log('Usuario:');
    console.log(this.usuario);
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

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Actualizando...');
    this.imagenesService.subirImagen(archivos.item(0), `perfil-usuarios/${this.usuario.uid}`,
      porcentaje => {
        console.log('Porcentaje: ' + porcentaje);
      },
      url => {
        console.log('Url: ' + url);
        console.log('Actualizando foto del usuario en la base de datos...');

        this.imagenesService.actualizarImagenUsuario(this.usuario.uid, url)
        .then(() => {
          console.log('Foto actualizada! :D');

          CacheUsuario.usuario.foto = url;
          this.usuario = CacheUsuario.usuario;

          this.guiUtils.cerrarCargando(this.cargandoDialog);
          this.guiUtils.mostrarToast('Foto actualizada! :D', 3000, 'success');
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
