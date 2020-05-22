import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/dbdocs/usuario';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
})
export class TelefonoPage implements OnInit {

  antiguoTelefono: string;
  nuevoTelefono: string = '';
  cargandoDialog;

  constructor(
    public configService: ConfiguracionesService,
    public guiUtils: GuiUtilsService,
    public navController: NavController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.antiguoTelefono = CacheUsuario.usuario.telefono;
  }

  async guardarDatos() {
    // telefono invalido
    if (this.nuevoTelefono.length < 9) {
      this.guiUtils.mostrarToast('Telefono invalido', 3000, 'danger');
    }
    // telefono valido
    else {
      this.cargandoDialog = await this.guiUtils.mostrarCargando('Cambiando telefono...');
      
      this.configService.actualizarTelefono(CacheUsuario.usuario.uid, this.nuevoTelefono)
      .then(() => {
        console.log('Exito al cambiar telefono :D');
        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.guiUtils.mostrarToast('¡Se ha cambiado tu numero de telefono! :D', 3000, 'success');

        CacheUsuario.usuario.telefono = this.nuevoTelefono;

        this.navController.back();
        this.navController.back();
      })
      .catch(error => {
        console.error('Error al cambiar telefono :(');
        console.error(error);

        this.guiUtils.cerrarCargando(this.cargandoDialog);
        this.guiUtils.mostrarToast('No se pudo cambiar tu telefono :(', 3000, 'danger');
      });
    }
  }
}
