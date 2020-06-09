import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/dbdocs/pedido';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { PedidosService, EstadoPedido } from 'src/app/services/pedidos.service';
import { AlertController } from '@ionic/angular';

interface ProductoItem {
  desc: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-detalles-pedido-repartidor',
  templateUrl: './detalles-pedido-repartidor.page.html',
  styleUrls: ['./detalles-pedido-repartidor.page.scss'],
})
export class DetallesPedidoRepartidorPage implements OnInit {

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
    console.log('Obteniendo el enviado pedido...');

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
        uidReceptor: this.pedido.cliente,
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

  async onBtnEstadoPedidoClick() {
    console.log('onBtnEstadoPedidoClick()');

    const alert = await this.alertController.create({
      header: 'Estado del pedido',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: data => this.onEstadoSeleccionado(data),
        },
      ],
      inputs: [
        {
          type: 'radio',
          label: EstadoPedido.Confirmado.toString(),
          value: EstadoPedido.Confirmado,
        },
        {
          type: 'radio',
          label: EstadoPedido.Preparando.toString(),
          value: EstadoPedido.Preparando,
        },
        {
          type: 'radio',
          label: EstadoPedido.Recolectando.toString(),
          value: EstadoPedido.Recolectando,
        },
        {
          type: 'radio',
          label: EstadoPedido.Transitando.toString(),
          value: EstadoPedido.Transitando,
        },
        {
          type: 'radio',
          label: EstadoPedido.Entregado.toString(),
          value: EstadoPedido.Entregado,
        },
      ],
    });

    await alert.present();
  }

  onEstadoSeleccionado(data: any) {
    console.log('onEstadoSeleccionado()');
    console.log(data);

    this.estadoPedido = data;

    console.log('Actualizando el estado del pedido...');

    this.pedidoService.updateEstadoPedido(this.pedido.uid, this.estadoPedido)
    .then(result => {
      console.log('Estado del pedido actualizado! :D');
    })
    .catch(error => {
      console.error('Error al actualizar el estado del pedido :(');
      console.error(error);
    });
  }

}
