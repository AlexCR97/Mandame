import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MandadosPageRoutingModule } from './mandados-routing.module';

import { MandadosPage } from './mandados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MandadosPageRoutingModule
  ],
  declarations: [MandadosPage]
})
export class MandadosPageModule {}
