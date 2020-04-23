import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparandoPedidoPageRoutingModule } from './preparando-pedido-routing.module';

import { PreparandoPedidoPage } from './preparando-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparandoPedidoPageRoutingModule
  ],
  declarations: [PreparandoPedidoPage]
})
export class PreparandoPedidoPageModule {}
