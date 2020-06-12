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

  getPedido(uidPedido: string): Observable<Pedido> {
    return this.getPedidos(EsperaPedido.Todos).pipe(
      map(pedidos => pedidos.find(p => p.uid == uidPedido))
    );
  }

  getPedidos(estado: EsperaPedido) {
    if (estado == EsperaPedido.Todos) {
      return this.afs.collection<Pedido>('pedidos').valueChanges();
    }

    return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
      map(pedidos => {
        let pedidosPorEspera = pedidos.filter(pedido => pedido.espera == estado.toString());
        let pedidosOrdenados = pedidosPorEspera.sort((p1, p2) => (new Date(p1.fechaHora)).getTime() - (new Date(p2.fechaHora)).getTime());
        return pedidosOrdenados;
      })
    );
  }

  getPedidosDeRepartidor(uidRepartidor: string, espera: EsperaPedido): Observable<Pedido[]> {
    if (espera == EsperaPedido.Todos) {
      return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
        map(pedidos => pedidos.filter(pedido => pedido.repartidor == uidRepartidor))
      );
    }

    return this.afs.collection<Pedido>('pedidos').valueChanges().pipe(
      map(pedidos => {
        let pedidosPorRepartidor = pedidos.filter(pedido => pedido.repartidor == uidRepartidor);
        let pedidosPorEstado = pedidosPorRepartidor.filter(pedido => pedido.espera == espera.toString());
        let pedidosOrdenados = pedidosPorEstado.sort((p1, p2) => (new Date(p1.fechaHora)).getTime() - (new Date(p2.fechaHora)).getTime());
        return pedidosOrdenados;
      })
    );
  }

  updateEsperaPedido(uidPedido: string, nuevaEspera: EsperaPedido): Promise<void> {
    return this.afs.collection('pedidos').doc(uidPedido).update({ espera: nuevaEspera.toString()});
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

  getPedidosCompletosDeUsuario(
    uidUsuario: string,
    espera: EsperaPedido,
    resolver: (pedidos: Pedido[]) => void,
    manejarError: (error: any) => void
  ) {
    return this.afs.collection<Pedido>('pedidos').valueChanges()
    .pipe(map(pedidos => {

      // Filtrar por estado
      if (espera != EsperaPedido.Todos) {
        pedidos = pedidos.filter(p => p.espera == espera);
      }

      // Filtrar por usuario
      let pedidosPorUsuario = pedidos.filter(p => p.cliente == uidUsuario);

      // Completar la informacion de los pedidos
      let pedidosCompletos = pedidosPorUsuario.map(async pedido => {
        let nombreRest = (await (this.afs.firestore.collection('restaurantes').doc(pedido.restaurante).get())).get('nombre') as string;
        let fotoRest = (await (this.afs.firestore.collection('restaurantes').doc(pedido.restaurante).get())).get('foto_perfil') as string;
        let nombreRep = (await (this.afs.firestore.collection('usuarios').doc(pedido.repartidor).get())).get('nombre') as string;

        pedido.nombreRestaurante = nombreRest;
        pedido.foto_perfil = fotoRest;
        pedido.nombreRepartidor = nombreRep;

        return pedido;
      });

      return pedidosCompletos;
    }))
    // Obtener asincronamente los pedidos
    .subscribe(promises => {
      Promise.all(promises).then(pedidos => {
        resolver(pedidos);
      })
      .catch(error => {
        manejarError(error);
      });
    },
    error => manejarError(error));
  }

}
