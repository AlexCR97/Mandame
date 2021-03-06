import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Restaurant, RestaurantesPorCategoria } from '../dbdocs/restaurant';
import { map } from 'rxjs/operators';
import { Producto } from '../dbdocs/producto';
import { Adicional } from '../dbdocs/adicional';
import { RestaurantesFavoritos } from '../dbdocs/restaurantesFavoritos';
import { CacheUsuario } from '../cache/cache-usuario';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    pedido: any = {};

  constructor(
    private afs: AngularFirestore
  ) { }

  /*async agregarRestaurantFavorito(uidUsuario: string, uidRestaurant: string) {
    const db = this.afs.firestore;
    const batch = db.batch();

    // Obtenemos la referencia al documento con el uid del usuario
    let restaurantFavoritoDoc = await db.collection('restaurantesFavoritos').doc(uidUsuario).get();
    let restaurantFavoritoDocRef = restaurantFavoritoDoc.ref;

    // Si no existe, hay que insertarlo
    if (!restaurantFavoritoDoc.exists) {
      let uidsRestaurantes = [uidRestaurant];
      batch.set(restaurantFavoritoDocRef, {restaurantes: uidsRestaurantes});
    }
    // Si ya existe, hay que actualizar el array
    else {
      let uidsRestaurantes = (await restaurantFavoritoDocRef.get()).get('restaurantes') as string[];

      // Checamos si el restaurante ya se encuentra en favoritos
      if (uidsRestaurantes.find(uid => uid == uidRestaurant) == undefined) {
        uidsRestaurantes.push(uidRestaurant);
        batch.update(restaurantFavoritoDocRef, {restaurantes: uidsRestaurantes});
      }
    }

    return batch.commit();
}*/


getAdicionalesPorUid(uidAdicionales: string[]): Observable<Adicional[]> {
    console.log('lista uid adicionales pedidos: ', uidAdicionales);
    return this.afs.collection<Adicional>('productos').valueChanges()
    .pipe(map(adicionales => {
        console.log('from getAdicionalesPorUid(): ');
        console.log('adicionales: ', adicionales);
        let adicionalesEncontrados = new Array<Adicional>();

        uidAdicionales.forEach(uid => {
            let adicional = adicionales.find(a => a.uid == uid);
            adicionalesEncontrados.push(adicional);
        });

        console.log('adicionales encontrados: ', adicionalesEncontrados);
        return adicionalesEncontrados;
    }));
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

getAdicionales() {
    return this.afs.collection<Adicional>('complementos').valueChanges();
}

agregarPedido(pedido) {
    return this.afs.collection('pedidos').add(pedido);
}

actualizarUidPedido(uidPedido) {
    return this.afs.collection('pedidos').doc(uidPedido).update({
        uid: uidPedido
    });
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
      console.log("Entro en el if");
    }
    // Si ya existe, hay que actualizar el array
    else{
      let uidsRestaurantes = (await restauranteFavoritoDocRef.get()).get('restaurantes') as string[];
       // Checamos si el restaurante ya se encuentra en favoritos
       if (uidsRestaurantes.find(uid => uid == uidRestaurant) == undefined) {
        uidsRestaurantes.push(uidRestaurant);
        batch.update(restauranteFavoritoDocRef, {restaurantes: uidsRestaurantes});
      }
    }

    return batch.commit(); 
  }

  async verificarSiHayFavoritos(uidUsuario: string){
    const db = this.afs.firestore;
    const batch = db.batch();

    let restauranteFavoritoDoc = await db.collection('restaurantesFavoritos').doc(uidUsuario).get();

    if(restauranteFavoritoDoc.exists){
      return true;
    }else{
      return false;
    }  
  }

  getRestaurantesFavoritos(uidUsuario: string){
    return this.afs.collection<RestaurantesFavoritos>('restaurantesFavoritos').doc<RestaurantesFavoritos>(uidUsuario).valueChanges();
  }

  async quitarRestaurantFavorito(uidUsuario: string, uidRestaurant: string) {
    const db = this.afs.firestore;
    const batch = db.batch();

    // Obtenemos la referencia al documento con el uid del usuario
    let restaurantFavoritoDoc = await db.collection('restaurantesFavoritos').doc(uidUsuario).get();
    let restaurantFavoritoDocRef = restaurantFavoritoDoc.ref;

    // Si no existe, no hacemos nada
    if (!restaurantFavoritoDoc.exists) { }
    // Si ya existe, hay que actualizar el array
    else {
      let uidsRestaurantes = (await restaurantFavoritoDocRef.get()).get('restaurantes') as string[];

      // Quitamos el uid
        uidsRestaurantes = uidsRestaurantes.filter(uid => uid != uidRestaurant);
        batch.update(restaurantFavoritoDocRef, {restaurantes: uidsRestaurantes});
    }

    return batch.commit();
  }
}
