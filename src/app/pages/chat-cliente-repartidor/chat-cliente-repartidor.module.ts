import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatClienteRepartidorPageRoutingModule } from './chat-cliente-repartidor-routing.module';

import { ChatClienteRepartidorPage } from './chat-cliente-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatClienteRepartidorPageRoutingModule
  ],
  declarations: [ChatClienteRepartidorPage]
})
export class ChatClienteRepartidorPageModule {}
