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

  public Pedidos: Pedido[];
  public pedidosPendientes: Pedido[];
  public pedidosConcluidos: Pedido[];
  public uidCliente: string;
  public nombreRestaurant : string;

  constructor(
    public gui: GuiUtilsService,
    public pedidoservice : PedidosService,
    public router: Router,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    this.uidCliente = CacheUsuario.usuario.uid;
    
    // SI HAY CONEXION A INTERNET
    if (this.utils.tieneConexionInternet()) {

      console.log('Obteniendo pedidos pendientes...');
      // TODO Santana: Cambiar la espera del pedido a pendientes
      this.pedidoservice.getPedidosCompletosDeUsuario(this.uidCliente, EsperaPedido.Todos,
        pedidos => {
          console.log('Pedidos obtenidos! :D');
          console.table(pedidos);

          this.pedidosPendientes = pedidos;
          CachePedidos.setAllPedidos(this.pedidosPendientes);
        },
        error => {
          console.log('Error al obtener los pedidos :(');
          console.log(error);

          this.gui.mostrarToast('No se pudieron obtener los pedidos :(', 3000, 'danger');
        }
      );

      console.log('Obteniendo pedidos concluidos...');
      // TODO Santana: Cambiar la espera del pedido a concluidos
      this.pedidoservice.getPedidosCompletosDeUsuario(this.uidCliente, EsperaPedido.Todos,
        pedidos => {
          console.log('Pedidos obtenidos! :D');
          console.table(pedidos);

          this.pedidosConcluidos = pedidos;
          CachePedidos.setAllPedidos(this.pedidosConcluidos);
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
      // TODO Santana: Cambiar la espera del pedido al correspondiente
      this.pedidosPendientes = CachePedidos.getAllPedidosDeUsuario(this.uidCliente, EsperaPedido.Todos);
      this.pedidosConcluidos = CachePedidos.getAllPedidosDeUsuario(this.uidCliente, EsperaPedido.Todos);
    }
  }

  abrirDetallesPedido(uid: string) {
    console.log('abrirDetallesPedido()')
    console.log(uid);

    //this.router.navigate(['/detalles-pedido-cliente'], {
    this.router.navigate(['/preparando-pedido'], {
      queryParams: {
        uidPedido: uid,
      }
    });
  }
}
