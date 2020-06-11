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
        console.log('restaurante uid: ', uidRestaurante);
        console.log('exists: ', this.containsRestaurante(uidRestaurante));
        return this.restaurantes.get(uidRestaurante);
    }

    public static getAdicionalesDeRestaurante(uidRestaurante: string): string[] {
        console.log('getAdicionalesDeRestaurante( ', uidRestaurante, ' )');

        console.log('restaurantes en cache: ', this.restaurantes);

        let restaurante = this.restaurantes.get(uidRestaurante);
        console.log('restaurante: ', restaurante);
        return restaurante.adicionales;
    }

    public static getComplementosDeRestaurante(uidRestaurante: string) {
        return this.restaurantes.get(uidRestaurante).complementos;
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
        restaurantes.forEach(restaurante => this.setRestaurante(restaurante));
        console.log('All restaurantes: ', this.restaurantes);
    }

    public static setRestaurante(restaurant: Restaurant){
        this.restaurantes.set(restaurant.uid, restaurant);
    }

}
