import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalController } from '@ionic/angular';

interface restaurant {
  calificacion : number[]
  categoria : string
  estado : string
  id : string
  nombre : string
  tiempoaprox : number[]
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  showToolbar = false;
  select: string;
  nombreRestaurant : string;

  public Restaurant : any = [];

  constructor(public restaurantservice : RestaurantService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.select = "Lorem";

    this.restaurantservice.getRestaurant().subscribe(restaurants => {
        console.log('RESTAURANTS');

        this.Restaurant = restaurants;
        console.log(this.Restaurant);
    });
}

  segmentChanged(ev: any) {
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }

  // TODO: Change the btnClick name to another most meaningful
  btnClick() {
    console.log('Down Button Click');
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PrePedidoPage,
      componentProps: {
        'val': 0
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log('Data: ', data);
      // TODO: ADD CUSTOM ALERT HERE.
      // TODO: CHANGE COLOR ANV ALUES OF DOWN BUTTON
    });
    return await modal.present();
  }
}