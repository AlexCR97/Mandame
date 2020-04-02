import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },  {
    path: 'alert-test',
    loadChildren: () => import('./pages/alert-test/alert-test.module').then( m => m.AlertTestPageModule)
  },
  {
    path: 'modal-test',
    loadChildren: () => import('./pages/modal-test/modal-test.module').then( m => m.ModalTestPageModule)
  },
  {
    path: 'modal-test',
    loadChildren: () => import('./modals/modal-test/modal-test.module').then( m => m.ModalTestPageModule)
  },
  {
    path: 'mostrar-modal',
    loadChildren: () => import('./pages/mostrar-modal/mostrar-modal.module').then( m => m.MostrarModalPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
