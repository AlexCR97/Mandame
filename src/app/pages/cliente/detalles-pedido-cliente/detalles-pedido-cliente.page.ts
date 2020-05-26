import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/dbdocs/pedido';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { EsperaPedido, PedidosService, EstadoPedido } from 'src/app/services/pedidos.service';
import { AlertController } from '@ionic/angular';

interface ProductoItem {
  desc: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-detalles-pedido-cliente',
  templateUrl: './detalles-pedido-cliente.page.html',
  styleUrls: ['./detalles-pedido-cliente.page.scss'],
})
export class DetallesPedidoClientePage implements OnInit {

  estadoPedido = EstadoPedido.Confirmado;
  pedido: Pedido;
  productos: ProductoItem[];
  total: number;
  uidPedido: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public pedidoService: PedidosService,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('Obteniendo el pedido del usuario...');

    this.uidPedido = this.activatedRoute.snapshot.queryParamMap.get('uidPedido');
    this.pedido = CachePedidos.getPedido(this.uidPedido);

    console.log('Uid del pedido: ' + this.uidPedido);
    console.log('Pedido encontrado:');
    console.log(this.pedido);

    this.productos = this.getProductos(this.pedido);
    this.total = this.getTotal(this.productos);
  }

  abrirMensajes() {
    console.log('abrirMensajes()');

    this.router.navigate(['/mensajes'], {
      queryParams: {
        uidReceptor: this.pedido.repartidor,
      },
    });
  }

  getProductos(pedido: Pedido): ProductoItem[] {
    let count = pedido.productos.length;
    let productosCompletos = new Array<ProductoItem>();

    for (let i = 0; i < count; i++) {
      productosCompletos.push({
        desc: pedido.productos[i],
        cantidad: pedido.cantidad[i],
        precio: pedido.precios[i],
      });
    }

    return productosCompletos;
  }

  getTotal(productos: ProductoItem[]): number {
    return productos.map(producto => producto.precio).reduce((a, b) => a + b, 0);
  }

}
