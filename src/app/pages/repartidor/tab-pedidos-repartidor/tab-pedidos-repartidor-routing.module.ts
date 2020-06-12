import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPedidosRepartidorPage } from './tab-pedidos-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: TabPedidosRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPedidosRepartidorPageRoutingModule {}
