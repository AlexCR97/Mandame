import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatClienteRepartidorPage } from './chat-cliente-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: ChatClienteRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatClienteRepartidorPageRoutingModule {}
