import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioRepartidorPageRoutingModule } from './inicio-repartidor-routing.module';

import { InicioRepartidorPage } from './inicio-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioRepartidorPageRoutingModule
  ],
  declarations: [InicioRepartidorPage]
})
export class InicioRepartidorPageModule {}
