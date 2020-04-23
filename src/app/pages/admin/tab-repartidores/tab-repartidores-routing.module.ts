import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabRepartidoresPage } from './tab-repartidores.page';

const routes: Routes = [
  {
    path: '',
    component: TabRepartidoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRepartidoresPageRoutingModule {}
