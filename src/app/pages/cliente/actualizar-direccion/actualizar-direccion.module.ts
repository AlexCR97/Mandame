import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarDireccionPageRoutingModule } from './actualizar-direccion-routing.module';

import { ActualizarDireccionPage } from './actualizar-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarDireccionPageRoutingModule
  ],
  declarations: [ActualizarDireccionPage]
})
export class ActualizarDireccionPageModule {}
