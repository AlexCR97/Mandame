import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Restaurant, RestaurantesPorCategoria } from '../dbdocs/restaurant';
import { map } from 'rxjs/operators';
import { Producto } from '../dbdocs/producto';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  pedido: any = {};

  constructor(
    private afs: AngularFirestore
  ) { }

  getAdicionalesFromRestaurant(idRestaurant) {
    return this.afs.collection('complementos', ref => ref.where('id_restaurant', '==', idRestaurant)).snapshotChanges();
  }
  
  getRestaurant(uidRestaurant: string) {
    return this.afs.collection<Restaurant>('restaurantes').valueChanges().pipe(
      map(restaurants => restaurants.find(r => r.uid == uidRestaurant))
    );
  }

  getRestaurantes(): Observable<Restaurant[]> {
    return this.afs.collection<Restaurant>('restaurantes').valueChanges();
  }

  getRestaurantesPorCategoria() {
    return this.afs.collection<Restaurant>('restaurantes').valueChanges().pipe(
      map(restaurants => {
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
      })
    );
  }

  getProductos(uidRestaurant: string): Observable<Producto[]> {
    return this.afs.collection<Producto>('productos').valueChanges().pipe(
      map(productos => productos.filter(producto => producto.restaurante == uidRestaurant))
    );
  }

  getComplementos() {
    return this.afs.collection('complementos').valueChanges() 
  }

  agregarPedido(pedido) {
    return this.afs.collection('pedidos').add(pedido);
  }

  getPedido(uidPedido) {
    console.log('uidPedido ', uidPedido, ' from RestaurantService');
    // TODO: RETRIEVE THE DOCUMENT DATA
    let res = this.afs.collection('pedidos').doc(uidPedido).valueChanges();
    console.log('res: ', res);
    return res;
  }

  async agregarRestauranteFavoritos(uidUsuario: string, uidRestaurant: string){
    const db = this.afs.firestore;
    const batch = db.batch();

    //obtenemos la referencia al documento con el uid del usuario (cliente)
    let restauranteFavoritoDoc = await db.collection('restaurantesFavoritos').doc(uidUsuario).get();
    let restauranteFavoritoDocRef = restauranteFavoritoDoc.ref; 

    //Si no existe, hay que insertarlo
    if(!restauranteFavoritoDoc.exists){
      let uidsRestaurantes = [uidRestaurant];
      batch.set(restauranteFavoritoDocRef, {restaurantes: uidsRestaurantes});
    }
    // Si ya existe, hay que actualizar el array
    else{
      let uidsRestaurantes = (await restauranteFavoritoDocRef.get()).get('restaurantes') as string[];
      uidsRestaurantes.push(uidRestaurant);
      batch.update(restauranteFavoritoDocRef, {restaurantes: uidsRestaurantes});
    }

    return batch.commit(); 
  }
}
