import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajesAdminPageRoutingModule } from './mensajes-admin-routing.module';

import { MensajesAdminPage } from './mensajes-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajesAdminPageRoutingModule
  ],
  declarations: [MensajesAdminPage]
})
export class MensajesAdminPageModule {}
