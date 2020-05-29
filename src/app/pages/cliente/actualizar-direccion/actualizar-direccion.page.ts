import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/dbdocs/direccion';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-direccion',
  templateUrl: './actualizar-direccion.page.html',
  styleUrls: ['./actualizar-direccion.page.scss'],
})
export class ActualizarDireccionPage implements OnInit {

  direccion: Direccion = {
    calle: '',
    numeroExterior: 0,
    colonia: '',
  };

  cargandoDialog;

  usuario: Usuario = CacheUsuario.usuario;
  uidDireccion: string;
  constructor(
    public activatedRoute:ActivatedRoute,
    public guiUtils: GuiUtilsService,
    public direccionesService: DireccionesService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.uidDireccion = this.activatedRoute.snapshot.queryParamMap.get("uidDireccion");
    this.direccionesService.getDireccion(this.uidDireccion).subscribe(direccion => {
      this.direccion = direccion
  });
  }



  async intentarActualizacion() {
    console.log('Intentar actualizacion del perfil del usuario');

    console.log(this.usuario);
    console.log(this.direccion);

    this.cargandoDialog = await this.guiUtils.mostrarCargando('Actualizando perfil de usuario...');

    this.direccionesService.actualizarDireccion(this.uidDireccion,this.direccion)
    .then(result => {
      console.log('El perfil del usuario ha sido actualizado con exito :)');
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('¡Dirección Agregada!', 3000, 'success');

      CacheUsuario.usuario = this.usuario;

      this.router.navigateByUrl('/direcciones');
    })
    .catch(error => {
      console.log('Error al completar el perfil del usuario :(');
      console.log(error);
      this.guiUtils.cerrarCargando(this.cargandoDialog);
      this.guiUtils.mostrarToast('No se pudo agregar la dirección', 3000, 'danger');
    });
  }
  
  async regresarDirecciones(){
    this.router.navigateByUrl('/direcciones');
  }

}