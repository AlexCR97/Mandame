import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/dbdocs/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.page.html',
  styleUrls: ['./restaurantes.page.scss'],
})
export class RestaurantesPage implements OnInit {

  restaurantes = new Array<Restaurant>();

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('Obteniendo restaurantes...');
    this.restaurantService.getRestaurantes().subscribe(
      restaurantes => {
        console.log('Restaurantes obtenidos :D');
        console.table(restaurantes);

        this.restaurantes = restaurantes;
      },
      error => {
        console.error('Error al obtener restaurantes :(')
        console.error(error);
      }
    );
  }

  abrirRestaurante(uidRestaurant: string) {
    console.log(`abrirRestaurante(${uidRestaurant})`);

    this.router.navigate(['/restaurant'], {
      queryParams: {
        uidRestaurant: uidRestaurant,
      }
    });
  }

}
