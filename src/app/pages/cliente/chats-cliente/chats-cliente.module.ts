import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsClientePageRoutingModule } from './chats-cliente-routing.module';

import { ChatsClientePage } from './chats-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsClientePageRoutingModule
  ],
  declarations: [ChatsClientePage]
})
export class ChatsClientePageModule {}
