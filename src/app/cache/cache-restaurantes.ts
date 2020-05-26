import { Restaurant } from '../dbdocs/restaurant';

export class CacheRestaurantes {

    private static restaurantes = new Map<string, Restaurant>();

    public static getRestaurante(uidRestaurante: string): Restaurant{
        return this.restaurantes.get(uidRestaurante);
    }

    public static getAllRestaurantes(): Restaurant[]{
        return Array.from(this.restaurantes.values());
    }

    public static setAllRestaurantes(restaurantes: Restaurant[]){
        restaurantes.forEach(restaurante => this.setRestaurante(restaurante))
    }

    public static setRestaurante(restaurant: Restaurant){
        this.restaurantes.set(restaurant.uid, restaurant);
    }

}
