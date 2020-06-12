import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionesPage } from './configuraciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionesPage
  },  {
    path: 'nombre',
    loadChildren: () => import('./opciones/nombre/nombre.module').then( m => m.NombrePageModule)
  },
  {
    path: 'nombre',
    loadChildren: () => import('./nombre/nombre.module').then( m => m.NombrePageModule)
  },
  {
    path: 'telefono',
    loadChildren: () => import('./opciones/telefono/telefono.module').then( m => m.TelefonoPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./opciones/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionesPageRoutingModule {}
