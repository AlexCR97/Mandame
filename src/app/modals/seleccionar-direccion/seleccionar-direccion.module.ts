import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarDireccionPageRoutingModule } from './seleccionar-direccion-routing.module';

import { SeleccionarDireccionPage } from './seleccionar-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarDireccionPageRoutingModule
  ],
  declarations: [SeleccionarDireccionPage]
})
export class SeleccionarDireccionPageModule {}
