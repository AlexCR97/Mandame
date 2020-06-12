import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombrePageRoutingModule } from './nombre-routing.module';

import { NombrePage } from './nombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NombrePageRoutingModule
  ],
  declarations: [NombrePage]
})
export class NombrePageModule {}
