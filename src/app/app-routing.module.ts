import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/cliente/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'detalles-comida-seleccionada',
    loadChildren: () => import('./pages/cliente/detalles-comida-seleccionada/detalles-comida-seleccionada.module').then( m => m.DetallesComidaSeleccionadaPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./pages/cliente/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
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
    loadChildren: () => import('./pages/cliente/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pre-pedido',
    loadChildren: () => import('./modals/pre-pedido/pre-pedido.module').then( m => m.PrePedidoPageModule)
  },
  {
    path: 'preparando-pedido',
    loadChildren: () => import('./pages/cliente/preparando-pedido/preparando-pedido.module').then( m => m.PreparandoPedidoPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./pages/cliente/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
  {
    path: 'direcciones',
    loadChildren: () => import('./pages/cliente/direcciones/direcciones.module').then( m => m.DireccionesPageModule)
  },
  {
    path: 'calificar-repartidor',
    loadChildren: () => import('./modals/calificar-repartidor/calificar-repartidor.module').then( m => m.CalificarRepartidorPageModule)
  },
  {
    path: 'inicio-admin',
    loadChildren: () => import('./pages/admin/inicio-admin/inicio-admin.module').then( m => m.InicioAdminPageModule)
  },
  {
    path: 'detalles-pedido',
    loadChildren: () => import('./pages/admin/detalles-pedido/detalles-pedido.module').then( m => m.DetallesPedidoPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'mandame',
    loadChildren: () => import('./pages/cliente/mandame/mandame.module').then( m => m.MandamePageModule)
  },
  {
    path: 'detalles-pedido-repartidor',
    loadChildren: () => import('./pages/repartidor/detalles-pedido-repartidor/detalles-pedido-repartidor.module').then( m => m.DetallesPedidoRepartidorPageModule)
  },
  {
    path: 'inicio-repartidor',
    loadChildren: () => import('./pages/repartidor/inicio-repartidor/inicio-repartidor.module').then( m => m.InicioRepartidorPageModule)
  },
  {
    path: 'tab-pedidos-repartidor',
    loadChildren: () => import('./pages/repartidor/tab-pedidos-repartidor/tab-pedidos-repartidor.module').then( m => m.TabPedidosRepartidorPageModule)
  },
  {
    path: 'tab-chats-repartidor',
    loadChildren: () => import('./pages/repartidor/tab-chats-repartidor/tab-chats-repartidor.module').then( m => m.TabChatsRepartidorPageModule)
  },
  {
    path: 'mensajes-admin',
    loadChildren: () => import('./pages/admin/mensajes-admin/mensajes-admin.module').then( m => m.MensajesAdminPageModule)
  },
  {
    path: 'post-registro',
    loadChildren: () => import('./pages/cliente/post-registro/post-registro.module').then( m => m.PostRegistroPageModule)
  },
  {
    path: 'chats-cliente',
    loadChildren: () => import('./pages/cliente/chats-cliente/chats-cliente.module').then( m => m.ChatsClientePageModule)
  },  {
    path: 'detalles-pedido-cliente',
    loadChildren: () => import('./pages/cliente/detalles-pedido-cliente/detalles-pedido-cliente.module').then( m => m.DetallesPedidoClientePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
