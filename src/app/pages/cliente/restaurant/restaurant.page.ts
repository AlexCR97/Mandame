import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { RestaurantService } from "../../../services/restaurant.service"

interface restaurant {
  calificacion : number[]
  categoria : string
  estado : string
  id : string
  nombre : string
  tiempoaprox : number[]
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  showToolbar = false;
  select: string;
  nombreRestaurant : string;

  public Restaurant : any = [];
  public Productos : any = [];
  public productosPorCategoria = [];

  constructor(public restaurantservice : RestaurantService) { }

  ngOnInit() {
    this.select = "Lorem";

    this.restaurantservice.getRestaurant("8fXc1YIaCjXTjb6Ry5t4").subscribe(restaurants => {
      console.log('RESTAURANTS');

      this.Restaurant = restaurants;
      console.log(this.Restaurant);
    });

    this.restaurantservice.getProductos("8fXc1YIaCjXTjb6Ry5t4").subscribe(productos => {
     
      
      this.Productos = productos;
      //console.log(this.Productos);
      
      //console.log('Todos los Productos')
      //console.log(this.Productos);

      this.mostrarCategorias(this.Productos);
    });
  }

  mostrarCategorias(productos: any []){
    let categoriasRepetidas = productos.map(producto => producto.categoria);
    let categoriasUnicas = new Set<string>(categoriasRepetidas);

    

    categoriasUnicas.forEach(categ =>{
      let prods = productos.filter(prod => prod.categoria == categ);

      this.productosPorCategoria.push({
        categoria: categ,
        productos: prods,
      });
    });

    console.log('PRODUCTOS por categoria');
    console.log(this.productosPorCategoria);
  }

  segmentChanged(ev: any) {
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }
}