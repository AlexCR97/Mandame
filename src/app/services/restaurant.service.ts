import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private db : AngularFirestore) { }

  getRestaurant() {
    return this.db.collection('restaurantes').valueChanges();
  }
}
