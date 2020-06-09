import { Component, OnInit } from '@angular/core';
import { PedidosService, EsperaPedido } from 'src/app/services/pedidos.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Pedido } from 'src/app/dbdocs/pedido';
import { Router } from '@angular/router';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { Mandado } from 'src/app/dbdocs/mandado';
import { MandadoService } from 'src/app/services/mandado.service';
import { CacheMandados } from 'src/app/cache/cache-mandados';

@Component({
  selector: 'app-tab-pedidos-repartidor',
  templateUrl: './tab-pedidos-repartidor.page.html',
  styleUrls: ['./tab-pedidos-repartidor.page.scss'],
})
export class TabPedidosRepartidorPage implements OnInit {

  segmentPedidos = 'pedidos';
  segmentMandados = 'mandados';
  segmentSeleccionado = this.segmentPedidos;

  pedidosEnTransito = new Array<Pedido>();
  pedidosPendientes = new Array<Pedido>();
  pedidosConcluidos = new Array<Pedido>();

  mandadosPendientes = new Array<Mandado>();
  mandadosConcluidos = new Array<Mandado>();

  constructor(
    private mandadoService: MandadoService,
    private pedidosService: PedidosService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPedidos();
    this.getMandados();
  }

  getPedidos() {
    console.log('Obteniendo pedidos...');

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

  getMandados() {
    console.log('Obteniendo mandados...');

    this.mandadoService.getMandadosDeRepartidor(CacheUsuario.usuario.uid, EsperaPedido.Pendiente).subscribe(
      mandados => {
        console.log('Se obtuvieron los mandados pendientes :D');
        console.table(mandados);

        this.mandadosPendientes = mandados;
        CacheMandados.addAllMandados(this.mandadosPendientes);
      },
      error => {
        console.error('Error al obtener mandados pendientes :(');
        console.error(error);
      }
    );

    this.mandadoService.getMandadosDeRepartidor(CacheUsuario.usuario.uid, EsperaPedido.Concluido).subscribe(
      mandados => {
        console.log('Se obtuvieron los mandados concluidos :D');
        console.table(mandados);

        this.mandadosConcluidos = mandados;
        CacheMandados.addAllMandados(this.mandadosConcluidos);
      },
      error => {
        console.error('Error al obtener mandados concluidos :(');
        console.error(error);
      }
    );
  }

  verDetallesPedido(pedido: Pedido) {
    this.router.navigate(['/detalles-pedido-repartidor'], {
      queryParams: {
        uidPedido: pedido.uid,
      }
    });
  }

  verDetallesMandado(uidMandado: string) {
    this.router.navigate(['/detalles-mandado-repartidor'], {
      queryParams: {
        uidMandado: uidMandado,
      }
    });
  }
}
