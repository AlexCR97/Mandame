import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/dbdocs/pedido';
import { PedidosService, EsperaPedido } from "../../../services/pedidos.service";
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public pedidosPendientes: Pedido[];
  public pedidosConcluidos: Pedido[];
  public uidCliente: string;
  public select: string;
  public nombreRestaurant : string;

  constructor(
    public gui: GuiUtilsService,
    public pedidoservice : PedidosService,
    public router: Router,
    public utils: UtilsService,
  ) { }

  segmentChanged(ev: any) { }

  ngOnInit() {
    console.log('PEDIDOS PAGE');
    this.select = 'pendientes';
    this.uidCliente = CacheUsuario.usuario.uid;

    console.log('uid cliente: ', this.uidCliente);

    // SI HAY CONEXION A INTERNET
    if (this.utils.tieneConexionInternet()) {

      console.log('Obteniendo pedidos pendientes...');
      this.pedidoservice.getPedidosCompletosDeUsuario(this.uidCliente, EsperaPedido.Pendiente,
        pedidos => {
          console.log('Pedidos obtenidos! :D');
          console.table(pedidos);

          this.pedidosPendientes = pedidos;
          CachePedidos.addAllPedidos(this.pedidosPendientes);
        },
        error => {
          console.log('Error al obtener los pedidos :(');
          console.log(error);

          this.gui.mostrarToast('No se pudieron obtener los pedidos :(', 3000, 'danger');
        }
      );

      console.log('Obteniendo pedidos concluidos...');
      this.pedidoservice.getPedidosCompletosDeUsuario(this.uidCliente, EsperaPedido.Concluido,
        pedidos => {
          console.log('Pedidos obtenidos! :D');
          console.table(pedidos);

          this.pedidosConcluidos = pedidos;
          CachePedidos.addAllPedidos(this.pedidosConcluidos);
        },
        error => {
          console.log('Error al obtener los pedidos :(');
          console.log(error);

          this.gui.mostrarToast('No se pudieron obtener los pedidos :(', 3000, 'danger');
        }
      );
    }
    // NO HAY CONEXION A INTERNET
    else {
      this.pedidosPendientes = CachePedidos.getAllPedidosDeUsuario(this.uidCliente, EsperaPedido.Pendiente);
      this.pedidosConcluidos = CachePedidos.getAllPedidosDeUsuario(this.uidCliente, EsperaPedido.Concluido);
    }
  }

  abrirDetallesPedido(uid: string) {
    console.log(`abrirDetallesPedido(${uid})`)

    this.router.navigate(['/preparando-pedido'], {
      queryParams: {
        uid: uid,
      }
    });
  }
}
