import { RestaurantesFavoritos } from '../dbdocs/restaurantesFavoritos';

export class CacheRestaurantesFavoritos{
    private static restaurantesFavoritos = new Map<string, RestaurantesFavoritos>();
    
    public static clear() {
        this.restaurantesFavoritos.clear();
    }
    
    public static containsRestaurantesFavoritos(uidRestauranteFavorito: string): boolean {
        return this.restaurantesFavoritos.get(uidRestauranteFavorito) != null;
    }

    public static getRestauranteFavorito(uidRestauranteFavorito: string): RestaurantesFavoritos{
        return this.restaurantesFavoritos.get(uidRestauranteFavorito);
    }

    public static getAllRestaurantesFavoritos(): RestaurantesFavoritos[]{
        return Array.from(this.restaurantesFavoritos.values());
    }

    public static isEmpty(): boolean {
        return this.restaurantesFavoritos.size == 0;
    }

    public static setAllRestaurantesFavoritos(restaurantesFavoritos: RestaurantesFavoritos[]){
        restaurantesFavoritos.forEach(restaurantesFav => this.setRestauranteFavorito(restaurantesFav));
        console.log('All restaurantes: ', this.restaurantesFavoritos);
    }

    public static setRestauranteFavorito(restauranteFavorito: RestaurantesFavoritos){
        this.restaurantesFavoritos.set(restauranteFavorito.uid, restauranteFavorito);
    }
}