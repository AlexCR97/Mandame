import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPedidoClientePage } from './detalles-pedido-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPedidoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPedidoClientePageRoutingModule {}
