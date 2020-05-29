import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { ModalController } from '@ionic/angular';
import { Restaurant } from 'src/app/dbdocs/restaurant';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/dbdocs/producto';
import { getPlantilla, DocsPlantillas } from 'src/app/dbdocs/plantillas';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CachePedidos } from 'src/app/cache/cache-pedidos';
import { CacheProductos } from 'src/app/cache/cache-productos';

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

  //public uidRestaurant: string = 'K0WCy5wF99fdaQb1kxJ9';
  public uidRestaurant: string;
  public restaurant = getPlantilla(DocsPlantillas.restaurant) as Restaurant;
  public productos: Producto[];
  public productosPorCategoria: ProductosPorCategoria[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public restaurantservice: RestaurantService,
    public utils: UtilsService,
  ) { }

  ngOnInit() {
    this.uidRestaurant = this.activatedRoute.snapshot.queryParamMap.get('uidRestaurant');
    
    console.log('Uid restaurant: ' + this.uidRestaurant);

    // Si tiene conexion a internet
    if (this.utils.tieneConexionInternet()) {
      console.log('Buscando restaurant...');
      this.restaurantservice.getRestaurant(this.uidRestaurant).subscribe(restaurant => {
        console.log('Restaurant encontrado! :D');
        console.log(restaurant);
  
        this.restaurant = restaurant;
        CacheRestaurantes.setRestaurante(this.restaurant);
      });
  
      console.log('Buscando productos de restaurnt...');
      this.restaurantservice.getProductos(this.uidRestaurant).subscribe(productos => {
        console.log('Productos encontrados!');
        console.table(productos);
  
        this.productos = productos;

        CacheProductos.setAllProductos(this.productos);
  
        console.log('Obteniendo productos por categoria...');
        this.productosPorCategoria = this.getProductosPorCategoria(this.productos);
        console.log(this.productosPorCategoria);
      });
    }
    // No tiene conexion a internet
    else {
      this.restaurant = CacheRestaurantes.getRestaurante(this.uidRestaurant);
      this.productos = CacheProductos.getAllProductosRestaurante(this.uidRestaurant);
    }
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
