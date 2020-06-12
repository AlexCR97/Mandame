import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificarRepartidorPageRoutingModule } from './calificar-repartidor-routing.module';

import { CalificarRepartidorPage } from './calificar-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificarRepartidorPageRoutingModule
  ],
  declarations: [CalificarRepartidorPage]
})
export class CalificarRepartidorPageModule {}
