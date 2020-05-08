import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuiUtilsService {

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

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
    cargandoDialog.dismiss();
  }

}
