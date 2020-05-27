import { Component, OnInit } from '@angular/core';
import { PedidosService, EsperaPedido } from 'src/app/services/pedidos.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Pedido } from 'src/app/dbdocs/pedido';
import { Router } from '@angular/router';
import { CachePedidos } from 'src/app/cache/cache-pedidos';

@Component({
  selector: 'app-tab-pedidos-repartidor',
  templateUrl: './tab-pedidos-repartidor.page.html',
  styleUrls: ['./tab-pedidos-repartidor.page.scss'],
})
export class TabPedidosRepartidorPage implements OnInit {

  pedidosEnTransito = new Array<Pedido>();
  pedidosPendientes = new Array<Pedido>();
  pedidosConcluidos = new Array<Pedido>();

  constructor(
    public pedidosService: PedidosService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Obteniendo pedidos...');

    console.log(EsperaPedido.Todos.toString());
    console.log(EsperaPedido.EnTransito.toString());
    console.log(EsperaPedido.Pendiente.toString());
    console.log(EsperaPedido.Concluido.toString());

    this.pedidosService.getPedidosDeRepartidor(CacheUsuario.usuario.uid, EsperaPedido.EnTransito).subscribe(pedidos => {
      console.log('Pedidos en transito');
      console.table(pedidos);

      this.pedidosEnTransito = pedidos;
      CachePedidos.setAllPedidos(this.pedidosEnTransito);
    });

    this.pedidosService.getPedidosDeRepartidor(CacheUsuario.usuario.uid, EsperaPedido.Pendiente).subscribe(pedidos => {
      console.log('Pedidos pendientes');
      console.table(pedidos);

      this.pedidosPendientes = pedidos;
      CachePedidos.setAllPedidos(this.pedidosPendientes);
    });

    this.pedidosService.getPedidosDeRepartidor(CacheUsuario.usuario.uid, EsperaPedido.Concluido).subscribe(pedidos => {
      console.log('Pedidos concluidos');
      console.table(pedidos);

      this.pedidosConcluidos = pedidos;
      CachePedidos.setAllPedidos(this.pedidosConcluidos);
    });
  }

  verDetallesPedido(pedido: Pedido) {
    // TODO Cambiar uid del repartidor por uid del pedido
    this.router.navigate(['/detalles-pedido-repartidor'], {
      queryParams: {
        uidPedido: pedido.repartidor,
      }
    });
  }
}
