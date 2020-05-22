import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private afs: AngularFirestore
  ) { }

  /*getAdicionalesFromRestaurant(idRestaurant) {
    return this.afs.collection('adicionales', ref => ref.where('id_restaurant','==', idRestaurant )).valueChanges()
  }*/

  /*getRestaurant() {
    return this.afs.collection('restaurantes').valueChanges();
  }*/
  
  getRestaurant(idRestaurant) {
    return this.afs.collection('restaurantes', ref => ref.where('uid','==', idRestaurant)).valueChanges();
  }

  getProductos(idRestaurant){
    return this.afs.collection('productos', ref => ref.where('restaurante', '==', idRestaurant)).valueChanges();
  }
}
