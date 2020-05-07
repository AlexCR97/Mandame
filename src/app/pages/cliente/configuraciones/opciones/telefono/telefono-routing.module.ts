import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelefonoPage } from './telefono.page';

const routes: Routes = [
  {
    path: '',
    component: TelefonoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelefonoPageRoutingModule {}
