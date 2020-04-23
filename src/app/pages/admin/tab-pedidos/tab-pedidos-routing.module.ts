import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPedidosPage } from './tab-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: TabPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPedidosPageRoutingModule {}
