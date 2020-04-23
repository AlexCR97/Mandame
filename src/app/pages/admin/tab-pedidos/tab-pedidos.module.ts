import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPedidosPageRoutingModule } from './tab-pedidos-routing.module';

import { TabPedidosPage } from './tab-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPedidosPageRoutingModule
  ],
  declarations: [TabPedidosPage]
})
export class TabPedidosPageModule {}
