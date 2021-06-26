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
import { CacheCarrito } from 'src/app/cache/cache-carrito';
import { DocsPlantillas, getPlantilla } from 'src/app/dbdocs/plantillas';
import { NavController } from '@ionic/angular';
import { DetallesComidaSeleccionadaPage } from 'src/app/pages/cliente/detalles-comida-seleccionada/detalles-comida-seleccionada.page'; 
import { ModalController } from '@ionic/angular';
import { PrePedidoPage } from 'src/app/modals/pre-pedido/pre-pedido.page';
import { ModalAlertPage } from 'src/app/modals/modal-alert/modal-alert.page';
import { AlertController } from '@ionic/angular';
import arrays from 'src/app/utils/arrays';
import timers from 'src/app/utils/time';
import time from 'src/app/utils/time';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    anchorToolbar = false;
    showTitle = false;

    usuario = <Usuario> {
        apellido: "Castillo",
        email: "ale@live.com",
        nombre: "Alejandro",
        posicion: "cliente",
        telefono: "8311146563",
    };

    segmentSuperior = ''; 
    segmentCentral = '';  // Restaurantes por categoria
    segmentInferior = ''; // Productos por categoria

    menuPrincipal;
    menuOpciones;
    menuCuenta;

    productosPorCategoria: ProductosPorCategoria[];
    restsPorCategoria: RestaurantesPorCategoria[];

    ofertasItems: { imgSrc: string }[];
    masVendidosItems: { imgSrc: string }[];
    proximamenteItems: { imgSrc: string }[];

    constructor(
        private cacheService: CacheService,
        private navController: NavController,
        private router: Router,
        private modalController: ModalController,
        public alertController: AlertController
        ) { }

    ngOnInit() {
        this.getProductosPorCategoria();
    }

    private async getProductosPorCategoria() {
        await time.wait(1000);

        this.ofertasItems = arrays.fromRange(1, 4).map(_ => ({
            imgSrc: "https://via.placeholder.com/350x150",
        }));

        this.masVendidosItems = arrays.fromRange(1, 4).map(_ => ({
            imgSrc: "https://via.placeholder.com/350x150",
        }));

        this.proximamenteItems = arrays.fromRange(1, 4).map(_ => ({
            imgSrc: "https://via.placeholder.com/350x150",
        }));

        this.productosPorCategoria = arrays.fromRange(1, 5).map(indexCategoria => <ProductosPorCategoria> ({
            categoria: `Categoria ${indexCategoria}`,
            productos: arrays.fromRange(1, 7).map(indexProducto => ({
                categoria: `Categoria ${indexCategoria}`,
                contenido: indexProducto,
                ingredientes: arrays.fromRange(1, 5).map(indexIngrediente => `Ingrediente ${indexIngrediente}`),
                foto: "https://via.placeholder.com/150/DDDDDD/000000",
                nombre: `Producto ${indexProducto}`,
                precio: indexProducto * 10,
                restaurante: `Restaurant ${indexProducto}`,
                nombreRestaurant: `Restaurant ${indexProducto}`,
            })),
        }));

        this.restsPorCategoria = arrays.fromRange(1, 6).map(indexCategoria => <RestaurantesPorCategoria> ({
            categoria: `Categoria ${indexCategoria}`,
            restaurantes: arrays.fromRange(1, 5).map(indexRestaurant => ({
                adicionales: arrays.fromRange(1, 5).map(index => `Adicional ${index}`),
                calificacion: indexRestaurant,
                categoria: `Categoria ${indexCategoria}`,
                complementos: 'Complemento',
                estado: 'Estado',
                foto_perfil: "https://via.placeholder.com/150/DDDDDD/000000",
                foto_portada: "https://via.placeholder.com/150/DDDDDD/000000",
                nombre: `Restaurant ${indexRestaurant}`,
                productos: arrays.fromRange(1, 5).map(index => `Producto ${index}`),
                tiempo_entrega: indexRestaurant,
            })),
        }));

        this.segmentSuperior = 'ofertas';
        this.segmentInferior = 'Categoria 1'; 
        this.segmentCentral = 'Categoria 1'; 
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Carrito vacio',
            message: 'Agregue elementos al carrito.',
            buttons: ['OK']
        });

        await alert.present();
    }

    verCarrito() {
        console.log('inicio.page verCarrito()');
        if(!CacheCarrito.isCarritoEmpty()) {
            this.presentPrePedidoModal();
        } else {
            this.presentAlert();
        }
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
