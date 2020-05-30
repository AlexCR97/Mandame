import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaDireccionPageRoutingModule } from './nueva-direccion-routing.module';

import { NuevaDireccionPage } from './nueva-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaDireccionPageRoutingModule
  ],
  declarations: [NuevaDireccionPage]
})
export class NuevaDireccionPageModule {}
