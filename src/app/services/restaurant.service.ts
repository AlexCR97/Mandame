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

  /*getRestaurant() {
    return this.afs.collection('restaurantes').valueChanges();
  }*/
  
  getRestaurant(idRestaurant) {
    return this.afs.collection('restaurantes', ref => ref.where('uid','==', idRestaurant)).valueChanges();
  }

  getProductos(idRestaurant){
    return this.afs.collection('productos', ref => ref.where('restaurante', '==', idRestaurant)).valueChanges();
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
