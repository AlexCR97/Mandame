import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  pedido: any = {};

  constructor(
    private afs: AngularFirestore
    ) { }

  getAdicionalesFromRestaurant(idRestaurant) {
    return this.afs.collection('complementos', ref => ref.where('id_restaurant','==', idRestaurant )).snapshotChanges()
  }

  getRestaurant() {
    return this.afs.collection('restaurantes').valueChanges();
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
}
