import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajesAdminPage } from './mensajes-admin.page';

const routes: Routes = [
  {
    path: '',
    component: MensajesAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajesAdminPageRoutingModule {}
