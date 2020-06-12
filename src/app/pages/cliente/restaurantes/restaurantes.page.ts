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

  searchbarInput = '';
  restaurantes = new Array<Restaurant>();
  restaurantesFiltrados = this.restaurantes;

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
        this.restaurantesFiltrados = this.restaurantes;
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

  onSearchbarChange($event, searchbarInput: string) {
    console.log(`onSearchbarChange(${searchbarInput})`);

    if (searchbarInput.trim().length == 0) {
      this.restaurantesFiltrados = this.restaurantes;
      return;
    }

    this.restaurantesFiltrados = this.restaurantes.filter(r => r.nombre.trim().toLowerCase().includes(searchbarInput.trim().toLowerCase()));
  }
}
