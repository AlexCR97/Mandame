import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuiUtilsService {

  constructor(
    private alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  async mostrarAlertaConfirmar(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      mode: 'ios',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string, duracion?: number, color?: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: (duracion == undefined)? 3000 : duracion,
      color: color,
    });

    toast.present();
  }

  async mostrarCargando(mensaje: string) {
    const cargandoDialog = await this.loadingController.create({
      message: mensaje,
    });

    cargandoDialog.present();

    return cargandoDialog;
  }

  async cerrarCargando(cargandoDialog) {
    if (cargandoDialog == undefined) {
      return;
    }

    if (cargandoDialog == null) {
      return;
    }
    
    cargandoDialog.dismiss();
  }

}
