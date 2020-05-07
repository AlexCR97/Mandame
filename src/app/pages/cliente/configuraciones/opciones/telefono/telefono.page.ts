import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
})
export class TelefonoPage implements OnInit {

  @ViewChild(IonButton, { static: false }) guardar: IonButton;

  telefono: number;
  newNumber: number;

  constructor(
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { 
    this.telefono = 8312542480;
    this.newNumber = 8312542480;
  }

  habilitar(){
    if(this.newNumber.toString().length > 9){
     this.guardar.disabled = false;
    }else{
      this.guardar.disabled = true;
    }
  }

  guardarDatos(){
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.navCtrl.back();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Telefono cambiado',
      color: "success", 
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
