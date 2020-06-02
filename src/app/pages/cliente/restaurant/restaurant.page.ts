import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { ModalController } from '@ionic/angular';
import { Restaurant } from 'src/app/dbdocs/restaurant';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/dbdocs/producto';
import { getPlantilla, DocsPlantillas } from 'src/app/dbdocs/plantillas';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CacheProductos } from 'src/app/cache/cache-productos';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CacheService } from 'src/app/cache/cache.service';

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

  // TODO: ADD PROPERTY TO SHOW/HIDE FOOTER WHEN NEEDED  

  showToolbar = false;
  select: string;
  nombreRestaurant: string;
  estado: string = '';

  //public uidRestaurant: string = 'K0WCy5wF99fdaQb1kxJ9';
  public uidRestaurant: string;
  public fotoPortada: SafeStyle;
  public restaurant = getPlantilla(DocsPlantillas.restaurant) as Restaurant;
  public productosPorCategoria: ProductosPorCategoria[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private cacheService: CacheService,
    public domSanitizer: DomSanitizer,
    public modalController: ModalController,
    public utils: UtilsService,
    ) { }

  ngOnInit() {
    this.uidRestaurant = this.activatedRoute.snapshot.queryParamMap.get('uidRestaurant');

    console.log('Uid restaurant: ' + this.uidRestaurant);

    // Si tiene conexion a internet
    if (this.utils.tieneConexionInternet()) {
      console.log('Si hay conexion a Internet');

      // Si no hay restaurantes en cache, cargarlos desde la bd
      if (CacheRestaurantes.isEmpty()) {
        console.log('Cargando restaurantes desde la bd...');

        this.cacheService.iniciarCacheRestaurantes();
        this.cacheService.setOnRestaurantesIniciado(
          () => {
            this.restaurant = CacheRestaurantes.getRestaurante(this.uidRestaurant);
            this.fotoPortada = this.domSanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.foto_portada})`);
          },
          error => {
            console.error(error);
          }
          );
      }
      // Si hay cache, cargar el restaurant desde el cache
      else {
        console.log('Cargando restaurantes desde el cache...');

        this.restaurant = CacheRestaurantes.getRestaurante(this.uidRestaurant);
        this.fotoPortada = this.domSanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.foto_portada})`);
      }

      // Si no hay productos en cache, cargarlos desde la bd
      if (CacheProductos.isEmpty()) {
        console.log('Cargando productos desde la bd...');

        this.cacheService.iniciarCacheProductos();
        this.cacheService.setOnProductosIniciado(
          () => {
            console.log('');
            this.productosPorCategoria = CacheProductos.getAllProductosPorCategoria();
            this.select = this.productosPorCategoria[0].categoria;
          },
          error => {
            console.error('');
          }
          );
      }
      // Si hay cache, cargar los productos desde el cache
      else {
        console.log('Cargando productos desde el cache...');

        this.productosPorCategoria = CacheProductos.getAllProductosPorCategoria();
        this.select = this.productosPorCategoria[0].categoria;
      }
    }
    // No tiene conexion a internet, cargar datos desde el cache
    else {
      console.log('No hay conexion a internet. Cargando restaurantes y productos desde el cache...');

      this.restaurant = CacheRestaurantes.getRestaurante(this.uidRestaurant);
      this.productosPorCategoria = CacheProductos.getAllProductosPorCategoria();
      this.select = this.productosPorCategoria[0].categoria;
      // TODO Cambiar foto de portada por otra por defecto si no hay internet
      //this.fotoPortada = this.domSanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.foto_portada})`);
    }
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

  detallarProducto(producto) {
    console.log('producto: ', producto);
    // let adicionales = this.productosPorCategoria.filter(i => i.categoria == 'adicionales')[0].productos;
    this.abrirDetallesProducto(producto.nombre);
  }

  abrirDetallesProducto(producto) {
    this.router.navigate(['/detalles-comida-seleccionada'], {
      queryParams: {
        producto: producto,
        uidRestaurante: this.uidRestaurant
      }
    });
  }

  async presentSeguirPedidoModal(uidpedido) {
    const modal = await this.modalController.create({
      component: ModalAlertPage,
      componentProps: {
        'uid': uidpedido
      },
      cssClass: "dialog-modal"
    });

    modal.onDidDismiss()
    .then(data => {
      console.log('modal dismissed data: ', data);
      // this.seguirPedido = data['data'];
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
