import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAlertPage } from './modal-alert.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAlertPageRoutingModule {}
