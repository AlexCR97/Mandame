import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MandadosPage } from './mandados.page';

const routes: Routes = [
  {
    path: '',
    component: MandadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MandadosPageRoutingModule {}
