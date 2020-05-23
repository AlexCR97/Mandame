import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { ModalController } from '@ionic/angular';
import { Restaurant } from 'src/app/dbdocs/restaurant';
import { Producto } from 'src/app/dbdocs/producto';

interface ProductosPorCategoria {
  categoria: string;
  productos: Producto[];
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  showToolbar = false;
  select: string;
  nombreRestaurant: string;

  public uidRestaurant: string = '8fXc1YIaCjXTjb6Ry5t4';
  public restaurant: Restaurant = {
    calificacion: 0,
    categoria: '',
    complementos: '',
    estado: '',
    foto_perfil: '',
    foto_portada: '',
    nombre: '',
    productos: [],
    tiempo_entrega: 0,
    uid: '8fXc1YIaCjXTjb6Ry5t4',
  };
  public productos: Producto[];
  public productosPorCategoria: ProductosPorCategoria[];

  constructor(
    public modalController: ModalController,
    public restaurantservice: RestaurantService,
  ) { }

  ngOnInit() {
    console.log('Uid restaurant: ' + this.uidRestaurant);

    console.log('Buscando restaurant...');
    this.restaurantservice.getRestaurant(this.uidRestaurant).subscribe(restaurant => {
      console.log('Restaurant encontrado! :D');
      console.log(restaurant);

      this.restaurant = restaurant;
    });

    console.log('Buscando productos de restaurnt...');
    this.restaurantservice.getProductos(this.uidRestaurant).subscribe(productos => {
      console.log('Productos encontrados!');
      console.table(productos);

      this.productos = productos;

      console.log('Obteniendo productos por categoria...');
      this.productosPorCategoria = this.getProductosPorCategoria(this.productos);
      console.log(this.productosPorCategoria);
    });
  }

  getProductosPorCategoria(productos: Producto[]): ProductosPorCategoria[] {
    let productosPorCategoria = new Array<ProductosPorCategoria>();

    let categoriasRepetidas = productos.map(producto => producto.categoria);
    let categoriasUnicas = new Set<string>(categoriasRepetidas);

    categoriasUnicas.forEach(categ =>{
      let prods = productos.filter(prod => prod.categoria == categ);

      productosPorCategoria.push({
        categoria: categ,
        productos: prods,
      });
    });

    return productosPorCategoria;
  }

  segmentChanged(ev: any) { }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }

  // TODO: Change the btnClick name to another most meaningful
  btnClick() {
    console.log('Down Button Click');
    this.presentPrePedidoModal();
  }

  async presentSeguirPedidoModal(uidpedido) {
    const modal = await this.modalController.create({
      component: ModalAlertPage,
      componentProps: {
        'uid': uidpedido
      },
      cssClass: "dialog-modal"
    });
    return await modal.present();
  }

  async presentPrePedidoModal() {
    const modal = await this.modalController.create({
      component: PrePedidoPage
    });
    modal.onDidDismiss().then((data) => {
      if(data.data) {
        this.presentSeguirPedidoModal(data.data);
      }
      // TODO: CHANGE COLOR ANV ALUES OF DOWN BUTTON
    });
    return await modal.present();
  }
}
