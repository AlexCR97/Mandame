import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrePedidoPage } from './pre-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: PrePedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrePedidoPageRoutingModule {}
