import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarDireccionPage } from './actualizar-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarDireccionPageRoutingModule {}
