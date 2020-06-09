import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CacheCarrito } from 'src/app/cache/cache-carrito';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { ChatService } from 'src/app/services/chat.service';
import { GuiUtilsService } from 'src/app/services/gui-utils.service';
import { CacheChat } from 'src/app/cache/cache-chat';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
    selector: 'app-pre-pedido',
    templateUrl: './pre-pedido.page.html',
    styleUrls: ['./pre-pedido.page.scss'],
})
export class PrePedidoPage implements OnInit {

    cargandoDialog;

    nombreNegocio = "";

    complementoItems: any[];

    ordenItems: any[];

    direccionEntrega = {
        nombreCasa: '',
        direccion: '',
    };

    costoEnvio = 45.00;
    subTotal = 0;
    total = 0;

    uidPedido: string;
    
    constructor(
        private modalController: ModalController,
        private router: Router,
        private restaurantService: RestaurantService,
        private chatService: ChatService,
        public guiUtls: GuiUtilsService,
        private registroService: RegistroService){
    }

    ngOnInit() { 
        console.log('Usuario ', CacheUsuario.usuario);
        this.cargarOrdenes();
        this.cargarRestaurante();
        this.cargarComplementos();
        this.calcularTotal();
        this.cargarDireccion();
    }

    cargarRestaurante() {
        if(!CacheCarrito.isCarritoEmpty()) {
            let uidRestaurante = CacheCarrito.getUidRestaurante();
            if(CacheRestaurantes.containsRestaurante(uidRestaurante)) {
                this.nombreNegocio = CacheRestaurantes.getRestaurante(uidRestaurante).nombre;
            }
        }
    }

    cargarDireccion() {
        if(CacheUsuario.usuario) {
            console.log('Usuario: ', CacheUsuario.usuario);
            this.direccionEntrega.nombreCasa = CacheUsuario.usuario.nombre;
            this.registroService.getDireccion(CacheUsuario.usuario.direcciones[0].toString())
            .subscribe(direccion => {
                console.log('direccion: ', direccion);
                let calle = direccion.calle;
                let colonia = direccion.colonia;
                let noExterior = direccion.numeroExterior;
                let noInterior = direccion.numeroInterior;
                let direccionCompleta = calle + ' ' + noExterior + ', ' + colonia + ', No. Int ' + noInterior;

                this.direccionEntrega.direccion = direccionCompleta;
            });
        }
    }

    cargarOrdenes() {
        if(!CacheCarrito.isCarritoEmpty()) {
            this.ordenItems = CacheCarrito.getProductosSimplificados();    
            console.log('ordenes: ', this.ordenItems);
        }
    }

    cargarComplementos() {
        this.restaurantService.getComplementos().subscribe(data => {
            this.complementoItems = data.map(complemento => {
                return {
                    nombre: complemento['nombre'],
                    precio: complemento['precio'],
                    contenido: complemento['contenido'],
                    foto: complemento['foto'],
                    seleccionado: false
                }  
            });
        });
    }

    seleccionarComplemento(complemento) {
        if(!complemento.seleccionado) {
            this.total += complemento.precio;
            complemento.seleccionado = true;
        } else {
            this.total -= complemento.precio;
            complemento.seleccionado = false;
        }
    }

    calcularTotal() {
        console.log('CalcularTotal():');

        this.ordenItems.forEach(o => {
            console.log(o);
            this.subTotal += o.precio * o.cantidad;
        });

        this.total += this.subTotal + this.costoEnvio;
    }

    aumentarCantidad(orden) {
        console.log('Order: ', orden);
        orden.cantidad = orden.cantidad + 1;
        this.total += orden.precio;
        this.subTotal += orden.precio;
        console.log('Nueva cantidad: ', orden.cantidad);

    }

    disminuirCantidad(orden) {
        console.log('Order: ', orden);
        if(orden.cantidad > 1) {
            orden.cantidad = orden.cantidad - 1;
            this.total -= orden.precio;
            this.subTotal -= orden.precio;
        } else {
            return ;
        }
        console.log('Nueva cantidad: ', orden.cantidad);
    }

    dismissModal(dismiss=true) {
        console.log('uidPedido: ', this.uidPedido);
        if(dismiss) {
            this.modalController.dismiss({uidPedido: this.uidPedido, estado: 'seguir-pedido'});
        } else {
            this.modalController.dismiss();
        }
    }

    ordenChanged(orden) {
        console.log('Orden has changed!');
        console.log('cantidad: ', orden.cantidad);
    }

    cerrarModal() {
        this.dismissModal(false);
    }

    realizarPedido() {

        if(CacheCarrito.isCarritoEmpty()) {
            console.log('Carrito empty!');
            this.guiUtls.mostrarToast('No puedes realizar un pedido sin elementos en carrito!', 3000, 'danger');
        } else {
            console.log('Realizando pedido!');

            CacheCarrito.agregarDireccion(CacheUsuario.usuario.direcciones[0]);
            CacheCarrito.agregarUsuario(CacheUsuario.usuario.uid);

            this.chatService.getRepartidorLibre().subscribe(
                promise => promise.then(repartidor => {
                    console.log('Repartidor libre encontrado!');
                    console.log(repartidor);
                    CacheCarrito.agregarRepartidor(repartidor.uid);

                    console.log('pedido listo para insertar: ', CacheCarrito.getCarrito());

                    this.restaurantService.agregarPedido(CacheCarrito.getCarrito())
                    .then(ref => {
                        this.uidPedido = ref.id;
                        console.log('THEN uidPedido: ', this.uidPedido);
                        CacheCarrito.vaciarCarrito();
                        CacheCarrito.agregarUidPedido(this.uidPedido);
                        this.dismissModal(true);
                    }).catch(err => {
                        console.log('Error trying to insert pedido!');
                        this.guiUtls.mostrarToast('Error al tratar de insertar un pedido:(', 3000, 'danger');
                    });
                }),
                error => {
                    console.error(error);
                });
        }
    }
}