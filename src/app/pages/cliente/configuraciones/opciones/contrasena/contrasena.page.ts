import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonInput } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { CacheUsuario } from 'src/app/services/cache-usuario';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {

  @ViewChild(IonButton,{static: false}) boton: IonButton;
  @ViewChild("antigua", {static: false}) antigua: IonInput;
  @ViewChild("nueva", {static: false}) nueva: IonInput;

  password = '';
  confirmPassword = '';
  cargandoDialog;

  constructor(
    public configService: ConfiguracionesService,
    public guiUtils: GuiUtilsService,
    public loadingController: LoadingController,
    private navController: NavController,
    public toastController: ToastController
  ) {
    this.password = '';
    this.confirmPassword = '';
  }

  habilitarTexto() {
    this.nueva.disabled = false;
  }

  habilitarBoton() {
    this.boton.disabled = false;
  }

  async confirm() {
    // contrasenas validas
    if (this.password == this.confirmPassword) {
      this.cargandoDialog = await this.guiUtils.mostrarCargando('Cambiando tu contraseña...');

      this.configService.actualizarContrasena(CacheUsuario.usuario.uid, this.confirmPassword)
      .then(() => {
        console.log('Exito al cambiar contrasena :D');
        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.guiUtils.mostrarToast('¡Tu contraseña ha sido cambiada! :D', 3000, 'success');

        this.navController.back();
      })
      .catch(error => {
        console.error('Error al cambiar contrasena :(');
        console.error(error);
        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.guiUtils.mostrarToast('No se pudo cambiar tu contraseña :(', 3000, 'danger');
      });
    }
    // contrasenas invalidas
    else {
      this.guiUtils.mostrarToast('Verifica que las contraseñas sean iguales', 3000, 'danger');
    }
  }
}
