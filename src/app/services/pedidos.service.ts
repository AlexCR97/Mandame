import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from '../dbdocs/pedido';
import { Restaurant } from '../dbdocs/restaurant';
import { Usuario } from '../dbdocs/usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum EsperaPedido {
  Todos = 'todos',
  EnTransito = 'tránsito',
  Pendiente = 'pendiente',
  Concluido = 'concluido',
}

export enum EstadoPedido {
  Confirmado = 'confirmado',
  Preparando = 'preparando',
  Recolectando = 'recolectando',
  Transitando = 'transitando',
  Entregado = 'entregado',
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    public afs: AngularFirestore,
  ) { }

  getPedidos(estado: EsperaPedido) {
    if (estado == EsperaPedido.Todos) {
      return this.afs.collection<Pedido>('pedidos').valueChanges();
    }

    return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
      map(pedidos => {
        let pedidosPorEstado = pedidos.filter(pedido => pedido.espera == estado.toString());
        //let pedidosOrdenados = pedidosPorEstado.sort((p1, p2) => 0);
        let pedidosOrdenados = pedidosPorEstado;
        return pedidosOrdenados;
      })
    );
  }

  getPedidosDeRepartidor(uidRepartidor: string, estado: EsperaPedido): Observable<Pedido[]> {
    if (estado == EsperaPedido.Todos) {
      return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
        map(pedidos => pedidos.filter(pedido => pedido.repartidor == uidRepartidor))
      );
    }

    return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
      map(pedidos => {
        let pedidosPorRepartidor = pedidos.filter(pedido => pedido.repartidor == uidRepartidor);
        let pedidosPorEstado = pedidosPorRepartidor.filter(pedido => pedido.espera == estado.toString());
        //let pedidosOrdenados = pedidosPorEstado.sort((p1, p2) => 0);
        let pedidosOrdenados = pedidosPorEstado;
        return pedidosOrdenados;
      })
    );
  }

  updateEsperaPedido(uidPedido: string, nuevaEspera: EsperaPedido): Promise<void> {
    return this.afs.collection('pedidos').doc(uidPedido).update({ estado: nuevaEspera.toString()});
  }

  updateEstadoPedido(uidPedido: string, nuevoEstado: EstadoPedido): Promise<void> {
    return this.afs.collection('pedidos').doc(uidPedido).update({ estado: nuevoEstado.toString()});
  }

  getListaPedidos(uidCliente: string){
    return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
      map(pedidos => pedidos.filter(pedido => pedido.cliente == uidCliente))
    );
  }

  getRestaurant(uidRestaurant: string) {
    return this.afs.collection<Restaurant>('restaurantes').valueChanges().pipe(
      map(restaurants => restaurants.find(r => r.uid == uidRestaurant))
    );
  }

  getRepartidor(uidRepartidor: string){
    return this.afs.collection<Usuario>('usuarios').valueChanges().pipe(
      map(usuario => usuario.find(u => u.uid == uidRepartidor))
    );
  }
}
