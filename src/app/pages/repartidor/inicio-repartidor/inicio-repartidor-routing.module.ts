import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioRepartidorPage } from './inicio-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: InicioRepartidorPage,
    children: [
      {
        path: 'tab-pedidos-repartidor',
        loadChildren: () => import('../tab-pedidos-repartidor/tab-pedidos-repartidor.module').then(m => m.TabPedidosRepartidorPageModule)
      },
      {
        path: 'tab-chats-repartidor',
        loadChildren: () => import('../tab-chats-repartidor/tab-chats-repartidor.module').then(m => m.TabChatsRepartidorPageModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioRepartidorPageRoutingModule {}
