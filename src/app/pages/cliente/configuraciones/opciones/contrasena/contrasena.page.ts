import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonInput } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {

  @ViewChild(IonButton,{static: false}) boton: IonButton;
  @ViewChild("antigua", {static: false}) antigua: IonInput;
  @ViewChild("nueva", {static: false}) nueva: IonInput;

  password: string | number;
  newPassword: string | number;

  constructor(
    public loadingController: LoadingController,
    private navCtrl: NavController,
    public toastController: ToastController) {

      this.password = '';
      this.newPassword = '';

    }

  habilitarTexto(){
    this.nueva.disabled = false;
  }

  habilitarBoton(){
    this.boton.disabled = false;
  }

  confirm(){
    if( this.password === this.newPassword ){
      this.presentLoading();
    }else{
      this.errorToast();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.navCtrl.back();
    this.successToast();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no son iguales',
      color: "danger",
      duration: 4000
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada',
      color: "success",
      duration: 4000
    });
    toast.present();
  }

}
