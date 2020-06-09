import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { Usuario } from 'src/app/dbdocs/usuario';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosPorCategoria } from 'src/app/dbdocs/producto';
import { RestaurantesPorCategoria } from 'src/app/dbdocs/restaurant';
import { CacheService } from 'src/app/cache/cache.service';
import { Router } from '@angular/router';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CacheProductos } from 'src/app/cache/cache-productos';
import { DocsPlantillas, getPlantilla } from 'src/app/dbdocs/plantillas';
import { NavController } from '@ionic/angular';
import { DetallesComidaSeleccionadaPage } from 'src/app/pages/cliente/detalles-comida-seleccionada/detalles-comida-seleccionada.page'; 
import { ModalController } from '@ionic/angular';
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    anchorToolbar = false;
    showTitle = false;

    usuario = CacheUsuario.usuario;
    //usuario = getPlantilla(DocsPlantillas.usuario) as Usuario;

    segmentSuperior = '';
    segmentCentral = '';
    segmentInferior = '';

    menuPrincipal;
    menuOpciones;
    menuCuenta;

    productosPorCategoria: ProductosPorCategoria[];
    restsPorCategoria: RestaurantesPorCategoria[];

    constructor(
        private cacheService: CacheService,
        private productosService: ProductosService,
        private restaurantService: RestaurantService,
        private navController: NavController,
        private router: Router,
        private modalController: ModalController
        ) { }

    ngOnInit() {
        console.log('Iniciando cache...');
        this.cacheService.iniciarCache();

        this.cacheService.setOnRestaurantesIniciado(
            () => {
                console.log('setOnCacheRestaurantesIniciado SUCCESS');
                this.restsPorCategoria = CacheRestaurantes.getRestaurantesAllPorCategoria();
                this.segmentCentral = this.restsPorCategoria[0].categoria;
            },
            error => {
                console.error('setOnCacheRestaurantesIniciado FAILURE');
                console.error(error);
            }
            );

        this.cacheService.setOnProductosIniciado(
            () => {
                console.log('setOnProductosIniciado SUCCESS');
                this.productosPorCategoria = CacheProductos.getAllProductosPorCategoria();
                this.segmentInferior = this.productosPorCategoria[0].categoria;
            },
            error => {
                console.error('setOnProductosIniciado FAILURE');
                console.error(error);
            }
            );
    }

    verCarrito() {
        console.log('inicio.page verCarrito()');
        this.presentPrePedidoModal();
    }

    verProducto(producto) {
        console.log('producto seleccionado: ', producto);
        this.presentDetallesComidaModal(producto.nombre, producto.restaurante);
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
                this.presentSeguirPedidoModal(data['data'].uidPedido);
            }
        });
        return await modal.present();
    }

    async presentDetallesComidaModal(nombreProducto, uidRestaurante) {
        const modal = await this.modalController.create({
            component: DetallesComidaSeleccionadaPage,
            componentProps: {
                'nombreProducto': nombreProducto,
                'uidRestaurante': uidRestaurante
            }
        });

        modal.onDidDismiss()
        .then(data => {
            console.log('detalles comida modal dismissed data: ', data);
            // this.estado = data['data'];
        });

        return await modal.present();
    }

    abrirRestaurante(uidRestaurant: string) {
        console.log('Abriendo restaurant con uid', uidRestaurant);

        this.router.navigate(['/restaurant'], {
            queryParams: {
                uidRestaurant: uidRestaurant
            }
        });
    }

    cerrarSesion() {
        this.cacheService.setOnBorrarCacheListener(() => {
            console.log('Cache de la app borrado!');
            this.navController.navigateBack('/login');
        });

        this.cacheService.borrarCache();
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.anchorToolbar = scrollTop >= 70;
            this.showTitle = scrollTop >= 70;
        }
    }
}
