import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTestPage } from 'src/app/modals/modal-test/modal-test.page';

@Component({
  selector: 'app-mostrar-modal',
  templateUrl: './mostrar-modal.page.html',
  styleUrls: ['./mostrar-modal.page.scss'],
})
export class MostrarModalPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async abrirModal() {
    console.log('abriendo modal...');

    const modal = await this.modalController.create({
      component: ModalTestPage,
    });

    await modal.present();
  }

}
