import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAdicionalesFromRestaurant(idRestaurant) {
    return this.afs.collection('adicionales', ref => ref.where('id_restaurant','==', idRestaurant )).snapshotChanges()
  }

  getRestaurant() {
    return this.afs.collection('restaurantes').valueChanges();
  }
}
