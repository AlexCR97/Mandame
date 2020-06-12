import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantPageRoutingModule } from './restaurant-routing.module';

import { RestaurantPage } from './restaurant.page';
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPageRoutingModule
  ],
  declarations: [RestaurantPage]
})
export class RestaurantPageModule {}
