import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioAdminPage } from './inicio-admin.page';

const routes: Routes = [
  {
    path: '',
    component: InicioAdminPage,
    children: [
      {
        path: 'tab-pedidos',
        loadChildren: () => import('../tab-pedidos/tab-pedidos.module').then( m => m.TabPedidosPageModule)
      },
      {
        path: 'tab-repartidores',
        loadChildren: () => import('../tab-repartidores/tab-repartidores.module').then( m => m.TabRepartidoresPageModule)
      },
      {
        path: 'tab-chats',
        loadChildren: () => import('../tab-chats/tab-chats.module').then( m => m.TabChatsPageModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioAdminPageRoutingModule {}
