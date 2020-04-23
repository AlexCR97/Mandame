import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPedidoPageRoutingModule } from './detalles-pedido-routing.module';

import { DetallesPedidoPage } from './detalles-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidoPageRoutingModule
  ],
  declarations: [DetallesPedidoPage]
})
export class DetallesPedidoPageModule {}
