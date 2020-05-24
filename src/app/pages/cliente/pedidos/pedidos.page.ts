import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/dbdocs/pedido';
import { Restaurant } from 'src/app/dbdocs/restaurant';
import { PedidosService } from "../../../services/pedidos.service";
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
//import { ConsoleReporter } from 'jasmine';

interface PedidosPorRestaurante{
  nombre: string;
  estado: string;
  productos: string [];
  nombreRestaurante: string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any[];
  public Pedidos : Pedido[];
  public pedidosPorRestaurante: PedidosPorRestaurante[];
  public uidCliente : string = '9TYcT3e3CrRLqa2JgGMLJSmmjPw1'
  public nombreRestaurant : string;

  constructor(
    public pedidoservice : PedidosService,
  ) { }

  ngOnInit() {
    this.pedidos = [
      {
        img: "../../../assets/img/pizzah.jpg",
        estado: 1,
        titulo: "Pizza Hawaiana",
        negocio: "Domino's Pizza",
        repartidor: "Edgar Vazquez"
      },
      {
        img: "../../../assets/img/pizzah.jpg",
        estado: 3,
        titulo: "Pizza Pepperoni",
        negocio: "Domino's Pizza",
        repartidor: "Rie Takahashi"
      }
    ]

    this.pedidoservice.getListaPedidos(this.uidCliente).subscribe(pedido => {
      console.log('Pedidos de cliente');
      this.Pedidos = pedido;
      console.log(this.Pedidos);

      this.pedidosPorRestaurante = this.getListaPedidosPorRestaurante(this.Pedidos);
      console.log('Pedidos por restaurante');
      console.log(this.pedidosPorRestaurante);
    })
  }

  getListaPedidosPorRestaurante(pedidos: Pedido[]): PedidosPorRestaurante[]{
    let pedidosPorRestaurante = new Array<PedidosPorRestaurante>();

    pedidos.forEach(pedido =>{
      this.pedidoservice.getRestaurant(pedido.restaurante).subscribe(restaurante => {

        this.pedidoservice.getRepartidor(pedido.repartidor).subscribe(repartidor =>{
        
          pedidosPorRestaurante.push({
            nombre: repartidor.nombre,
            estado: pedido.estado,
            productos: pedido.productos,
            nombreRestaurante: restaurante.nombre,
          }); 
        });
      });
    });

    return pedidosPorRestaurante;
  }

  /*getListaPedidosPorRestaurante(pedidos: Pedido[]): PedidosPorRestaurante[]{
    let pedidosPorRestaurante = new Array<PedidosPorRestaurante>();
    let listaDePedidos = pedidos.map(pedido => pedido);
    console.log('Entro al metodo');

    listaDePedidos.forEach(async pedido => {
      let nombreRestaurante = await this.pedidoservice.getRestaurant(pedido.restaurante).pipe(map(restaurant => restaurant.nombre)).toPromise();
      console.log('Entro al for each')
      pedidosPorRestaurante.push({
        nombre: "GGG",
        estado: pedido.estado,
        productos: pedido.productos,
        nombreRestaurante: "RRR",
      });
    });

    return pedidosPorRestaurante;
  }*/

}
