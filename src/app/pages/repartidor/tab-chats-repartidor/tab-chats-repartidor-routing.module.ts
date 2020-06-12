import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabChatsRepartidorPage } from './tab-chats-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: TabChatsRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabChatsRepartidorPageRoutingModule {}
