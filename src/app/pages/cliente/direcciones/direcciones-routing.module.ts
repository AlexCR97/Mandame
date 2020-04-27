import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionesPage } from './direcciones.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionesPageRoutingModule {}
