import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertTestPage } from './alert-test.page';

const routes: Routes = [
  {
    path: '',
    component: AlertTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertTestPageRoutingModule {}
