import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesMandadoRepartidorPage } from './detalles-mandado-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesMandadoRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesMandadoRepartidorPageRoutingModule {}
