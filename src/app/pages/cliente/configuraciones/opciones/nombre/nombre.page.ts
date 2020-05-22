import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.page.html',
  styleUrls: ['./nombre.page.scss'],
})
export class NombrePage implements OnInit {

  @ViewChild(IonButton, {static: false}) guardar: IonButton;

  nuevoNombre: string;
  nuevoApellido: string;
  cargandoDialog;

  constructor(
    public configService: ConfiguracionesService,
    public guiUtls: GuiUtilsService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navController: NavController
   ) { }

  ngOnInit() {
    this.nuevoNombre = CacheUsuario.usuario.nombre;
    this.nuevoApellido = CacheUsuario.usuario.apellido;
  }

  habilitar() {
    this.guardar.disabled = false;
  }

  async save() {
    // datos invalidos
    if (this.nuevoNombre.length < 3 || this.nuevoApellido.length < 3) {
      this.guiUtls.mostrarToast('Nombre invalido', 3000, 'danger');
    }
    // datos validos
    else {
      this.cargandoDialog = await this.guiUtls.mostrarCargando('Cambiando tu nombre...');

      this.configService.actualizarNombre(CacheUsuario.usuario.uid, this.nuevoNombre, this.nuevoApellido)
      .then(() => {
        console.log('Exito al cambiar nombre');
        this.guiUtls.cerrarCargando(this.cargandoDialog);
        this.guiUtls.mostrarToast('¡Tu nombre ha sido cambiado! :D', 3000, 'success');

        CacheUsuario.usuario.nombre = this.nuevoNombre;
        CacheUsuario.usuario.apellido = this.nuevoApellido;

        this.navController.back();
        this.navController.back();
      })
      .catch(error => {
        console.error('Error al cambiar nombre');
        console.error(error);
        this.guiUtls.cerrarCargando(this.cargandoDialog);
        this.guiUtls.mostrarToast('No se pudo cambiar tu nombre :(', 3000, 'danger');
      });
    }
  }
}
