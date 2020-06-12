import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPedidoClientePageRoutingModule } from './detalles-pedido-cliente-routing.module';

import { DetallesPedidoClientePage } from './detalles-pedido-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPedidoClientePageRoutingModule
  ],
  declarations: [DetallesPedidoClientePage]
})
export class DetallesPedidoClientePageModule {}
