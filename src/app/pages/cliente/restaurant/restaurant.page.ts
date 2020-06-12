import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service";
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { DetallesComidaSeleccionadaPage } from 'src/app/pages/cliente/detalles-comida-seleccionada/detalles-comida-seleccionada.page'; 
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
import { NavigationExtras } from '@angular/router';
import { CacheCarrito } from 'src/app/cache/cache-carrito';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { RestaurantesFavoritos } from 'src/app/dbdocs/restaurantesFavoritos'
import { Observable } from 'rxjs';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';

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
    carritoVacio: boolean = true;

    //public uidRestaurant: string = 'K0WCy5wF99fdaQb1kxJ9';
    public uidRestaurant: string;
    public fotoPortada: SafeStyle;
    public restaurant = getPlantilla(DocsPlantillas.restaurant) as Restaurant;
    public productosPorCategoria: ProductosPorCategoria[];
    public uidCliente = CacheUsuario.usuario.uid;
    public restaurantesFavoritos = getPlantilla(DocsPlantillas.restaurantesFavoritos) as RestaurantesFavoritos;
    public esResturanteFavorito: boolean;
    public asignarColor = 0;

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private cacheService: CacheService,
        public domSanitizer: DomSanitizer,
        public modalController: ModalController,
        public utils: UtilsService,
        public restaurantService: RestaurantService,
        private guiUtils: GuiUtilsService,
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
                        this.productosPorCategoria = CacheProductos.getAllProductosPorCategoriaDeRestaurant(this.uidRestaurant);
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

                this.productosPorCategoria = CacheProductos.getAllProductosPorCategoriaDeRestaurant(this.uidRestaurant);
                this.select = this.productosPorCategoria[0].categoria;
            }
        }
        // No tiene conexion a internet, cargar datos desde el cache
        else {
            console.log('No hay conexion a internet. Cargando restaurantes y productos desde el cache...');

            this.restaurant = CacheRestaurantes.getRestaurante(this.uidRestaurant);
            this.productosPorCategoria = CacheProductos.getAllProductosPorCategoriaDeRestaurant(this.uidRestaurant);
            this.select = this.productosPorCategoria[0].categoria;
            // TODO Cambiar foto de portada por otra por defecto si no hay internet
            //this.fotoPortada = this.domSanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.foto_portada})`);
        }
        
        if(this.restaurantService.verificarSiHayFavoritos(this.uidCliente)){    
            this.cargarRestaurantesFavoritos();
        }
    }

    segmentChanged(ev: any) { }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.showToolbar = scrollTop >= 100;
        }
    }

    verCarrito() {
        console.log('Down Button Click');
        if(!CacheCarrito.isCarritoEmpty()) {
            this.presentPrePedidoModal();
        } else {
            this.guiUtils.mostrarAlertaConfirmar('Carrito vacio', 'Antes de ver carrito, agregue elementos.');
        }
    }

    seguirPedido() {
        console.log('seguirPedido()');
        this.verPedido();
    }

    detallarProducto(producto) {
        this.presentDetallesComidaModal(producto.nombre);
    }

    verPedido() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                uid: CacheCarrito.getUidPedido()
            }
        }
        this.router.navigate(['/preparando-pedido'], navigationExtras);
    }

    async presentDetallesComidaModal(nombreProducto) {
        const modal = await this.modalController.create({
            component: DetallesComidaSeleccionadaPage,
            componentProps: {
                'nombreProducto': nombreProducto,
                'uidRestaurante': this.uidRestaurant
            }
        });

        modal.onDidDismiss()
        .then(data => {
            console.log('detalles comida modal dismissed data: ', data);
            this.estado = data['data'];
            this.carritoVacio = CacheCarrito.isCarritoEmpty();
        });

        return await modal.present();
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
                console.log('data: ', data);
                this.estado = data['data'].estado;
                this.presentSeguirPedidoModal(data['data'].uidPedido);
            }
        });
        return await modal.present();
    }

    agregarFavoritos(){
        this.uidRestaurant = this.activatedRoute.snapshot.queryParamMap.get('uidRestaurant');
        this.uidCliente = CacheUsuario.usuario.uid;
        if(this.esResturanteFavorito){
            console.log("agregarFavoritos() el restaurante ya es favorito");
            this.restaurantService.quitarRestaurantFavorito(this.uidCliente, this.uidRestaurant);
            this.esResturanteFavorito = false;
            this.asignarColor = 0;
            
        }else{
            console.log("agregarFavoritos() el restaurante NOOOOO es favorito");
            this.restaurantService.agregarRestauranteFavoritos(this.uidCliente, this.uidRestaurant);
            this.esResturanteFavorito = true;
            this.asignarColor = 100;
        }
    }

    cargarRestaurantesFavoritos(){
        this.restaurantService.getRestaurantesFavoritos(this.uidCliente).subscribe(
            restaurantesFav => {
            console.log('Restaurantes favoritos obtenidos!');
            this.restaurantesFavoritos = restaurantesFav;
            console.log(this.restaurantesFavoritos.restaurantes);

            if(this.restaurantesFavoritos.restaurantes.includes(this.uidRestaurant)){
                this.esResturanteFavorito = true;
                this.asignarColor = 100;
            }
            else{
                this.esResturanteFavorito = false;
                this.asignarColor = 0;
            }
                console.log("Booooolena");
                console.log(this.esResturanteFavorito);
            },
            error => {
            console.error('No se pudieron obtener los restaurantes favoritos :(');
            console.error(error);
            }
        );
    }
}
