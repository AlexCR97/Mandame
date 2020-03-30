import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesComidaSeleccionadaPage } from './detalles-comida-seleccionada.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesComidaSeleccionadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesComidaSeleccionadaPageRoutingModule {}
