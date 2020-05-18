import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CacheUsuario } from 'src/app/services/cache-usuario';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-pre-pedido',
  templateUrl: './pre-pedido.page.html',
  styleUrls: ['./pre-pedido.page.scss'],
})
export class PrePedidoPage implements OnInit {

  nombreNegocio = "Domino's Pizza"

  complementoItems: any[];

  ordenItems: any[];

  direccionEntrega = {
    nombreCasa: '',
    direccion: '',
  };

  costoEnvio = 45.00;
  subTotal = 0;
  total = 0;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private restaurantService: RestaurantService){
  }

  ngOnInit() { 
    this.cargarOrdenes();
    this.cargarComplementos();
    // TODO: CHECK HOW TO LOAD EACH COMPLEMENT IMAGE
    this.calcularTotal();

    // REVIEW: TEST PURPOSES ONLY, DELETE AFTER
    CacheUsuario.usuario = {
      apellido: 'Reyna',
      direcciones: [
        'Chichenitza',
        'Carol. Yucat.',
        '#407'
      ],
      email: 'andresreyna15@gmail.com',
      foto: 'url',
      nombre: 'J. A. Reyna Espinoza',
      posicion: 'Aqui mero',
      telefono: 'Este',
      uid: 'string',
    };

    this.cargarDireccion();
  }

  cargarDireccion() {
    this.direccionEntrega.nombreCasa = CacheUsuario.usuario.nombre;
    this.direccionEntrega.direccion = CacheUsuario.usuario.direcciones.toString();
  }

  cargarOrdenes() {
    this.ordenItems = CacheService.carrito;
    console.log('ordenes: ', this.ordenItems);
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

  dismissModal() {
    this.modalController.dismiss({ 'dismissed': true });
  }

  ordenChanged(orden) {
    console.log('Orden has changed!');
    console.log('cantidad: ', orden.cantidad);
  }

  realizarPedido() {
    console.log('Realizando pedido!');
    this.dismissModal();
    // TODO: AGREGAR PEDIDO A LA BASE DE DATOS.

  }
}