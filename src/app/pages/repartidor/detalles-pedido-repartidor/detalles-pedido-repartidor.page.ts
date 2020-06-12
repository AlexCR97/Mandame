import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/dbdocs/pedido';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { PedidosService, EstadoPedido, EsperaPedido } from 'src/app/services/pedidos.service';
import { AlertController } from '@ionic/angular';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';
import { Direccion } from 'src/app/dbdocs/direccion';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { SafeDocsService } from 'src/app/services/safe-docs.service';
import { DocsPlantillas, getPlantilla } from 'src/app/dbdocs/plantillas';

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
  direccion = getPlantilla(DocsPlantillas.direccion) as Direccion;

  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private direccionService: DireccionesService,
    public pedidoService: PedidosService,
    public router: Router,
    private safeDocs: SafeDocsService,
  ) { }

  ngOnInit() {
    console.log('Obteniendo el pedido del repartidor...');

    this.uidPedido = this.activatedRoute.snapshot.queryParamMap.get('uidPedido');
    this.pedido = CachePedidos.getPedido(this.uidPedido);
    this.estadoPedido = this.pedido.estado as EstadoPedido;

    // Completar datos del pedido
    this.pedido.foto_perfil = CacheRestaurantes.getRestaurante(this.pedido.restaurante).foto_perfil;
    this.pedido.nombreRestaurante = CacheRestaurantes.getRestaurante(this.pedido.restaurante).nombre;

    console.log('Uid del pedido: ' + this.uidPedido);
    console.log('Pedido encontrado:');
    console.log(this.pedido);

    if (CacheDirecciones.containsDireccion(this.pedido.direccion)) {
      this.direccion = CacheDirecciones.getDireccion(this.pedido.direccion)
    }
    else {
      this.direccionService.getDireccion(this.pedido.direccion).subscribe(
        direccion => this.direccion = direccion
      );
    }

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
    let productosCompletos = new Array<ProductoItem>();
    
    // Productos
    let countProductos = pedido.productos.length;
    for (let i = 0; i < countProductos; i++) {
      productosCompletos.push({
        desc: pedido.productos[i],
        cantidad: pedido.cantidad[i],
        precio: pedido.precios[i],
      });
    }

    // Complementos
    let countComplementos = pedido.complementos.length;
    for (let i = 0; i < countComplementos; i++) {
      let complemento = CacheRestaurantes.getComplemento(pedido.complementos[i]);
      productosCompletos.push({
        desc: complemento.nombre,
        cantidad: 1,
        precio: complemento.precio,
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

    if (data == undefined) {
      return;
    }

    this.estadoPedido = data;
    let nuevaEsperaPedido = EsperaPedido.Pendiente;

    if (this.estadoPedido == EstadoPedido.Confirmado) {
      nuevaEsperaPedido = EsperaPedido.Pendiente;
    }
    else if (this.estadoPedido == EstadoPedido.Preparando || this.estadoPedido == EstadoPedido.Recolectando || this.estadoPedido == EstadoPedido.Transitando) {
      nuevaEsperaPedido = EsperaPedido.EnTransito;
    }
    else if (this.estadoPedido == EstadoPedido.Entregado) {
      nuevaEsperaPedido = EsperaPedido.Concluido;
    }

    console.log('Actualizando el estado del pedido...');
    this.pedido.estado = this.estadoPedido;
    this.pedidoService.updateEstadoPedido(this.pedido.uid, this.estadoPedido)
    .then(result => {
      console.log('Estado del pedido actualizado! :D');
    })
    .catch(error => {
      console.error('Error al actualizar el estado del pedido :(');
      console.error(error);
    });

    console.log('Actualizando la espera del pedido...');
    this.pedido.espera = nuevaEsperaPedido;
    this.pedidoService.updateEsperaPedido(this.pedido.uid, nuevaEsperaPedido)
    .then(result => {
      console.log('Espera del pedido actualizado! :D');
    })
    .catch(error => {
      console.error('Error al actualizar la espera del pedido :(');
      console.error(error);
    });
  }

}
