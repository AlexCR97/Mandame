import { Restaurant, RestaurantesPorCategoria } from '../dbdocs/restaurant';

export class CacheRestaurantes {

    private static restaurantes = new Map<string, Restaurant>();

    public static clear() {
        this.restaurantes.clear();
    }

    public static containsRestaurante(uidRestaurante: string): boolean {
        return this.restaurantes.get(uidRestaurante) != null;
    }

    public static getRestaurante(uidRestaurante: string): Restaurant{
        return this.restaurantes.get(uidRestaurante);
    }

    public static getAllRestaurantes(): Restaurant[]{
        return Array.from(this.restaurantes.values());
    }

    public static getRestaurantesAllPorCategoria(): RestaurantesPorCategoria[] {
        let restaurants = this.getAllRestaurantes();
        let restsPorCategoria = new Array<RestaurantesPorCategoria>();

        let categoriasRepetidas = restaurants.map(producto => producto.categoria);
        let categoriasUnicas = new Set<string>(categoriasRepetidas);

        categoriasUnicas.forEach(categ =>{
          let rests = restaurants.filter(prod => prod.categoria == categ);

          restsPorCategoria.push({
            categoria: categ,
            restaurantes: rests,
          });
        });

        return restsPorCategoria;
    }

    public static isEmpty(): boolean {
        return this.restaurantes.size == 0;
    }

    public static setAllRestaurantes(restaurantes: Restaurant[]){
        restaurantes.forEach(restaurante => this.setRestaurante(restaurante))
    }

    public static setRestaurante(restaurant: Restaurant){
        this.restaurantes.set(restaurant.uid, restaurant);
    }

}
