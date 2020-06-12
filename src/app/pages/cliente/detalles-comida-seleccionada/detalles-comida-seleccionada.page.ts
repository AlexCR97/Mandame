import { Component, OnInit, Input } from '@angular/core';
import { CacheCarrito } from 'src/app/cache/cache-carrito';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CacheProductos } from 'src/app/cache/cache-productos';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Producto } from 'src/app/dbdocs/producto';
import { Adicional } from 'src/app/dbdocs/adicional';

@Component({
    selector: 'app-detalles-comida-seleccionada',
    templateUrl: './detalles-comida-seleccionada.page.html',
    styleUrls: ['./detalles-comida-seleccionada.page.scss'],
})
export class DetallesComidaSeleccionadaPage implements OnInit {

    adicionales: Adicional[];    
    adicionalesChecks : any[] = [];
    cantidad: number = 0;
    subtotal: number = 0.0;
    total: number = 0.0;
    comentario: string = '';

    @Input() uidRestaurante: string;
    @Input() nombreProducto: string;
    producto: Producto;

    pedido = {
        producto: { },
        adicionales: [],
        comentario: '',
        cantidad: 0,
        total: 0.0,
        uidRestaurante: ''
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private afs: RestaurantService,
        private modalController: ModalController) {

    }

    ngOnInit() {
        // let nombreProducto = this.activatedRoute.snapshot.queryParamMap.get('producto');
        // this.uidRestaurante = this.activatedRoute.snapshot.queryParamMap.get('uidRestaurante');

        console.log('producto enviado: ', this.nombreProducto);
        console.log('uidRestaurante: ', this.uidRestaurante);

        this.producto = CacheProductos.getProductoPorNombre(this.nombreProducto);

        this.obtenerAdicionales();

        this.cantidad = 1;

        this.subtotal += this.producto.precio;
        this.total += this.producto.precio;
    }

    dismissModal() {
        this.modalController.dismiss('ver-carrito');
    }

    checkboxChanged(event, adicional) {
        if (adicional.isChecked) {
            this.subtotal += adicional.valor.precio;
        } else {
            this.subtotal -= adicional.valor.precio;
        }

        this.total = (this.subtotal * this.cantidad);
    }

    obtenerAdicionales() {
        console.log('obtenerAdicionales()');
        console.log('producto: ', this.producto);
        let uidAdicionales = CacheRestaurantes.getAdicionalesDeRestaurante(this.uidRestaurante);
        console.log('uidAdicionalesRestaurante: ', uidAdicionales);
        this.afs.getAdicionalesPorUid(uidAdicionales).subscribe(adicionales => {
            this.adicionales = adicionales;
            console.log('adicionales obtenidos: ', adicionales);
            console.log('this.adicionales: ', this.adicionales);

            this.adicionales.forEach(adicional => {
                if(adicional != undefined) {
                    this.adicionalesChecks.push(
                    {
                        valor: adicional, 
                        isChecked: false
                    });
                }

                console.log('adicionales checks: ', this.adicionalesChecks);
            });
        });
    }

    agregar() {
        this.prepararPedido();
        CacheCarrito.agregarAlCarrito(this.pedido);
        console.log('Carrito actual: ', CacheCarrito.getCarrito());
        this.producto = { 
            categoria: '',
            contenido: 0,
            foto: '',
            ingredientes: [],
            nombre: '',
            precio: 0,
            restaurante: '',
            uid: '',
            nombreRestaurant: ''
        };
        this.dismissModal();
    }

    prepararPedido() {
        this.pedido.producto = this.producto;
        this.adicionalesChecks.forEach(ad => {
            if(ad.isChecked) {
                this.pedido.adicionales.push(ad.valor);
            }
        });
        this.pedido.cantidad = this.cantidad;
        this.pedido.total = this.total;
        this.pedido.comentario = this.comentario;
        this.pedido.uidRestaurante = this.uidRestaurante;
        console.log('Pedido formado: ', this.pedido);
        // this.abrirRestaurante(this.uidRestaurante);
    }

    abrirRestaurante(uidRestaurant: string) {
        this.router.navigate(['/restaurant'], {
            queryParams: {
                uidRestaurant: uidRestaurant
            }
        });
    }

    add() {
        console.log('Add button clicked!');
        this.cantidad = this.cantidad + 1;
        this.total = (this.cantidad * this.subtotal);
    }

    remove() {
        console.log('Remove button clicked!');
        if(this.cantidad == 1) {
            return;
        }
        this.cantidad = this.cantidad - 1;
        this.total = (this.cantidad * this.subtotal);
    }
}
