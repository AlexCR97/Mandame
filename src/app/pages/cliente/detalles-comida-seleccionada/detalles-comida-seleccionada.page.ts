import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/cache/cache.service';
import { CacheRestaurantes } from 'src/app/cache/cache-restaurantes';
import { CacheProductos } from 'src/app/cache/cache-productos';
import { Router, ActivatedRoute } from '@angular/router';
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

    uidRestaurante: string;
    producto: Producto;

    pedido = {
        producto: { },
        adicionales: [],
        comentario: '',
        cantidad: 0,
        total: 0.0
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private afs: RestaurantService) {

    }

    ngOnInit() {
        let nombreProducto = this.activatedRoute.snapshot.queryParamMap.get('producto');
        this.uidRestaurante = this.activatedRoute.snapshot.queryParamMap.get('uidRestaurante');

        console.log('producto enviado: ', nombreProducto);
        console.log('uidRestaurante: ', this.uidRestaurante);

        this.producto = CacheProductos.getProductoPorNombre(nombreProducto);
        console.log('Producto: ', this.producto);

        // if(!CacheProductos.isEmpty()) {
            //     this.adicionales = CacheProductos.getAdicionalesRestaurante(this.uidRestaurante);
            //     console.log('adicionales: ', this.adicionales);
            // }

            this.obtenerAdicionales();

            this.cantidad = 1;

            this.subtotal += this.producto.precio;
            this.total += this.producto.precio;
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
            let uidAdicionales = CacheRestaurantes.getAdicionalesDeRestaurante(this.uidRestaurante);
            this.afs.getAdicionalesPorUid(uidAdicionales).subscribe(adicionales => {
                this.adicionales = adicionales;
                console.log('adicionales obtenidos: ', this.adicionales);

                this.adicionales.forEach(adicional => {
                    this.adicionalesChecks.push(
                    {
                        valor: adicional, 
                        isChecked: false
                    });

                    console.log('adicionales checks: ', this.adicionalesChecks);
                });
            });
        }

        agregar() {
            this.prepararPedido();
            CacheService.agregarAlCarrito(this.pedido);
            console.log('Carrito actual: ', CacheService.getCarrito());
            // TODO Regresar a pantalla anterior
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
            console.log('Pedido formado: ', this.pedido);
            this.abrirRestaurante(this.uidRestaurante);
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
