import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesMandadoRepartidorPageRoutingModule } from './detalles-mandado-repartidor-routing.module';

import { DetallesMandadoRepartidorPage } from './detalles-mandado-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesMandadoRepartidorPageRoutingModule
  ],
  declarations: [DetallesMandadoRepartidorPage]
})
export class DetallesMandadoRepartidorPageModule {}
