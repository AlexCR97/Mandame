import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MandamePageRoutingModule } from './mandame-routing.module';

import { MandamePage } from './mandame.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MandamePageRoutingModule
  ],
  declarations: [MandamePage]
})
export class MandamePageModule {}
