import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MandamePage } from './mandame.page';

const routes: Routes = [
  {
    path: '',
    component: MandamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MandamePageRoutingModule {}
