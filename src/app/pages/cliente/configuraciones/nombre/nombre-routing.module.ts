import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NombrePage } from './nombre.page';

const routes: Routes = [
  {
    path: '',
    component: NombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombrePageRoutingModule {}
