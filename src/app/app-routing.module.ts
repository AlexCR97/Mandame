import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'detalles-comida-seleccionada',
    loadChildren: () => import('./pages/detalles-comida-seleccionada/detalles-comida-seleccionada.module').then( m => m.DetallesComidaSeleccionadaPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'modal-alert',
    loadChildren: () => import('./modals/modal-alert/modal-alert.module').then( m => m.ModalAlertPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pre-pedido',
    loadChildren: () => import('./pages/pre-pedido/pre-pedido.module').then( m => m.PrePedidoPageModule)
  },  {
    path: 'direcciones',
    loadChildren: () => import('./pages/direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
  {
    path: 'calificar-repartidor',
    loadChildren: () => import('./modals/calificar-repartidor/calificar-repartidor.module').then( m => m.CalificarRepartidorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
