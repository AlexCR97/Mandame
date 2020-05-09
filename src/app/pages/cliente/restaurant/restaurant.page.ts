import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service"

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

  constructor(public restaurantservice : RestaurantService) { }

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
}