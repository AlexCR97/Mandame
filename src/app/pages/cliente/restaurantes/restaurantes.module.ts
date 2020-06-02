import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantesPageRoutingModule } from './restaurantes-routing.module';

import { RestaurantesPage } from './restaurantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantesPageRoutingModule
  ],
  declarations: [RestaurantesPage]
})
export class RestaurantesPageModule {}
