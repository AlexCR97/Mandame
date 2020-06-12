import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabChatsPageRoutingModule } from './tab-chats-routing.module';

import { TabChatsPage } from './tab-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabChatsPageRoutingModule
  ],
  declarations: [TabChatsPage]
})
export class TabChatsPageModule {}
