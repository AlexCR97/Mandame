import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.page.html',
  styleUrls: ['./nombre.page.scss'],
})
export class NombrePage implements OnInit {

  @ViewChild(IonButton, {static: false}) guardar: IonButton;

  nombre: string;
  apellido: string;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navController: NavController
   ) {
    this.nombre = 'Filiberto';
    this.apellido = 'Salazar';
  }

  ngOnInit() { }

  habilitar(){
    this.guardar.disabled = false;
  }

  save(){
    if(this.nombre.length < 3 || this.apellido.length < 3 ){
      this.presentToast();
    }else{
      this.presentLoading();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.navController.back();
    this.successToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nombre invalido',
      color: "danger",
      duration: 3000
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'El nombre se ha cambiado',
      color: "success",
      duration: 3000
    });
    toast.present();
  }

}
