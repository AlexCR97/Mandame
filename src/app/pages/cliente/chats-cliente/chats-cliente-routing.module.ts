import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsClientePage } from './chats-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsClientePageRoutingModule {}
