import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-detalles-comida-seleccionada',
  templateUrl: './detalles-comida-seleccionada.page.html',
  styleUrls: ['./detalles-comida-seleccionada.page.scss'],
})
export class DetallesComidaSeleccionadaPage implements OnInit {

  // SUPONIENDO QUE SE ME PASARAN LOS ID DE LA TIENDA, SE USARAN PARA OBTENER LOS ADICIONALES
  // TODO: CONFIRMAR CON SERVICIO

  // EL OBJETO QUE ESTOY ESPERANDO SERIA TAL QUE:
  // { 
  //   comida: {
  //     nombre: "pizza",
  //     precio: 150.50,
  //     id_restaurant: "dominos-1"
  //     ...
  //   },
  // }

  adicionales: any[] = []
  adicionalesPrueba = [
    {
      nombre: "ad1", 
      categoria: "tal",
      porcion: "esta",
      precio: 10.5
    },
    {
      nombre: "ad2", 
      categoria: "tal",
      porcion: "esta",
      precio: 5.0
    },
    {
      nombre: "ad3", 
      categoria: "tal",
      porcion: "esta",
      precio: 15.75
    }
  ];
  adicionalesChecks : any[] = []
  cantidad: number = 0;
  total: number = 0.0;
  comentario: string = ''

  producto = {
    nombre: "pizza tal",
    precio: 150.55,
    restaurant_id: "1"
  };

  pedidoCompleto = {
    producto: { },
    adicionales: [],
    cantidad: 0,
    total: 0.0
  }

  constructor(
    private router: Router,
    private cache: CacheService,
    private afs: RestaurantService) {

  }

  ngOnInit() {
    this.cantidad = 1;

    // TODO: PENDIENTE CHECAR CON BD
    if(this.router.getCurrentNavigation().extras.state) {
      this.producto = this.router.getCurrentNavigation().extras.state.comida;
    }
    let restaurant_id = this.producto.restaurant_id;
    this.loadData(restaurant_id);

    

    // ESTATICOS CON FINES DE PRUEBAS
    this.adicionalesPrueba.forEach(a => {
      this.adicionalesChecks.push(
        {
          valor: a, 
          isChecked: false
        });
    });

    this.total += this.producto.precio;
  }

  loadData(id_restaurant) {
    this.afs.getAdicionalesFromRestaurant(id_restaurant).subscribe(data => {
      this.adicionales = data.map(e => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'], 
          categoria: e.payload.doc.data()['categoria'],
          porcion: e.payload.doc.data()['porcion'],
          precio: e.payload.doc.data()['precio']
        }
      });
    });
    console.log('Data loaded: ', this.adicionales);
  }

  checkboxChanged(event, adicional) {
    if (adicional.isChecked) {
      this.total += adicional.valor.precio;
    } else {
      this.total -= adicional.valor.precio;
    }
  }

  agregar() {
    this.prepararPedido();
    this.cache.cart.push(this.pedidoCompleto);
    // TODO Regresar a pantalla anterior
  }

  prepararPedido() {
    this.pedidoCompleto.producto = this.producto;
    this.adicionalesChecks.forEach(ad => {
      if(ad.isChecked) {
        this.pedidoCompleto.adicionales.push(ad.valor);
      }
    });
    this.pedidoCompleto.cantidad = this.cantidad;
    this.pedidoCompleto.total = this.total;
  }

  add() {
    console.log('Add button clicked!');
    this.cantidad = this.cantidad + 1;
    this.total *= this.cantidad;
  }

  remove() {
    console.log('Remove button clicked!');
    if(this.cantidad == 1) {
      return;
    }
    this.cantidad = this.cantidad - 1;
  }
}
