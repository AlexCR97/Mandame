import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CacheUsuario } from 'src/app/cache/cache-usuario';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CacheService } from 'src/app/cache/cache.service';
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

  uidPedido: string;

  @Input() val: number;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private restaurantService: RestaurantService,
    private chatService: ChatService,
    public guiUtls: GuiUtilsService,
    private registroService: RegistroService){
  }

  ngOnInit() { 
    // TODO: DELETE WHEN PAGES CONNECTED
    this.registroService.getUsuario('TvGjmJVjkEPEcGuIQLWtn76Gs9P2').subscribe(usuario => {
      console.log('Usuario perepedido: ', usuario);
      CacheUsuario.usuario = usuario;
      this.cargarOrdenes();
      this.cargarComplementos();
      this.calcularTotal();
      this.cargarDireccion();
    });
  }

  // 9TYcT3e3CrRLqa2JgGMLJSmmjPw1

  cargarDireccion() {
    if(CacheUsuario.usuario) {
      console.log('Usuario: ', CacheUsuario.usuario);
      this.direccionEntrega.nombreCasa = CacheUsuario.usuario.nombre;
      this.direccionEntrega.direccion = CacheUsuario.usuario.direcciones.toString();
      // TODO: PROCESS DIRECTION TO SHOW THE DIRECTION INSTEAD OF THE UID
    }
  }

  cargarOrdenes() {
    this.ordenItems = CacheService.getCarrito();
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

  // TODO: FIX INC, DEC, AREN'T WORKING IN SOME CASES
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
    console.log('input: ', this.val);
    console.log('uidPedido: ', this.uidPedido);
    this.modalController.dismiss(this.uidPedido);
  }

  ordenChanged(orden) {
    console.log('Orden has changed!');
    console.log('cantidad: ', orden.cantidad);
  }

  realizarPedido() {
    console.log('Realizando pedido!');
    let pedido = {
      aproximacion: 0,
      cliente: CacheUsuario.usuario.uid,
      cantidad: CacheService.carrito.map(value => {
        return value.cantidad
      }),
      comentarios: CacheService.carrito.map(value => {
        return value.comentario
      }),
      direccion: [],
      estado: 'entregado', // Estado por defecto
      nombre: CacheUsuario.usuario.nombre,
      precios: CacheService.carrito.map(value => {
        return value.precio
      }),
      productos: CacheService.carrito.map(value => {
        return value.nombre
      }),
      repartidor: { },
      restaurante: CacheService.restaurante
    }

    this.chatService.getRepartidorLibre(
      repartidor => {
        console.log('Repartidor libre obtenido!');
        console.log(repartidor);

        pedido.repartidor = repartidor.uid;
        this.restaurantService.agregarPedido(pedido).then(ref => {
          this.uidPedido = ref.id;
          console.log('THEN uidPedido: ', this.uidPedido);
          this.dismissModal();
        });
      },
      error => {
        console.error('Error al obtener un repartidor');
        console.error(error);
        this.guiUtls.cerrarCargando(this.cargandoDialog);
        this.guiUtls.mostrarToast('No se encontro ningun repartidor libre :(', 3000, 'danger');
      }
      );

  }
}