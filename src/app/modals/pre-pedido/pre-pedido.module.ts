import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePedidoPageRoutingModule } from './pre-pedido-routing.module';

import { PrePedidoPage } from './pre-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePedidoPageRoutingModule
  ],
  declarations: [PrePedidoPage]
})
export class PrePedidoPageModule {}
