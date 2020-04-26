import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPedidoRepartidorPageRoutingModule } from './detalles-pedido-repartidor-routing.module';

import { DetallesPedidoRepartidorPage } from './detalles-pedido-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidoRepartidorPageRoutingModule
  ],
  declarations: [DetallesPedidoRepartidorPage]
})
export class DetallesPedidoRepartidorPageModule {}
