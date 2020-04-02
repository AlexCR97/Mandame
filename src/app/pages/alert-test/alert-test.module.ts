import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertTestPageRoutingModule } from './alert-test-routing.module';

import { AlertTestPage } from './alert-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertTestPageRoutingModule
  ],
  declarations: [AlertTestPage]
})
export class AlertTestPageModule {}
