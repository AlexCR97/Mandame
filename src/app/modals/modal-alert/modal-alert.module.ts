import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAlertPageRoutingModule } from './modal-alert-routing.module';

import { ModalAlertPage } from './modal-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAlertPageRoutingModule
  ],
  declarations: [ModalAlertPage]
})
export class ModalAlertPageModule {}
