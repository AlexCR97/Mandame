import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

import { PrePedidoPageModule } from 'src/app/modals/pre-pedido/pre-pedido.module';
import { ModalAlertPageModule } from 'src/app/modals/modal-alert/modal-alert.module';
import { CalificarRepartidorPageModule } from 'src/app/modals/calificar-repartidor/calificar-repartidor.module';
import { SeleccionarDireccionPageModule } from './modals/seleccionar-direccion/seleccionar-direccion.module';
import { NuevaDireccionPageModule } from './modals/nueva-direccion/nueva-direccion.module';
// CHECK THIS, CHANGE TO MODALS FOLDER
import { DetallesComidaSeleccionadaPageModule } from 'src/app/pages/cliente/detalles-comida-seleccionada/detalles-comida-seleccionada.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    PrePedidoPageModule,
    ModalAlertPageModule,
    CalificarRepartidorPageModule,
    SeleccionarDireccionPageModule,
    NuevaDireccionPageModule,
    DetallesComidaSeleccionadaPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: FirestoreSettingsToken,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
