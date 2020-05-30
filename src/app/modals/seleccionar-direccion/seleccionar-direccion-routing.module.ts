import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarDireccionPage } from './seleccionar-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarDireccionPageRoutingModule {}
