import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabChatsRepartidorPageRoutingModule } from './tab-chats-repartidor-routing.module';

import { TabChatsRepartidorPage } from './tab-chats-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabChatsRepartidorPageRoutingModule
  ],
  declarations: [TabChatsRepartidorPage]
})
export class TabChatsRepartidorPageModule {}
