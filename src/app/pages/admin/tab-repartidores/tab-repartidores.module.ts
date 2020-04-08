import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRepartidoresPageRoutingModule } from './tab-repartidores-routing.module';

import { TabRepartidoresPage } from './tab-repartidores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRepartidoresPageRoutingModule
  ],
  declarations: [TabRepartidoresPage]
})
export class TabRepartidoresPageModule {}
