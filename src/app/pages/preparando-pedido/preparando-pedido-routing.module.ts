import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreparandoPedidoPage } from './preparando-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: PreparandoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreparandoPedidoPageRoutingModule {}
