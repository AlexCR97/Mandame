import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelefonoPageRoutingModule } from './telefono-routing.module';

import { TelefonoPage } from './telefono.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelefonoPageRoutingModule
  ],
  declarations: [TelefonoPage]
})
export class TelefonoPageModule {}
