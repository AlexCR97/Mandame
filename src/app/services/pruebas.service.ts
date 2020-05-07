import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getUsers(): Observable<any[]> {
    return this.afs.collection('usuarios').valueChanges();
  }

  getAdicionalesFromRestaurant(idRestaurant) {
    return this.afs.collection('adicionales', ref => ref.where('id_restaurant','==', idRestaurant )).valueChanges()
  }
}
