import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaDireccionPage } from './nueva-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaDireccionPageRoutingModule {}
