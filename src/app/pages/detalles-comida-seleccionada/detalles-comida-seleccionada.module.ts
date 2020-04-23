import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesComidaSeleccionadaPageRoutingModule } from './detalles-comida-seleccionada-routing.module';

import { DetallesComidaSeleccionadaPage } from './detalles-comida-seleccionada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesComidaSeleccionadaPageRoutingModule
  ],
  declarations: [DetallesComidaSeleccionadaPage]
})
export class DetallesComidaSeleccionadaPageModule {
}
