import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarModalPage } from './mostrar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarModalPageRoutingModule {}
