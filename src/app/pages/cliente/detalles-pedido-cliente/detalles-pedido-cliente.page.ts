import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/dbdocs/pedido';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { EsperaPedido, PedidosService, EstadoPedido } from 'src/app/services/pedidos.service';
import { AlertController } from '@ionic/angular';
import { Direccion } from 'src/app/dbdocs/direccion';
import { CacheDirecciones } from 'src/app/cache/cache-direcciones';
import { DocsPlantillas, getPlantilla } from 'src/app/dbdocs/plantillas';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { CacheUsuario } from 'src/app/cache/cache-usuario';

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
  direccion = getPlantilla(DocsPlantillas.direccion) as Direccion;
  uidPedido: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public direccioService: DireccionesService,
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

    console.log('Buscando la direccion del pedido...');
    if (!CacheDirecciones.getDireccion(this.pedido.direccion)) {
      this.direccioService.getDireccion(this.pedido.direccion).subscribe(
        direccion => {
          console.log('Direccion del pedido encontrada! :D', direccion);
          this.direccion = direccion;

          CacheDirecciones.addDireccion(CacheUsuario.usuario.uid, direccion);
        },
        error => {
          console.error('Error al buscar direccion del pedido :(');
          console.error(error);
        }
      );
    }
    else {
      this.direccion = CacheDirecciones.getDireccion(this.pedido.direccion);
    }
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

  abrirRestaurante(uidRestaurant: string) {
    console.log('Abriendo restaurant con uid', uidRestaurant);
    
    this.router.navigate(['/restaurant'], {
      queryParams: {
        uidRestaurant: uidRestaurant,
      }
    });
  }

}
