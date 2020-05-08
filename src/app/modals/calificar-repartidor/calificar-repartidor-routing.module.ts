import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificarRepartidorPage } from './calificar-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: CalificarRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificarRepartidorPageRoutingModule {}
