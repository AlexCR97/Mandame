import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContrasenaPage } from './contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContrasenaPageRoutingModule {}
