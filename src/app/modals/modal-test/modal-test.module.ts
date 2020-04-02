import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTestPageRoutingModule } from './modal-test-routing.module';

import { ModalTestPage } from './modal-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTestPageRoutingModule
  ],
  declarations: [ModalTestPage]
})
export class ModalTestPageModule {}
