import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPedidoRepartidorPage } from './detalles-pedido-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPedidoRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPedidoRepartidorPageRoutingModule {}
