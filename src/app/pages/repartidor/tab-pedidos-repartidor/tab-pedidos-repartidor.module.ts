import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPedidosRepartidorPageRoutingModule } from './tab-pedidos-repartidor-routing.module';

import { TabPedidosRepartidorPage } from './tab-pedidos-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPedidosRepartidorPageRoutingModule
  ],
  declarations: [TabPedidosRepartidorPage]
})
export class TabPedidosRepartidorPageModule {}
