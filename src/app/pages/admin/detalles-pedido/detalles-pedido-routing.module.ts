import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPedidoPage } from './detalles-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPedidoPageRoutingModule {}
