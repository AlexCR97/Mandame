import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarModalPageRoutingModule } from './mostrar-modal-routing.module';

import { MostrarModalPage } from './mostrar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarModalPageRoutingModule
  ],
  declarations: [MostrarModalPage]
})
export class MostrarModalPageModule {}
