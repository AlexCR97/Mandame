import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {

  direccion: Direccion = {
    calle: '',
    numeroExterior: 0,
    colonia: '',
  };

  cargandoDialog;

  usuario: Usuario = CacheUsuario.usuario;

  constructor(
    public guiUtils: GuiUtilsService,
    public direccionesService: DireccionesService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  async intentarActualizacion() {
    console.log('Intentar actualizacion del perfil del usuario');

    console.log(this.usuario);
    console.log(this.direccion);

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Actualizando perfil de usuario...');

    this.direccionesService.agregarDireccion(this.usuario, this.direccion)
    .then(result => {
      console.log('El perfil del usuario ha sido actualizado con exito :)');
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('¡Perfil actualizado!', 3000, 'success');

      CacheUsuario.usuario = this.usuario;

      this.router.navigateByUrl('/direcciones');
    })
    .catch(error => {
      console.log('Error al completar el perfil del usuario :(');
      console.log(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('No se pudo actualizar tu perfil', 3000, 'danger');
    });
  }
  
  async regresarDirecciones(){
    this.router.navigateByUrl('/direcciones');
  }

}
